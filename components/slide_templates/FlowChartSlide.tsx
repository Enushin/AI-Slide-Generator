
import React from 'react';
import { FlowChartSlide as FlowChartSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';
import { ArrowRightIcon } from '../Icons';

interface FlowChartSlideProps {
  slide: FlowChartSlideData;
  settings: DesignSettings;
}

export const FlowChartSlide: React.FC<FlowChartSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow flex flex-col justify-center space-y-8 pt-4">
        {slide.flows.map((flow, flowIndex) => (
          <div key={flowIndex} className="flex items-center justify-center">
            {flow.steps.map((step, stepIndex) => (
              <React.Fragment key={stepIndex}>
                <div 
                  className="p-4 rounded-lg shadow-md text-center text-lg font-medium"
                  style={{ backgroundColor: `${settings.primaryColor}20`, border: `2px solid ${settings.primaryColor}`}}
                >
                  {step}
                </div>
                {stepIndex < flow.steps.length - 1 && (
                  <ArrowRightIcon className="w-10 h-10 text-gray-400 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
};
