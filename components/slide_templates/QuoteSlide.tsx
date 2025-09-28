
import React from 'react';
import { QuoteSlide as QuoteSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface QuoteSlideProps {
  slide: QuoteSlideData;
  settings: DesignSettings;
}

export const QuoteSlide: React.FC<QuoteSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow flex items-center justify-center text-center">
        <blockquote className="max-w-4xl">
          <p className="text-4xl italic text-gray-800 leading-relaxed">
            “{slide.text}”
          </p>
          <footer className="mt-8 text-2xl font-semibold text-gray-600">
            — {slide.author}
          </footer>
        </blockquote>
      </div>
    </SlideWrapper>
  );
};
