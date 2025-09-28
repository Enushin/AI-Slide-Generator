
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Slide, SlideData, DesignSettings } from './types';
import { generateSlidesFromJson, regenerateSingleSlide, generateOutlineFromTheme, generateVisualSlidesFromJson, generateImageFromPrompt } from './services/geminiService';
import { SettingsPanel } from './components/SettingsPanel';
import { JsonInputPanel } from './components/JsonInputPanel';
import { SlidePreview } from './components/SlidePreview';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SlideRenderer } from './components/SlideRenderer';
import { ThumbnailTray } from './components/ThumbnailTray';
import { MaximisedPreview } from './components/MaximisedPreview';
import { PresentationMode } from './components/PresentationMode';


const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
};

let fontData: string | null = null;
const FONT_URL = 'https://cdn.jsdelivr.net/npm/notosans-jp-webfont@1.0.0/NotoSansJP-Regular.ttf';

const getFontData = async (): Promise<string> => {
    if (fontData) {
        return fontData;
    }
    const response = await fetch(FONT_URL);
    if (!response.ok) {
        throw new Error('PDF生成用のフォントファイルのダウンロードに失敗しました。');
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                const base64 = (reader.result as string).split(',')[1];
                fontData = base64;
                resolve(base64);
            } else {
                reject(new Error('フォントファイルの読み込みに失敗しました。'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};


const App: React.FC = () => {
  const [rawJson, setRawJson] = useState('');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [presentationMode, setPresentationMode] = useState<'off' | 'visual' | 'audio'>('off');
  const presentationContainerRef = useRef<HTMLDivElement>(null);
  const [generationMode, setGenerationMode] = useState<'standard' | 'visual'>('standard');

  // State for new research feature
  const [textForGeneration, setTextForGeneration] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);

  
  const [designSettings, setDesignSettings] = useState<DesignSettings>({
    primaryColor: '#4285F4',
    fontFamily: 'Noto Sans JP',
    showDate: true,
    dateText: getTodayDate(),
    subtitleText: '',
    footerText: '',
  });

  const handleOutlineGeneration = useCallback(async (
    topic: string, 
    audience: string, 
    goal: string, 
    detail: 'concise' | 'standard' | 'detailed'
  ) => {
    setIsResearching(true);
    setResearchError(null);
    setSources([]);
    try {
      const { outline, sources: newSources } = await generateOutlineFromTheme(topic, audience, goal, detail);
      setTextForGeneration(outline);
      setSources(newSources);
    } catch (err) {
      setResearchError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
      console.error(err);
    } finally {
      setIsResearching(false);
    }
  }, []);

 const handleStandardSlideGeneration = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setLoadingMessage('スライドを生成中...');
    try {
      const resultJson = await generateSlidesFromJson(text);
      setRawJson(resultJson);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleVisualSlideGeneration = async (text: string) => {
      setIsLoading(true);
      setError(null);
      setResearchError(null);
      try {
          // Step 1: Generate slides with image prompts
          setLoadingMessage('構成案を生成中...');
          const resultJsonWithPrompts = await generateVisualSlidesFromJson(text);
          let slidesWithPrompts: Slide[];
          try {
              slidesWithPrompts = JSON.parse(resultJsonWithPrompts);
          } catch (e) {
              console.error("Failed to parse initial visual slide JSON:", e);
              throw new Error("AIが生成した構成案の形式が正しくありません。");
          }

          const slidesToGenerateImagesFor = slidesWithPrompts.filter(s => s.type === 'imageText' && s.image.startsWith('PROMPT:'));
          let generatedImageCount = 0;

          // Step 2: Find slides with prompts and generate images
          const imageGenerationPromises: Promise<Slide>[] = slidesWithPrompts.map(async (slide, index) => {
              if (slide.type === 'imageText' && slide.image.startsWith('PROMPT:')) {
                  try {
                      generatedImageCount++;
                      setLoadingMessage(`ビジュアル生成中... (${generatedImageCount}/${slidesToGenerateImagesFor.length})`);
                      const imageUrl = await generateImageFromPrompt(slide.image);
                      return { ...slide, image: imageUrl };
                  } catch (imgError) {
                      console.error(`Failed to generate image for slide ${index}:`, imgError);
                      // Fallback: convert to a regular content slide
                      return {
                          type: 'content',
                          title: slide.title,
                          subhead: slide.subhead,
                          points: [`[ビジュアル生成エラー: ${(imgError as Error).message}]`, ...slide.points],
                          notes: slide.notes
                      } as Slide;
                  }
              }
              return slide;
          });

          const finalSlides = await Promise.all(imageGenerationPromises);
          
          setRawJson(JSON.stringify(finalSlides, null, 2));

      } catch (err) {
          setError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
          console.error(err);
      } finally {
          setIsLoading(false);
          setLoadingMessage('');
      }
  };

  const handleJsonGeneration = useCallback(async (text: string) => {
      if (!text.trim()) {
          setError('生成するテキストが空です。');
          return;
      }
      if (generationMode === 'visual') {
          await handleVisualSlideGeneration(text);
      } else {
          await handleStandardSlideGeneration(text);
      }
  }, [generationMode]);

  useEffect(() => {
    if (rawJson.trim() === '') {
      setSlides([]);
      setError(null);
      return;
    }
    try {
      const parsedData: SlideData = JSON.parse(rawJson);
      if (Array.isArray(parsedData)) {
        setSlides(parsedData);
        setError(null);
      } else {
        setError('無効なJSON構造です: ルートは配列である必要があります。');
        setSlides([]);
      }
    } catch (e) {
      setError('無効なJSON形式です。構文を確認してください。');
      setSlides([]);
    }
  }, [rawJson]);
  
  useEffect(() => {
    // Reset index when slides change
    setCurrentIndex(0);
  }, [slides]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }, [slides.length]);

  const handleUpdateSlideNote = (index: number, newNote: string) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      if (newSlides[index]) {
        newSlides[index] = { ...newSlides[index], notes: newNote };
      }
      return newSlides;
    });
  };

  const handleReorderSlides = useCallback((startIndex: number, endIndex: number) => {
    setSlides(prevSlides => {
      const newSlides = [...prevSlides];
      const [removed] = newSlides.splice(startIndex, 1);
      newSlides.splice(endIndex, 0, removed);
      return newSlides;
    });
    // Adjust currentIndex if needed
    if (currentIndex === startIndex) {
        setCurrentIndex(endIndex);
    } else if (startIndex < currentIndex && endIndex >= currentIndex) {
        setCurrentIndex(prev => prev - 1);
    } else if (startIndex > currentIndex && endIndex <= currentIndex) {
        setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);
  
  const handleRegenerateSlide = useCallback(async (index: number, instruction: string) => {
    if (isRegenerating) return;

    setIsRegenerating(true);
    setError(null);
    try {
      const slideToRegenerate = slides[index];
      const newSlide = await regenerateSingleSlide(slideToRegenerate, instruction);
      
      setSlides(prevSlides => {
        const newSlides = [...prevSlides];
        newSlides[index] = newSlide;
        return newSlides;
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'スライドの再生成中に不明なエラーが発生しました。');
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  }, [slides, isRegenerating]);


  const handleDownloadPdf = async () => {
    const jsPDF = (window as any).jspdf?.jsPDF;
    const html2canvas = (window as any).html2canvas;

    if (!slides.length || !html2canvas || !jsPDF) {
        console.error('PDF generation libraries not loaded or no slides to export.');
        return;
    }

    setIsDownloading(true);
    setError(null);

    try {
      await document.fonts.load(`12px "${designSettings.fontFamily}"`);
      await new Promise(resolve => setTimeout(resolve, 50));

      const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [1280, 720]
      });
      
      const notoFont = await getFontData();
      pdf.addFileToVFS('NotoSansJP-Regular.ttf', notoFont);
      pdf.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal');


      const exportContainer = document.createElement('div');
      exportContainer.style.position = 'absolute';
      exportContainer.style.left = '-9999px';
      exportContainer.style.top = '0';
      document.body.appendChild(exportContainer);

      for (let i = 0; i < slides.length; i++) {
          const slide = slides[i];
          
          const slideWrapper = document.createElement('div');
          slideWrapper.style.width = '1280px';
          slideWrapper.style.height = '720px';
          exportContainer.appendChild(slideWrapper);
          
          const tempRoot = ReactDOM.createRoot(slideWrapper);
          await new Promise<void>(resolve => {
              tempRoot.render(
                  <div style={{width: '1280px', height: '720px'}}>
                      <SlideRenderer slide={slide} settings={designSettings} />
                  </div>
              );
              setTimeout(() => resolve(), 50);
          });
          
          const canvas = await html2canvas(slideWrapper, {
              scale: 1,
              width: 1280,
              height: 720,
              useCORS: true,
              logging: false,
          });
          
          const imgData = canvas.toDataURL('image/jpeg', 0.9);
          
          if (i > 0) {
              pdf.addPage([1280, 720], 'landscape');
          }
          pdf.addImage(imgData, 'JPEG', 0, 0, 1280, 720);

          tempRoot.unmount();
          exportContainer.removeChild(slideWrapper);
      }
      
      document.body.removeChild(exportContainer);
      pdf.save('AI-Generated-Slides.pdf');
    } catch (err) {
        console.error("PDF generation failed:", err);
        setError(err instanceof Error ? err.message : "PDFの生成中に予期せぬエラーが発生しました。");
    } finally {
        setIsDownloading(false);
    }
  };

  const openMaximisedPreview = useCallback(() => setIsMaximized(true), []);
  const closeMaximisedPreview = useCallback(() => setIsMaximized(false), []);
  
  const closePresentationMode = useCallback(() => {
    setPresentationMode('off');
  }, []);

  const startPresentation = (mode: 'visual' | 'audio') => {
    if (presentationContainerRef.current) {
      presentationContainerRef.current.requestFullscreen().catch(err => {
        console.warn(`Fullscreen request failed or was denied: ${err.message}`);
      });
    }
    setPresentationMode(mode);
  };


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-8">
            <JsonInputPanel 
              rawJson={rawJson}
              setRawJson={setRawJson}
              onGenerateSlides={handleJsonGeneration}
              isGeneratingSlides={isLoading}
              loadingMessage={loadingMessage}
              jsonError={error}
              textForGeneration={textForGeneration}
              setTextForGeneration={setTextForGeneration}
              onGenerateOutline={handleOutlineGeneration}
              isResearching={isResearching}
              researchError={researchError}
              sources={sources}
              generationMode={generationMode}
              setGenerationMode={setGenerationMode}
            />
          </div>
          <div className="lg:col-span-7 space-y-8">
            <SettingsPanel settings={designSettings} setSettings={setDesignSettings} />
          </div>
        </div>
        
        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">スライドプレビュー</h2>
              {slides.length > 0 && (
                  <button
                      onClick={handleDownloadPdf}
                      disabled={isDownloading}
                      className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out flex items-center"
                  >
                      {isDownloading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            PDF生成中...
                          </>
                      ) : 'PDFをダウンロード'}
                  </button>
              )}
            </div>
            {slides.length > 0 ? (
                <>
                  <SlidePreview 
                    slides={slides} 
                    settings={designSettings}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    onNoteChange={handleUpdateSlideNote}
                    onRegenerate={handleRegenerateSlide}
                    isRegenerating={isRegenerating}
                    goToNext={goToNext}
                    goToPrevious={goToPrevious}
                    onMaximize={openMaximisedPreview}
                    onPresent={() => startPresentation('visual')}
                    onPresentWithAudio={() => startPresentation('audio')}
                    isKeyboardNavigationActive={!isMaximized && presentationMode === 'off'}
                  />
                  <ThumbnailTray
                    slides={slides}
                    settings={designSettings}
                    currentIndex={currentIndex}
                    onSelect={setCurrentIndex}
                    onReorder={handleReorderSlides}
                  />
                </>
            ) : (
                <div className="aspect-video w-full bg-gray-100 rounded-lg shadow-inner border border-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">スライドを生成するとここにプレビューが表示されます。</p>
                </div>
            )}
        </div>

      </main>
      <Footer />
      {isMaximized && slides.length > 0 && (
        <MaximisedPreview
          slides={slides}
          settings={designSettings}
          currentIndex={currentIndex}
          onClose={closeMaximisedPreview}
          onNext={goToNext}
          onPrev={goToPrevious}
        />
      )}
      <div ref={presentationContainerRef}>
        {presentationMode !== 'off' && slides.length > 0 && (
          <PresentationMode
            slides={slides}
            settings={designSettings}
            currentIndex={currentIndex}
            onClose={closePresentationMode}
            onNext={goToNext}
            onPrev={goToPrevious}
            audioEnabled={presentationMode === 'audio'}
          />
        )}
      </div>
    </div>
  );
};

export default App;
