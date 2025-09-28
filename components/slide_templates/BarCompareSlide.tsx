import React from 'react';
import { BarCompareSlide as BarCompareSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';
import { TrendUpIcon, TrendDownIcon, TrendNeutralIcon } from '../Icons';

interface BarCompareSlideProps {
  slide: BarCompareSlideData;
  settings: DesignSettings;
}

const parseValue = (value: string) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
}

const TrendIcon: React.FC<{trend?: 'up' | 'down' | 'neutral'}> = ({trend}) => {
    if (!trend) return null;
    const iconMap = {
        up: <TrendUpIcon className="w-5 h-5 text-green-500" />,
        down: <TrendDownIcon className="w-5 h-5 text-red-500" />,
        neutral: <TrendNeutralIcon className="w-5 h-5 text-gray-500" />,
    };
    return iconMap[trend];
}

export const BarCompareSlide: React.FC<BarCompareSlideProps> = ({ slide, settings }) => {
    const allValues = slide.stats.flatMap(s => [parseValue(s.leftValue), parseValue(s.rightValue)]);
    const maxValue = Math.max(...allValues, 1);

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4 space-y-4">
        {slide.stats.map((stat, index) => {
            const leftWidth = (parseValue(stat.leftValue) / maxValue) * 100;
            const rightWidth = (parseValue(stat.rightValue) / maxValue) * 100;
            return(
                <div key={index} className="grid grid-cols-[1fr_auto_1fr] gap-x-4 items-center">
                    {/* Left Bar */}
                    <div className="flex items-center justify-end">
                        <span className="text-lg font-bold mr-3">{stat.leftValue}</span>
                        <div className="w-full bg-gray-200 rounded-l-full h-8">
                            <div className="bg-gray-400 h-8 rounded-l-full" style={{width: `${leftWidth}%`}}></div>
                        </div>
                    </div>
                    {/* Center Label */}
                    <div className="text-center font-semibold text-gray-700 w-32">
                        {stat.label}
                        {slide.showTrends && <div className="flex justify-center"><TrendIcon trend={stat.trend}/></div>}
                    </div>
                    {/* Right Bar */}
                    <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-r-full h-8">
                            <div className="h-8 rounded-r-full" style={{width: `${rightWidth}%`, backgroundColor: settings.primaryColor}}></div>
                        </div>
                        <span className="text-lg font-bold ml-3">{stat.rightValue}</span>
                    </div>
                </div>
            )
        })}
      </div>
    </SlideWrapper>
  );
};
