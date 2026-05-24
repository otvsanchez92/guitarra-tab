export type TTechnique =
  | 'none'
  | 'slide-up'
  | 'slide-down'
  | 'hammer-on'
  | 'pull-off'
  | 'bend'
  | 'bend-release'
  | 'vibrato'
  | 'tap';

export type TTabNote = {
  id: string;
  string: number;
  fret: number;
  technique: TTechnique;
};
