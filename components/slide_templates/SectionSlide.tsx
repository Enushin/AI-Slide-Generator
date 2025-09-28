import React from 'react';
import { SectionSlide as SectionSlideData, DesignSettings } from '../../types';
import { SlideWrapper } from './common';

interface SectionSlideProps {
  slide: SectionSlideData;
  settings: DesignSettings;
}

export const SectionSlide: React.FC<SectionSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
       <div className="w-full h-full flex flex-col justify-center items-center text-center bg-gray-800 text-white rounded-lg relative overflow-hidden">
        {slide.sectionNo !== undefined && (
          <div className="absolute -bottom-10 -right-10 text-[250px] font-bold text-white opacity-10">
            {String(slide.sectionNo).padStart(2, '0')}
          </div>
        )}
        <div className="z-10">
           <h2 className="text-6xl font-bold tracking-tight">{slide.title}</h2>
        </div>
      </div>
    </SlideWrapper>
  );
};