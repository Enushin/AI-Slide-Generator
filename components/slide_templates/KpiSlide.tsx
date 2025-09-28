
import React from 'react';
import { KpiSlide as KpiSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';
import { TrendUpIcon, TrendDownIcon, TrendNeutralIcon } from '../Icons';

interface KpiSlideProps {
  slide: KpiSlideData;
  settings: DesignSettings;
}

const statusClasses = {
  good: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: <TrendUpIcon className="w-5 h-5" />,
  },
  bad: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: <TrendDownIcon className="w-5 h-5" />,
  },
  neutral: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    icon: <TrendNeutralIcon className="w-5 h-5" />,
  }
};

export const KpiSlide: React.FC<KpiSlideProps> = ({ slide, settings }) => {
  const columns = slide.columns || slide.items.length;
  const gridCols = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[columns] || 'grid-cols-2';

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className={`grid ${gridCols} gap-8 flex-grow pt-4 items-stretch`}>
        {slide.items.map((item, index) => {
          const statusStyle = statusClasses[item.status];
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-l-4 flex flex-col justify-center" style={{borderColor: settings.primaryColor}}>
              <p className="text-lg font-semibold text-gray-500">{item.label}</p>
              <p className="text-5xl font-bold text-gray-800 my-2">{item.value}</p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                {statusStyle.icon}
                <span>{item.change}</span>
              </div>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
};