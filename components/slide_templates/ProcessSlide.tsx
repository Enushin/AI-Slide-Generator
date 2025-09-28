
import React from 'react';
import { ProcessSlide as ProcessSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface ProcessSlideProps {
  slide: ProcessSlideData;
  settings: DesignSettings;
}

export const ProcessSlide: React.FC<ProcessSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow flex justify-center items-center pt-4">
        <div className="flex items-center justify-center space-x-4">
          {slide.steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center w-48">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg" 
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {index + 1}
                </div>
                <p className="font-semibold text-lg text-gray-700">{step}</p>
              </div>
              {index < slide.steps.length - 1 && (
                 <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};
