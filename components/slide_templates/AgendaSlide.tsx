import React from 'react';
import { AgendaSlide as AgendaSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface AgendaSlideProps {
  slide: AgendaSlideData;
  settings: DesignSettings;
}

export const AgendaSlide: React.FC<AgendaSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title || 'アジェンダ'} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4">
        <ul className="space-y-6">
          {slide.items.map((item, index) => (
            <li key={index} className="flex items-center text-2xl">
              <div
                className="w-12 h-12 rounded-full flex-shrink-0 mr-6 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: settings.primaryColor }}
              >
                {index + 1}
              </div>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </SlideWrapper>
  );
};