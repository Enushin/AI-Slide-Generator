import React from 'react';
import { ClosingSlide as ClosingSlideData, DesignSettings } from '../../types';
import { SlideWrapper } from './common';

interface ClosingSlideProps {
  slide: ClosingSlideData;
  settings: DesignSettings;
}

export const ClosingSlide: React.FC<ClosingSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <div className="w-full h-full flex flex-col justify-center items-center text-center rounded-lg" style={{backgroundColor: settings.primaryColor}}>
        <h2 className="text-5xl font-bold text-white">ご清聴ありがとうございました</h2>
      </div>
    </SlideWrapper>
  );
};