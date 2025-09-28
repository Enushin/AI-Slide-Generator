
import React from 'react';
import { PyramidSlide as PyramidSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface PyramidSlideProps {
  slide: PyramidSlideData;
  settings: DesignSettings;
}

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


export const PyramidSlide: React.FC<PyramidSlideProps> = ({ slide, settings }) => {
  const levels = slide.levels.slice(0, 4).reverse(); // Reverse for bottom-up rendering
  const totalLevels = levels.length;
  const colors = levels.map((_, i) => shadeColor(settings.primaryColor, -i * 15));

  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl">
          {levels.map((level, index) => (
            <div
              key={index}
              className="relative mx-auto text-center text-white p-4 shadow-lg flex flex-col justify-center"
              style={{
                width: `${100 - (index * 15)}%`,
                backgroundColor: colors[index],
                clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)',
                minHeight: '80px',
                marginTop: '-20px'
              }}
            >
              <h3 className="font-bold text-xl">{level.title}</h3>
              <p className="text-sm opacity-90">{level.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
};
