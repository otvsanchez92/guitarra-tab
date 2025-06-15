import { FaGuitar, FaDrum, FaMusic, FaUmbrella, FaBan } from 'react-icons/fa6';
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
    name: 'Guitarra',
    icon: FaGuitar,
    strings: 6,
    tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
    description: 'Instrumento de cordas mais popular do mundo',
    category: 'Cordas',
    examples: ['Fender Stratocaster', 'Gibson Les Paul', 'Ibanez RG'],
    id: 'electric-guitar'
  },
  {
    name: 'Baixo',
    icon: FaGuitar,
    strings: 4,
    tuning: ['E', 'A', 'D', 'G'],
    description: 'Instrumento de baixo fundamental em bandas',
    category: 'Cordas',
    examples: ['Fender Precision', 'Fender Jazz', 'Music Man StingRay'],
    id: 'bass'
  },
  {
    name: 'Violino',
    icon: FaMusic,
    strings: 4,
    tuning: ['G', 'D', 'A', 'E'],
    description: 'Instrumento de cordas friccionadas',
    category: 'Cordas',
    examples: ['Stradivarius', 'Guarneri', 'Amati'],
    id: 'violin'
  },
  {
    name: 'Ukulele',
    icon: FaGuitar,
    strings: 4,
    tuning: ['G', 'C', 'E', 'A'],
    description: 'Instrumento havaiano de cordas',
    category: 'Cordas',
    examples: ['Soprano', 'Concert', 'Tenor', 'Barítono'],
    id: 'ukulele'
  },
  {
    name: 'Banjo',
    icon: FaGuitar,
    strings: 5,
    tuning: ['G', 'D', 'G', 'B', 'D'],
    description: 'Instrumento de cordas com característica ressonância',
    category: 'Cordas',
    examples: ['Bluegrass', 'Jug Band', 'Irish'],
    id: 'banjo'
  },
  {
    name: 'Mandolin',
    icon: FaGuitar,
    strings: 8,
    tuning: ['G', 'D', 'A', 'E'],
    description: 'Instrumento de cordas com corpo em forma de oito',
    category: 'Cordas',
    examples: ['Irish', 'Bluegrass', 'Italian'],
    id: 'mandolin'
  },
  {
    name: 'Cavaquinho',
    icon: FaGuitar,
    strings: 4,
    tuning: ['D', 'G', 'B', 'D'],
    description: 'Instrumento tradicional brasileiro',
    category: 'Cordas',
    examples: ['Carioca', 'Baiano', 'Capixaba'],
    id: 'cavaquinho'
  },
  {
    name: 'Violão',
    icon: FaGuitar,
    strings: 6,
    tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
    description: 'Guitarra acústica',
    category: 'Cordas',
    examples: ['Classical', 'Steel String', '12-String'],
    id: 'guitar'
  }
];
