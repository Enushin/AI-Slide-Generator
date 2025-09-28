// Common Properties
interface BaseSlide {
  notes?: string;
  title?: string;
  subhead?: string;
}

// Slide Types
export interface TitleSlide extends BaseSlide {
  type: 'title';
  title: string;
  date: string;
}

export interface SectionSlide extends BaseSlide {
  type: 'section';
  title: string;
  sectionNo?: number;
}

export interface ClosingSlide extends BaseSlide {
  type: 'closing';
}

// Content Patterns
export interface ContentSlide extends BaseSlide {
  type: 'content';
  points?: string[];
  twoColumn?: boolean;
  columns?: [string[], string[]];
}

export interface AgendaSlide extends BaseSlide {
  type: 'agenda';
  items: string[];
}

export interface CompareSlide extends BaseSlide {
  type: 'compare';
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
}

export interface ProcessSlide extends BaseSlide {
  type: 'process';
  steps: string[];
}

export interface ProcessListSlide extends BaseSlide {
  type: 'processList';
  steps: string[];
}

export interface TimelineSlide extends BaseSlide {
  type: 'timeline';
  milestones: {
    label: string;
    date: string;
    state?: 'done' | 'next' | 'todo';
  }[];
}

export interface DiagramSlide extends BaseSlide {
  type: 'diagram';
  lanes: { title: string; items: string[] }[];
}

export interface CycleSlide extends BaseSlide {
  type: 'cycle';
  items: { label: string; subLabel?: string }[];
  centerText?: string;
}

export interface CardsSlide extends BaseSlide {
  type: 'cards';
  columns?: 2 | 3;
  items: (string | { title: string; desc?: string })[];
}

export interface HeaderCardsSlide extends BaseSlide {
  type: 'headerCards';
  columns?: 2 | 3;
  items: { title: string; desc?: string }[];
}

export interface TableSlide extends BaseSlide {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export interface ProgressSlide extends BaseSlide {
  type: 'progress';
  items: { label: string; percent: number }[];
}

export interface QuoteSlide extends BaseSlide {
  type: 'quote';
  text: string;
  author: string;
}

export interface KpiSlide extends BaseSlide {
  type: 'kpi';
  columns?: 2 | 3 | 4;
  items: {
    label: string;
    value: string;
    change: string;
    status: 'good' | 'bad' | 'neutral';
  }[];
}

export interface BulletCardsSlide extends BaseSlide {
  type: 'bulletCards';
  items: { title: string; desc: string }[];
}

export interface FaqSlide extends BaseSlide {
  type: 'faq';
  items: { q: string; a: string }[];
}

export interface StatsCompareSlide extends BaseSlide {
  type: 'statsCompare';
  leftTitle: string;
  rightTitle: string;
  stats: {
    label: string;
    leftValue: string;
    rightValue: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

export interface BarCompareSlide extends BaseSlide {
  type: 'barCompare';
  stats: {
    label: string;
    leftValue: string;
    rightValue: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  showTrends?: boolean;
}

export interface TriangleSlide extends BaseSlide {
  type: 'triangle';
  items: { title: string; desc?: string }[];
}

export interface PyramidSlide extends BaseSlide {
  type: 'pyramid';
  levels: { title: string; description: string }[];
}

export interface FlowChartSlide extends BaseSlide {
  type: 'flowChart';
  flows: { steps: string[] }[];
}

export interface StepUpSlide extends BaseSlide {
  type: 'stepUp';
  items: { title: string; desc: string }[];
}

export interface ImageTextSlide extends BaseSlide {
  type: 'imageText';
  image: string;
  imageCaption?: string;
  imagePosition?: 'left' | 'right';
  points: string[];
}

export interface VisualSlide extends BaseSlide {
  type: 'visual';
  title: string;
  subhead?: string;
  image: string;
}

// Union Type for all slides
export type Slide =
  | TitleSlide
  | SectionSlide
  | ClosingSlide
  | ContentSlide
  | AgendaSlide
  | CompareSlide
  | ProcessSlide
  | ProcessListSlide
  | TimelineSlide
  | DiagramSlide
  | CycleSlide
  | CardsSlide
  | HeaderCardsSlide
  | TableSlide
  | ProgressSlide
  | QuoteSlide
  | KpiSlide
  | BulletCardsSlide
  | FaqSlide
  | StatsCompareSlide
  | BarCompareSlide
  | TriangleSlide
  | PyramidSlide
  | FlowChartSlide
  | StepUpSlide
  | ImageTextSlide
  | VisualSlide;
  
export type SlideData = Slide[];

export interface DesignSettings {
  primaryColor: string;
  fontFamily: string;
  showDate: boolean;
  dateText: string;
  subtitleText: string;
  footerText: string;
}