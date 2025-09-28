import React from 'react';
import { CardsSlide as CardsSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader, StyledText } from './common';

interface CardsSlideProps {
  slide: CardsSlideData;
  settings: DesignSettings;
}

export const CardsSlide: React.FC<CardsSlideProps> = ({ slide, settings }) => {
  const columns = slide.columns || (slide.items.length > 4 ? 3 : 2);
  const gridCols = { 2: 'grid-cols-2', 3: 'grid-cols-3' }[columns] || 'grid-cols-2';

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className={`grid ${gridCols} gap-6 flex-grow pt-4 items-stretch`}>
        {slide.items.map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col">
            {typeof item === 'string' ? (
              <StyledText text={item} settings={settings} className="text-gray-800 text-lg" />
            ) : (
              <>
                <h3 className="font-bold text-xl mb-2" style={{color: settings.primaryColor}}>{item.title}</h3>
                {item.desc && <StyledText text={item.desc} settings={settings} className="text-gray-700" />}
              </>
            )}
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};