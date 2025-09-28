import React from 'react';
import { Slide, DesignSettings } from '../types';
import { 
  TitleSlide, 
  SectionSlide, 
  ContentSlide, 
  ClosingSlide, 
  AgendaSlide, 
  CompareSlide, 
  ProcessSlide, 
  ImageTextSlide, 
  KpiSlide, 
  FaqSlide, 
  QuoteSlide, 
  TableSlide, 
  PyramidSlide, 
  StepUpSlide, 
  FlowChartSlide,
  HeaderCardsSlide,
  ProcessListSlide,
  TimelineSlide,
  DiagramSlide,
  CycleSlide,
  CardsSlide,
  ProgressSlide,
  BulletCardsSlide,
  StatsCompareSlide,
  BarCompareSlide,
  TriangleSlide,
  VisualSlide
} from './slide_templates';

interface SlideRendererProps {
  slide: Slide;
  settings: DesignSettings;
}

const slideNotImplemented = (type: string) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100 p-8">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-500">スライドタイプが実装されていません</h2>
      <p className="text-gray-600 mt-2">スライドタイプ <code className="bg-red-100 p-1 rounded text-red-700">{type}</code> はまだ実装されていません。</p>
    </div>
  </div>
);


export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, settings }) => {
  const commonProps = { slide, settings } as any;

  switch (slide.type) {
    case 'title':
      return <TitleSlide {...commonProps} />;
    case 'section':
      return <SectionSlide {...commonProps} />;
    case 'content':
      return <ContentSlide {...commonProps} />;
    case 'closing':
        return <ClosingSlide {...commonProps} />;
    case 'agenda':
        return <AgendaSlide {...commonProps} />;
    case 'compare':
        return <CompareSlide {...commonProps} />;
    case 'process':
        return <ProcessSlide {...commonProps} />;
    case 'imageText':
        return <ImageTextSlide {...commonProps} />;
    case 'kpi':
        return <KpiSlide {...commonProps} />;
    case 'faq':
        return <FaqSlide {...commonProps} />;
    case 'quote':
        return <QuoteSlide {...commonProps} />;
    case 'table':
        return <TableSlide {...commonProps} />;
    case 'pyramid':
        return <PyramidSlide {...commonProps} />;
    case 'stepUp':
        return <StepUpSlide {...commonProps} />;
    case 'flowChart':
        return <FlowChartSlide {...commonProps} />;
    case 'headerCards':
        return <HeaderCardsSlide {...commonProps} />;
    case 'processList':
        return <ProcessListSlide {...commonProps} />;
    case 'timeline':
        return <TimelineSlide {...commonProps} />;
    case 'diagram':
        return <DiagramSlide {...commonProps} />;
    case 'cycle':
        return <CycleSlide {...commonProps} />;
    case 'cards':
        return <CardsSlide {...commonProps} />;
    case 'progress':
        return <ProgressSlide {...commonProps} />;
    case 'bulletCards':
        return <BulletCardsSlide {...commonProps} />;
    case 'statsCompare':
        return <StatsCompareSlide {...commonProps} />;
    case 'barCompare':
        return <BarCompareSlide {...commonProps} />;
    case 'triangle':
        return <TriangleSlide {...commonProps} />;
    case 'visual':
        return <VisualSlide {...commonProps} />;
    default:
      return slideNotImplemented((slide as any).type);
  }
};