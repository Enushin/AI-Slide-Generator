
import React from 'react';
import { ImageTextSlide as ImageTextSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader, StyledText } from './common';

interface ImageTextSlideProps {
  slide: ImageTextSlideData;
  settings: DesignSettings;
}

export const ImageTextSlide: React.FC<ImageTextSlideProps> = ({ slide, settings }) => {
  const imagePosition = slide.imagePosition || 'left';
  
  const ImageColumn = () => (
    <div className="flex flex-col h-full">
      <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        <img src={slide.image} alt={slide.imageCaption || slide.title} className="w-full h-full object-cover" />
      </div>
      {slide.imageCaption && <p className="text-center text-sm text-gray-500 mt-2">{slide.imageCaption}</p>}
    </div>
  );

  const TextColumn = () => (
    <div className="h-full">
      <ul className="space-y-4">
        {slide.points.map((point, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 mr-3 mt-1.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" style={{color: settings.primaryColor}}>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <StyledText text={point} settings={settings} className="text-xl text-gray-700" />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="grid grid-cols-2 gap-12 flex-grow pt-4">
        {imagePosition === 'left' ? (
          <>
            <ImageColumn />
            <TextColumn />
          </>
        ) : (
          <>
            <TextColumn />
            <ImageColumn />
          </>
        )}
      </div>
    </SlideWrapper>
  );
};
