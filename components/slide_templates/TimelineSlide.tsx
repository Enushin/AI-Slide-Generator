import React from 'react';
import { TimelineSlide as TimelineSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface TimelineSlideProps {
  slide: TimelineSlideData;
  settings: DesignSettings;
}

export const TimelineSlide: React.FC<TimelineSlideProps> = ({ slide, settings }) => {
  const stateColors = {
    done: settings.primaryColor,
    next: '#f59e0b', // amber-500
    todo: '#9ca3af', // gray-400
  };

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow flex items-center justify-center w-full pt-10">
        <div className="w-full relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 transform -translate-y-1/2"></div>
          <div className="relative flex justify-between w-full">
            {slide.milestones.map((milestone, index) => (
              <div key={index} className="relative flex flex-col items-center z-10">
                <div className={`absolute -top-8 text-sm font-semibold text-gray-600`}>
                  {milestone.date}
                </div>
                <div
                  className="w-5 h-5 rounded-full border-4 border-white shadow"
                  style={{ backgroundColor: stateColors[milestone.state || 'todo'] }}
                ></div>
                <div className="absolute top-8 w-40 text-center text-sm font-medium text-gray-700 bg-white p-1 rounded">
                  {milestone.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};
