import React from 'react';
import { DiagramSlide as DiagramSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface DiagramSlideProps {
  slide: DiagramSlideData;
  settings: DesignSettings;
}

export const DiagramSlide: React.FC<DiagramSlideProps> = ({ slide, settings }) => {
  const laneCount = slide.lanes.length;
  const gridCols = `grid-cols-${laneCount}`;

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className={`grid ${gridCols} gap-4 flex-grow pt-4`}>
        {slide.lanes.map((lane, index) => (
          <div key={index} className="flex flex-col">
            <div 
              className="text-center font-bold text-white p-3 rounded-t-lg"
              style={{ backgroundColor: settings.primaryColor }}
            >
              {lane.title}
            </div>
            <div className="bg-gray-50 p-3 rounded-b-lg border-x border-b border-gray-200 h-full">
              <ul className="space-y-2">
                {lane.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="bg-white p-3 rounded shadow text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};
