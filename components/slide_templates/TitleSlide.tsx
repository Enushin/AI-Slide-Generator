import React from 'react';
import { TitleSlide as TitleSlideData, DesignSettings } from '../../types';
import { SlideWrapper } from './common';

interface TitleSlideProps {
  slide: TitleSlideData;
  settings: DesignSettings;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
       <div className="w-full h-full flex flex-col justify-center items-center text-center bg-gray-50 rounded-lg p-8">
        <div className="flex-grow flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-gray-800" style={{ color: settings.primaryColor }}>
            {slide.title}
          </h1>
           {settings.subtitleText && (
            <p className="mt-6 text-2xl text-gray-600">{settings.subtitleText}</p>
          )}
        </div>
        {settings.showDate && (
          <p className="text-2xl text-gray-500">{settings.dateText || slide.date}</p>
        )}
      </div>
    </SlideWrapper>
  );
};