import React from 'react';
import { ProcessListSlide as ProcessListSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface ProcessListSlideProps {
  slide: ProcessListSlideData;
  settings: DesignSettings;
}

export const ProcessListSlide: React.FC<ProcessListSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4">
        <ol className="space-y-4">
          {slide.steps.map((step, index) => (
            <li key={index} className="flex items-start text-xl">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0 mr-5 flex items-center justify-center text-white font-bold bg-gray-400"
              >
                {index + 1}
              </div>
              <span className="text-gray-700 pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </SlideWrapper>
  );
};
