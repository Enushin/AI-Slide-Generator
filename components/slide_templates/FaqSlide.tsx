import React from 'react';
import { FaqSlide as FaqSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface FaqSlideProps {
  slide: FaqSlideData;
  settings: DesignSettings;
}

export const FaqSlide: React.FC<FaqSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title || 'よくある質問'} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4 space-y-6">
        {slide.items.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-xl font-semibold flex items-start">
              <span className="text-2xl font-bold mr-4" style={{color: settings.primaryColor}}>Q.</span>
              <span>{item.q}</span>
            </h3>
            <p className="text-lg text-gray-700 mt-2 flex items-start">
              <span className="text-2xl font-bold mr-4 text-gray-500">A.</span>
              <span>{item.a}</span>
            </p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};