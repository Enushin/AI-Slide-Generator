import React from 'react';
import { VisualSlide as VisualSlideData, DesignSettings } from '../../types';

interface VisualSlideProps {
  slide: VisualSlideData;
  settings: DesignSettings;
}

export const VisualSlide: React.FC<VisualSlideProps> = ({ slide, settings }) => {
  // [[...]] と **...** を除去するヘルパー関数
  const cleanText = (text?: string) => text?.replace(/\[\[|\]\]|\*\*/g, '') || '';

  return (
    <div className="w-full h-full relative bg-gray-800" style={{ fontFamily: settings.fontFamily }}>
        <img 
            src={slide.image} 
            className="absolute inset-0 w-full h-full object-cover" 
            alt={cleanText(slide.title)} 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative w-full h-full p-16 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-6xl font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {cleanText(slide.title)}
            </h1>
            {slide.subhead && (
                <p className="mt-6 text-3xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {cleanText(slide.subhead)}
                </p>
            )}
        </div>
        {settings.footerText && (
            <div 
                className="absolute bottom-6 left-16 text-sm text-gray-200" 
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
            >
                {settings.footerText}
            </div>
        )}
    </div>
  );
};
