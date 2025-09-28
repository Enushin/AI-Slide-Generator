import React from 'react';
import { HeaderCardsSlide as HeaderCardsSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface HeaderCardsSlideProps {
  slide: HeaderCardsSlideData;
  settings: DesignSettings;
}

export const HeaderCardsSlide: React.FC<HeaderCardsSlideProps> = ({ slide, settings }) => {
  const columns = slide.columns || (slide.items.length > 4 ? 3 : 2);
  const gridCols = { 2: 'grid-cols-2', 3: 'grid-cols-3' }[columns] || 'grid-cols-2';
  
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className={`grid ${gridCols} gap-6 flex-grow pt-4 items-stretch`}>
        {slide.items.map((item, index) => (
          <div key={index} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div 
              className="p-4 text-white font-bold text-xl text-center"
              style={{ backgroundColor: settings.primaryColor }}
            >
              {item.title}
            </div>
            {item.desc && (
              <div className="p-4 text-gray-700 text-base flex-grow">
                {item.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};