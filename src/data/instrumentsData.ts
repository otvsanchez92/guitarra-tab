import { GiGuitar, GiGuitarBassHead, GiViolin, GiBanjo, GiMusicalNotes, GiGuitarHead } from 'react-icons/gi';
import { IconType } from 'react-icons';

export interface InstrumentData {
  name: string;
  icon: IconType;
  strings: number;
  tuning: string[];
  description: string;
  category: string;
  examples: string[];
  id: string;
}

export const commonInstruments: InstrumentData[] = [
  {
    name: 'instruments.guitar',
    icon: GiGuitar,
    strings: 6,
    tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
    description: 'instruments.descriptions.electric-guitar',
    category: 'Cordas',
    examples: ['Fender Stratocaster', 'Gibson Les Paul', 'Ibanez RG'],
    id: 'electric-guitar'
  },
  {
    name: 'instruments.bass',
    icon: GiGuitarBassHead,
    strings: 4,
    tuning: ['E', 'A', 'D', 'G'],
    description: 'instruments.descriptions.bass',
    category: 'Cordas',
    examples: ['Fender Precision', 'Fender Jazz', 'Music Man StingRay'],
    id: 'bass'
  },
  {
    name: 'instruments.violin',
    icon: GiViolin,
    strings: 4,
    tuning: ['G', 'D', 'A', 'E'],
    description: 'instruments.descriptions.violin',
    category: 'Cordas',
    examples: ['Stradivarius', 'Guarneri', 'Amati'],
    id: 'violin'
  },
  {
    name: 'instruments.ukulele',
    icon: GiGuitarHead,
    strings: 4,
    tuning: ['G', 'C', 'E', 'A'],
    description: 'instruments.descriptions.ukulele',
    category: 'Cordas',
    examples: ['Soprano', 'Concert', 'Tenor', 'Barítono'],
    id: 'ukulele'
  },
  {
    name: 'instruments.banjo',
    icon: GiBanjo,
    strings: 5,
    tuning: ['G', 'D', 'G', 'B', 'D'],
    description: 'instruments.descriptions.banjo',
    category: 'Cordas',
    examples: ['Bluegrass', 'Jug Band', 'Irish'],
    id: 'banjo'
  },
  {
    name: 'instruments.mandolin',
    icon: GiMusicalNotes,
    strings: 8,
    tuning: ['G', 'D', 'A', 'E'],
    description: 'instruments.descriptions.mandolin',
    category: 'Cordas',
    examples: ['Irish', 'Bluegrass', 'Italian'],
    id: 'mandolin'
  },
  {
    name: 'instruments.cavaquinho',
    icon: GiGuitar,
    strings: 4,
    tuning: ['D', 'G', 'B', 'D'],
    description: 'instruments.descriptions.cavaquinho',
    category: 'Cordas',
    examples: ['Carioca', 'Baiano', 'Capixaba'],
    id: 'cavaquinho'
  }
];
