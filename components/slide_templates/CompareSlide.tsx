
import React from 'react';
import { CompareSlide as CompareSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader, StyledText } from './common';
import { CheckIcon, XIcon } from '../Icons';

interface CompareSlideProps {
  slide: CompareSlideData;
  settings: DesignSettings;
}

export const CompareSlide: React.FC<CompareSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="grid grid-cols-2 gap-8 flex-grow pt-4">
        {/* Left Column */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-2xl font-bold text-green-800 mb-4">{slide.leftTitle}</h3>
          <ul className="space-y-3">
            {slide.leftItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="w-6 h-6 mr-3 text-green-500 flex-shrink-0 mt-1" />
                <StyledText text={item} settings={settings} className="text-lg text-gray-700" />
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right Column */}
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-2xl font-bold text-red-800 mb-4">{slide.rightTitle}</h3>
          <ul className="space-y-3">
            {slide.rightItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <XIcon className="w-6 h-6 mr-3 text-red-500 flex-shrink-0 mt-1" />
                <StyledText text={item} settings={settings} className="text-lg text-gray-700" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideWrapper>
  );
};
