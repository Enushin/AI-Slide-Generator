import React from 'react';
import { DesignSettings } from '../../types';

interface StyledTextProps {
  text: string;
  settings: DesignSettings;
  className?: string;
}

export const parseStyledText = (text: string, primaryColor: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*.*?\*\*|\[\[.*?\]\])/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('[[') && part.endsWith(']]')) {
      return (
        <strong key={index} style={{ color: primaryColor }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const StyledText: React.FC<StyledTextProps> = ({ text, settings, className }) => {
    const content = parseStyledText(text, settings.primaryColor);
    return <p className={className}>{content}</p>;
};


export const SlideWrapper: React.FC<{children: React.ReactNode, settings: DesignSettings}> = ({ children, settings }) => (
    <div className="w-full h-full p-16 flex flex-col relative" style={{ fontFamily: settings.fontFamily }}>
        {children}
        {settings.footerText && (
            <div className="absolute bottom-6 left-16 text-sm text-gray-500">
                {settings.footerText}
            </div>
        )}
    </div>
);

export const SlideHeader: React.FC<{title?: string, subhead?: string, settings: DesignSettings}> = ({ title, subhead, settings }) => {
    // [[...]] と **...** を除去するヘルパー関数
    const cleanText = (text?: string) => text?.replace(/\[\[|\]\]|\*\*/g, '') || '';

    return (
        <div className="mb-8">
            {title && <h1 className="text-4xl font-bold text-gray-800" style={{borderBottom: `4px solid ${settings.primaryColor}`, paddingBottom: '0.5rem'}}>{cleanText(title)}</h1>}
            {subhead && <p className="text-xl text-gray-600 mt-4">{cleanText(subhead)}</p>}
        </div>
    );
};