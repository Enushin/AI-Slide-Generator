import React from 'react';
import { StatsCompareSlide as StatsCompareSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';
import { TrendUpIcon, TrendDownIcon, TrendNeutralIcon } from '../Icons';

interface StatsCompareSlideProps {
  slide: StatsCompareSlideData;
  settings: DesignSettings;
}

const TrendIcon: React.FC<{trend?: 'up' | 'down' | 'neutral'}> = ({trend}) => {
    switch (trend) {
        case 'up': return <TrendUpIcon className="w-5 h-5 text-green-500" />;
        case 'down': return <TrendDownIcon className="w-5 h-5 text-red-500" />;
        case 'neutral': return <TrendNeutralIcon className="w-5 h-5 text-gray-500" />;
        default: return null;
    }
}

export const StatsCompareSlide: React.FC<StatsCompareSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-x-8 items-center text-center text-2xl font-bold mb-4">
            <h3 style={{color: settings.primaryColor}}>{slide.leftTitle}</h3>
            <div></div>
            <h3 style={{color: settings.primaryColor}}>{slide.rightTitle}</h3>
        </div>
        <div className="space-y-3">
          {slide.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-[1fr_auto_1fr] gap-x-8 items-center p-3 rounded-lg bg-gray-50">
              <div className="text-right text-3xl font-bold text-gray-700">{stat.leftValue}</div>
              <div className="text-center">
                <p className="font-semibold text-lg text-gray-600">{stat.label}</p>
                {stat.trend && <div className="flex justify-center mt-1"><TrendIcon trend={stat.trend} /></div>}
              </div>
              <div className="text-left text-3xl font-bold text-gray-700">{stat.rightValue}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};
