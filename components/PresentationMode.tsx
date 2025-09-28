
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Slide, DesignSettings } from '../types';
import { SlideRenderer } from './SlideRenderer';
import { CloseIcon, SpeakerOnIcon, SpinnerIcon } from './Icons';

interface PresentationModeProps {
  slides: Slide[];
  settings: DesignSettings;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  audioEnabled: boolean;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ slides, settings, currentIndex, onClose, onNext, onPrev, audioEnabled }) => {
  const [isFading, setIsFading] = useState(false);
  const [slideForRender, setSlideForRender] = useState(slides[currentIndex]);
  const [audioStatus, setAudioStatus] = useState<'idle' | 'loading' | 'playing' | 'error'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus the container on mount to capture key events
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // Handle exiting fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.error("Error attempting to exit fullscreen:", err));
      }
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onClose]);

  // Keyboard navigation handler attached to the component div
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'ArrowLeft') {
      onPrev();
    } else if (e.key === 'ArrowRight') {
      onNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [onPrev, onNext, onClose]);


  // Handle slide transition animation
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

  // Handle audio playback and auto-advancing
  useEffect(() => {
    if (!audioEnabled || !window.speechSynthesis) {
      return;
    }

    const speech = window.speechSynthesis;
    speech.cancel(); // Always cancel previous speech on slide change

    const renderIndex = currentIndex; // Create an identifier for this specific render
    const currentSlide = slides[currentIndex];
    const notes = currentSlide.notes?.trim() || '';
    const isLastSlide = currentIndex >= slides.length - 1;

    let advanceTimeoutId: number;

    const advance = () => {
        if (isLastSlide) {
            onClose();
        } else {
            onNext();
        }
    };

    if (notes.length === 0) {
        setAudioStatus('idle');
        advanceTimeoutId = window.setTimeout(advance, 3000);
        return () => clearTimeout(advanceTimeoutId);
    }
    
    setAudioStatus('loading');
    
    const utterance = new SpeechSynthesisUtterance(notes);

    const cleanup = () => {
        utterance.onstart = null;
        utterance.onend = null;
        utterance.onerror = null;
    };
    
    utterance.onstart = () => {
        if (currentIndex === renderIndex) { // Only update status if we're still on the same slide
            setAudioStatus('playing');
        }
    };

    utterance.onend = () => {
        cleanup();
        if (currentIndex === renderIndex) { // Only advance if we're still on the same slide
            setAudioStatus('idle');
            advance();
        }
    };
    
    utterance.onerror = (e) => {
        console.error('SpeechSynthesis Error:', e);
        cleanup();
        if (currentIndex === renderIndex) { // Only act if we're still on the same slide
            setAudioStatus('error');
            advanceTimeoutId = window.setTimeout(advance, 3000); // Advance even on error
        }
    };

    const speak = () => {
        if (currentIndex !== renderIndex) return; // Don't speak if slide has already changed
        const voices = speech.getVoices();
        const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
        if (japaneseVoice) {
            utterance.voice = japaneseVoice;
        } else {
            utterance.lang = 'ja-JP';
        }
        speech.speak(utterance);
    }
    
    if (speech.getVoices().length > 0) {
        speak();
    } else {
        speech.onvoiceschanged = speak;
    }

    return () => {
        clearTimeout(advanceTimeoutId);
        cleanup();
        speech.onvoiceschanged = null;
        // Check if the utterance associated with this cleanup is still speaking
        if (speech.speaking && utterance === (window as any).__currentUtterance) {
            speech.cancel();
        }
    };
  }, [currentIndex, slides, audioEnabled, onNext, onClose]);


  const progress = ((currentIndex + 1) / slides.length) * 100;
  
  const AudioStatusIndicator: React.FC = () => {
      if (!audioEnabled) return null;
      
      switch (audioStatus) {
        case 'loading':
          return <SpinnerIcon className="h-5 w-5" />;
        case 'playing':
          return <SpeakerOnIcon className="h-5 w-5" />;
        default:
          return null;
      }
  };


  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 outline-none"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <div
          className={`w-full h-full max-w-full max-h-full aspect-video bg-white shadow-2xl transition-opacity duration-200 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-full h-full">
            <SlideRenderer slide={slideForRender} settings={settings} />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-1/2 h-full cursor-pointer" onClick={onPrev} />
      <div className="absolute top-0 right-0 w-1/2 h-full cursor-pointer" onClick={onNext} />

      <div className="absolute inset-0 pointer-events-none">
        <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity pointer-events-auto"
            aria-label="閉じる"
        >
            <CloseIcon className="h-6 w-6" />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="flex items-center justify-between text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                <div className="font-medium">
                    {currentIndex + 1} / {slides.length}
                </div>
                <div className="h-5 w-5">
                  <AudioStatusIndicator />
                </div>
            </div>
            <div className="w-full bg-gray-500 rounded-full h-1 mt-2">
                <div 
                    className="h-1 rounded-full transition-all duration-300 ease-linear"
                    style={{ width: `${progress}%`, backgroundColor: settings.primaryColor }}
                ></div>
            </div>
        </div>
      </div>
    </div>
  );
};
