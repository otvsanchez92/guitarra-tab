 import { TActive } from '@/store/types';

export type TGuitarProps = {
  tuning: string[];
  onSelectNote: ({ x, y }: { x: number; y: number }) => void;
  strings: number;
  color: string;
  editTuning: boolean;
  frets: number;
  notes: TActive[];
};

export interface IMarksProps extends TActive {
  strings: number;
}
