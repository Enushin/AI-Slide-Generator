
import React from 'react';
import { StepUpSlide as StepUpSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

// A simple utility to generate shades of a color
const shadeColor = (color: string, percent: number) => {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(String(R * (100 + percent) / 100));
    G = parseInt(String(G * (100 + percent) / 100));
    B = parseInt(String(B * (100 + percent) / 100));

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

interface StepUpSlideProps {
  slide: StepUpSlideData;
  settings: DesignSettings;
}

export const StepUpSlide: React.FC<StepUpSlideProps> = ({ slide, settings }) => {
  const items = slide.items.slice(0, 5);
  const colors = items.map((_, i) => shadeColor(settings.primaryColor, - i * 10));

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow flex items-end justify-center space-x-2 pb-8">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col-reverse w-1/5">
            <div 
              className="bg-gray-100 p-4 rounded-b-lg flex-grow flex items-center"
              style={{ height: `${(index + 1) * 20 + 40}%` }}
            >
              <p className="text-gray-700">{item.desc}</p>
            </div>
            <div 
              className="text-white font-bold p-3 text-center rounded-t-lg"
              style={{ backgroundColor: colors[index] }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};
