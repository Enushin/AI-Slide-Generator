
import React from 'react';
import { TableSlide as TableSlideData, DesignSettings } from '../../types';
import { SlideWrapper, SlideHeader } from './common';

interface TableSlideProps {
  slide: TableSlideData;
  settings: DesignSettings;
}

export const TableSlide: React.FC<TableSlideProps> = ({ slide, settings }) => {
  return (
    <SlideWrapper settings={settings}>
      <SlideHeader title={slide.title} subhead={slide.subhead} settings={settings} />
      <div className="flex-grow pt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {slide.headers.map((header, index) => (
                <th 
                  key={index} 
                  className="p-4 text-xl font-bold text-white border-b-2 border-gray-200"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-4 text-lg text-gray-700 border-b border-gray-200">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideWrapper>
  );
};
