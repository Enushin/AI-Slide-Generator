import React from 'react';
import { TriangleSlide as TriangleSlideData, DesignSettings } from '../../types';
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

interface TriangleSlideProps {
  slide: TriangleSlideData;
  settings: DesignSettings;
}

export const TriangleSlide: React.FC<TriangleSlideProps> = ({ slide, settings }) => {
  const items = [...(slide.items || [])];
  while (items.length < 3) {
    items.push({ title: '...', desc: '' });
  }
  items.length = 3;
  
  const colors = items.map((_, i) => shadeColor(settings.primaryColor, i * -15));
  
  const positions = [
    { top: '0', left: '50%', transform: 'translateX(-50%)' },
    { bottom: '0', left: '15%', transform: 'translateX(-50%)' },
    { bottom: '0', right: '15%', transform: 'translateX(50%)' },
  ];

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-96 h-80 relative">
          {items.map((item, index) => (
            <div 
              key={index}
              className="absolute w-40 h-32 flex flex-col items-center justify-center text-center rounded-lg shadow-lg p-2 text-white"
              style={{ ...positions[index], backgroundColor: colors[index] }}
            >
              <h3 className="font-bold text-lg">{item.title}</h3>
              {item.desc && <p className="text-sm opacity-90 mt-1">{item.desc}</p>}
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};
