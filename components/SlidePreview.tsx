

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Slide, DesignSettings } from '../types';
import { SlideRenderer } from './SlideRenderer';
import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon, ChevronDownIcon, MaximizeIcon, PlayIcon, SpeakerOnIcon } from './Icons';

interface SlidePreviewProps {
  slides: Slide[];
  settings: DesignSettings;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onNoteChange: (index: number, newNote: string) => void;
  onRegenerate: (index: number, instruction: string) => void;
  isRegenerating: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  onMaximize: () => void;
  onPresent: () => void;
  onPresentWithAudio: () => void;
  isKeyboardNavigationActive: boolean;
}

export const SlidePreview: React.FC<SlidePreviewProps> = ({ slides, settings, currentIndex, setCurrentIndex, onNoteChange, onRegenerate, isRegenerating, goToNext, goToPrevious, onMaximize, onPresent, onPresentWithAudio, isKeyboardNavigationActive }) => {
  const [isRegenerateMenuOpen, setIsRegenerateMenuOpen] = useState(false);
  const [customRegenerateInstruction, setCustomRegenerateInstruction] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  
  const [slideForRender, setSlideForRender] = useState(slides[currentIndex]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (slideForRender !== slides[currentIndex]) {
        setIsFading(true);
        const timer = setTimeout(() => {
            setSlideForRender(slides[currentIndex]);
            setIsFading(false);
        }, 200); // Match transition duration
        return () => clearTimeout(timer);
    }
  }, [currentIndex, slides, slideForRender]);
  
  // This effect handles when the slide data itself changes (e.g. re-order, regenerate)
  // without changing the index.
  useEffect(() => {
    if (slideForRender !== slides[currentIndex]) {
        setSlideForRender(slides[currentIndex]);
    }
  }, [slides]);


  useEffect(() => {
    if (!isKeyboardNavigationActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'textarea' || (e.target as HTMLElement).tagName.toLowerCase() === 'input') return;

      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToPrevious, goToNext, isKeyboardNavigationActive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsRegenerateMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onNoteChange(currentIndex, e.target.value);
  };

  const regenerationOptions = {
    'layout': 'このスライドの内容を維持しつつ、異なるレイアウトや表現方法で再生成してください。',
    'formal': 'このスライドの内容を、よりプロフェッショナルでフォーマルな表現に書き換えてください。',
    'creative': 'このスライドの内容を、よりクリエイティブで魅力的な表現に書き換えてください。',
    'summarize': 'このスライドの要点を抽出し、より簡潔にまとめてください。',
  };

  const handleRegenerateWithInstruction = (instruction: string) => {
    if (isRegenerating || !instruction.trim()) return;
    onRegenerate(currentIndex, instruction);
    setIsRegenerateMenuOpen(false);
    setCustomRegenerateInstruction(''); // Reset input field
  };


  return (
    <div>
      <div className="relative">
        <div className="aspect-video w-full bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          <div className={`w-full h-full transition-opacity duration-200 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <SlideRenderer slide={slideForRender} settings={settings} />
          </div>
        </div>

        <div className="absolute top-3 right-3 z-10 flex space-x-2">
            <button
              onClick={onMaximize}
              className="bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="最大化"
              title="最大化"
            >
                <MaximizeIcon className="h-5 w-5" />
            </button>
            <button
              onClick={onPresentWithAudio}
              className="bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="音読付きでプレゼンテーション開始"
              title="音読付きでプレゼンテーション開始"
            >
                <SpeakerOnIcon className="h-5 w-5" />
            </button>
            <button
              onClick={onPresent}
              className="bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="プレゼンテーション開始"
              title="プレゼンテーション開始"
            >
                <PlayIcon className="h-5 w-5" />
            </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={goToPrevious}
            className="bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label="前のスライド"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label="次のスライド"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-4">
          <div className="text-center text-gray-600 font-medium">
            スライド {currentIndex + 1} / {slides.length}
          </div>
           <div className="relative ml-4" ref={menuRef}>
            <button
              onClick={() => setIsRegenerateMenuOpen(prev => !prev)}
              disabled={isRegenerating}
              className="p-2 rounded-full flex items-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              title="このスライドを再生成"
              aria-label="このスライドを再生成"
            >
              {isRegenerating ? (
                <RefreshIcon className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <RefreshIcon className="h-5 w-5" />
                  <ChevronDownIcon className="h-4 w-4 ml-1 opacity-70" />
                </>
              )}
            </button>
             {isRegenerateMenuOpen && !isRegenerating && (
              <div className="absolute bottom-full mb-2 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20 p-4 space-y-4">
                <div>
                    <label htmlFor="regenerate-instruction" className="block text-sm font-medium text-gray-700 mb-1">
                        AIへの指示（自由入力）
                    </label>
                    <textarea
                        id="regenerate-instruction"
                        value={customRegenerateInstruction}
                        onChange={(e) => setCustomRegenerateInstruction(e.target.value)}
                        placeholder="例：箇条書きを3点に絞って"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        rows={3}
                    />
                    <button
                        onClick={() => handleRegenerateWithInstruction(customRegenerateInstruction)}
                        disabled={isRegenerating || !customRegenerateInstruction.trim()}
                        className="mt-2 w-full bg-indigo-600 text-white font-bold py-2 px-3 rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 transition-colors"
                    >
                        指示を送信して再生成
                    </button>
                </div>
                <div className="border-t border-gray-200 pt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">クイック操作</p>
                    <ul className="space-y-1">
                      <li onClick={() => handleRegenerateWithInstruction(regenerationOptions['layout'])} className="px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">レイアウトを変更</li>
                      <li onClick={() => handleRegenerateWithInstruction(regenerationOptions['formal'])} className="px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">フォーマルな表現に</li>
                      <li onClick={() => handleRegenerateWithInstruction(regenerationOptions['creative'])} className="px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">クリエイティブに</li>
                      <li onClick={() => handleRegenerateWithInstruction(regenerationOptions['summarize'])} className="px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">要約する</li>
                    </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">スピーカーノート</h3>
        <textarea
          value={currentSlide.notes || ''}
          onChange={handleNoteChange}
          placeholder="このスライドのスピーカーノートをここに入力します..."
          className="w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        />
      </div>
    </div>
  );
};