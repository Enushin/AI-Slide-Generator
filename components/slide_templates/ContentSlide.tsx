
import React from 'react';
import { ContentSlide as ContentSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader, StyledText } from './common';

interface ContentSlideProps {
  slide: ContentSlideData;
  settings: DesignSettings;
}

const BulletList: React.FC<{ items: string[]; settings: DesignSettings }> = ({ items, settings }) => (
  <ul className="space-y-4">
    {items.map((point, index) => (
      <li key={index} className="flex items-start">
        <svg className="w-5 h-5 mr-3 mt-1.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" style={{color: settings.primaryColor}}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <StyledText text={point} settings={settings} className="text-xl text-gray-700" />
      </li>
    ))}
  </ul>
);

export const ContentSlide: React.FC<ContentSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4">
        {slide.twoColumn && slide.columns ? (
          <div className="grid grid-cols-2 gap-12 h-full">
            <div>
              <BulletList items={slide.columns[0]} settings={settings} />
            </div>
            <div>
              <BulletList items={slide.columns[1]} settings={settings} />
            </div>
          </div>
        ) : (
          slide.points && <BulletList items={slide.points} settings={settings} />
        )}
      </div>
    </SlideWrapper>
  );
};
