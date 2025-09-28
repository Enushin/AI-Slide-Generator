import React from 'react';
import { CycleSlide as CycleSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';
import { ArrowRightIcon } from '../Icons';

interface CycleSlideProps {
  slide: CycleSlideData;
  settings: DesignSettings;
}

export const CycleSlide: React.FC<CycleSlideProps> = ({ slide, settings }) => {
  // Ensure we have exactly 4 items for the layout
  const items = [...(slide.items || [])];
  while (items.length < 4) {
    items.push({ label: '...', subLabel: '' });
  }
  items.length = 4;

  const positions = [
    { top: '50%', left: '0%', transform: 'translateY(-50%)' },
    { top: '0%', left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', right: '0%', transform: 'translateY(-50%)' },
    { bottom: '0%', left: '50%', transform: 'translateX(-50%)' },
  ];
  
  const arrowPositions = [
    { top: '25%', left: '50%', transform: 'translateX(-50%) rotate(90deg)' },
    { top: '50%', right: '25%', transform: 'translateY(-50%)' },
    { bottom: '25%', left: '50%', transform: 'translateX(-50%) rotate(-90deg)' },
    { top: '50%', left: '25%', transform: 'translateY(-50%) rotate(180deg)' },
  ]

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-96 h-96 relative">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="absolute w-32 h-32 bg-gray-100 rounded-full flex flex-col items-center justify-center text-center p-2 shadow"
              style={positions[index]}
            >
              <span className="font-bold" style={{color: settings.primaryColor}}>{item.label}</span>
              {item.subLabel && <span className="text-xs text-gray-600">{item.subLabel}</span>}
            </div>
          ))}
          {arrowPositions.map((pos, index) => (
            <ArrowRightIcon key={index} className="absolute w-8 h-8 text-gray-400" style={pos} />
          ))}
          {slide.centerText && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex items-center justify-center text-center p-2 font-bold text-white" style={{backgroundColor: settings.primaryColor}}>
              {slide.centerText}
            </div>
          )}
        </div>
      </div>
    </SlideWrapper>
  );
};
