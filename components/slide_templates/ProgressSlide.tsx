import React from 'react';
import { ProgressSlide as ProgressSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface ProgressSlideProps {
  slide: ProgressSlideData;
  settings: DesignSettings;
}

export const ProgressSlide: React.FC<ProgressSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4 space-y-6">
        {slide.items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg font-medium text-gray-700">{item.label}</span>
              <span className="text-lg font-bold" style={{color: settings.primaryColor}}>{item.percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 rounded-full"
                style={{ width: `${item.percent}%`, backgroundColor: settings.primaryColor }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};
