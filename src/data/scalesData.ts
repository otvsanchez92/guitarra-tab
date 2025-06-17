import { patterns, getScaleNotes } from './scaleUtils';

export interface ScaleData {
  title: string;
  pattern: number[]; // Pattern of the scale (e.g., "2 - 2 - 1 - 2 - 2 - 2 - 1" for major)
  description: string;
  type: string;
  examples: string[];
  id: string;
}



export const commonScales: ScaleData[] = [
  {
    title: 'scales.major.title',
    description: 'scales.major.description',
    pattern: patterns.major,
    type: 'diatonic',
    examples: getScaleNotes('major', 'C'),
    id: 'major',
  },
  {
    title: 'scales.natural_minor.title',
    description: 'scales.natural_minor.description',
    pattern: patterns.natural_minor,
    type: 'diatonic',
    examples: getScaleNotes('natural_minor', 'C'),
    id: 'natural_minor',
  },
  {
    title: 'scales.blues.title',
    description: 'scales.blues.description',
    pattern: patterns.blues,
    type: 'hexatonic',
    examples: getScaleNotes('blues', 'C'),
    id: 'blues',
  },
  {
    title: 'scales.major_pentatonic.title',
    description: 'scales.major_pentatonic.description',
    pattern: patterns.major_pentatonic,
    type: 'pentatonic',
    examples: getScaleNotes('major_pentatonic', 'C'),
    id: 'major_pentatonic',
  },
  {
    title: 'scales.minor_pentatonic.title',
    description: 'scales.minor_pentatonic.description',
    pattern: patterns.minor_pentatonic,
    type: 'pentatonic',
    examples: getScaleNotes('minor_pentatonic', 'C'),
    id: 'minor_pentatonic',
  },
  {
    title: 'scales.dorian.title',
    description: 'scales.dorian.description',
    pattern: patterns.dorian,
    type: 'modal',
    examples: getScaleNotes('dorian', 'C'),
    id: 'dorian',
  },
  {
    title: 'scales.mixolydian.title',
    description: 'scales.mixolydian.description',
    pattern: patterns.mixolydian,
    type: 'modal',
    examples: getScaleNotes('mixolydian', 'C'),
    id: 'mixolydian',
  },
  {
    title: 'scales.lydian.title',
    description: 'scales.lydian.description',
    pattern: patterns.lydian,
    type: 'modal',
    examples: getScaleNotes('lydian', 'C'),
    id: 'lydian',
  },
  {
    title: 'scales.phrygian.title',
    description: 'scales.phrygian.description',
    pattern: patterns.phrygian,
    type: 'modal',
    examples: getScaleNotes('phrygian', 'C'),
    id: 'phrygian',
  },
  {
    title: 'scales.eolian.title',
    description: 'scales.eolian.description',
    pattern: patterns.eolian,
    type: 'modal',
    examples: getScaleNotes('eolian', 'C'),
    id: 'eolian',
  }
];
