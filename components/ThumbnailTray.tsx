
import React from 'react';
import { Slide, DesignSettings } from '../types';
import { SlideRenderer } from './SlideRenderer';

interface ThumbnailTrayProps {
  slides: Slide[];
  currentIndex: number;
  settings: DesignSettings;
  onSelect: (index: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

export const ThumbnailTray: React.FC<ThumbnailTrayProps> = ({ slides, currentIndex, settings, onSelect, onReorder }) => {
  const dragItem = React.useRef<number | null>(null);
  const dragOverItem = React.useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragItem.current = index;
    // Add a slight delay to allow the browser to generate a drag image
    setTimeout(() => {
        const draggedElement = e.target as HTMLDivElement;
        draggedElement.classList.add('opacity-50', 'shadow-2xl');
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      onReorder(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const draggedElement = e.target as HTMLDivElement;
    draggedElement.classList.remove('opacity-50', 'shadow-2xl');
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault(); // Necessary to allow dropping
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4 shadow-inner border border-gray-200">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {slides.map((slide, index) => (
          <div
            key={`thumb-${index}-${slide.type}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => onSelect(index)}
            className={`
              relative flex-shrink-0 w-40 h-[90px] cursor-pointer rounded-md overflow-hidden bg-white
              transition-all duration-200
              ${currentIndex === index ? 'ring-4 ring-offset-2' : 'ring-1 ring-gray-300 hover:ring-2'}
            `}
            // FIX: The `ringColor` property is not a valid CSS property.
            // Replaced with `--tw-ring-color` CSS variable to set Tailwind's ring color,
            // and made the style conditional to only apply to the selected item,
            // resolving a conflict with the `ring-gray-300` class for unselected items.
            style={
              currentIndex === index
                ? ({ '--tw-ring-color': settings.primaryColor } as React.CSSProperties)
                : undefined
            }
            title={`スライド ${index + 1}`}
          >
            <div className="absolute inset-0 transform scale-[0.125] origin-top-left pointer-events-none" style={{ width: '1280px', height: '720px' }}>
                <SlideRenderer slide={slide} settings={settings} />
            </div>
            <div className="absolute bottom-1 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
