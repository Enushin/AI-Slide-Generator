
import React, { useEffect, useState } from 'react';
import { Slide, DesignSettings } from '../types';
import { SlideRenderer } from './SlideRenderer';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './Icons';

interface MaximisedPreviewProps {
  slides: Slide[];
  settings: DesignSettings;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const MaximisedPreview: React.FC<MaximisedPreviewProps> = ({ slides, settings, currentIndex, onClose, onNext, onPrev }) => {
  const [slideForRender, setSlideForRender] = useState(slides[currentIndex]);
  const [isFading, setIsFading] = useState(false);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        onNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  if (slides.length === 0) return null;
  
  const handleNavigation = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); // Stop click from bubbling up to the backdrop
    action();
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-8"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
        <div 
            className="relative w-full max-w-[90vw] max-h-[90vh] aspect-video bg-white shadow-2xl rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
           <div className={`w-full h-full transition-opacity duration-200 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
             <SlideRenderer slide={slideForRender} settings={settings} />
           </div>
        </div>
        
        {/* Close Button */}
        <button
            onClick={(e) => handleNavigation(e, onClose)}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity"
            aria-label="閉じる"
        >
            <CloseIcon className="h-6 w-6" />
        </button>

        {/* Navigation Buttons */}
        <button
            onClick={(e) => handleNavigation(e, onPrev)}
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-3 hover:bg-opacity-60 transition-opacity disabled:opacity-0 disabled:cursor-default"
            aria-label="前のスライド"
            disabled={slides.length <= 1}
        >
            <ArrowLeftIcon className="h-8 w-8" />
        </button>
        <button
            onClick={(e) => handleNavigation(e, onNext)}
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-3 hover:bg-opacity-60 transition-opacity disabled:opacity-0 disabled:cursor-default"
            aria-label="次のスライド"
            disabled={slides.length <= 1}
        >
            <ArrowRightIcon className="h-8 w-8" />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white text-lg font-medium px-4 py-2 rounded-full">
            {currentIndex + 1} / {slides.length}
        </div>
    </div>
  );
};
