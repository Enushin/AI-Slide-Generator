import React from 'react';
import { BulletCardsSlide as BulletCardsSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface BulletCardsSlideProps {
  slide: BulletCardsSlideData;
  settings: DesignSettings;
}

export const BulletCardsSlide: React.FC<BulletCardsSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {slide.items.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border-t-4" style={{borderColor: settings.primaryColor}}>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};