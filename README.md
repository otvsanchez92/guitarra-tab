# NeckChart

**NeckChart** is a free online tool for guitarists, bassists and string instrument players.
Build guitar tabs, visualize scales and explore fretboard positions — all in one place.

> Ferramenta gratuita para guitarristas e instrumentistas de cordas.
> Crie tablaturas, visualize escalas e explore o braço no browser, sem instalar nada.

---

## Features / Funcionalidades

### Tab Editor / Editor de Tab
- Build guitar tabs by clicking notes on the interactive fretboard
- Techniques: Slide Up `/`, Slide Down `\`, Hammer-on `h`, Pull-off `p`, Bend `b`, Bend & Release `br`, Vibrato `~`, Tap `t`
- Auto line-wrap when the tab reaches the container width
- Click any note in the tab to remove it · Undo · Clear
- Export tab as **PDF** with title, artist, tempo, capo and notes
- Copy tab as plain text to clipboard

### Fretboard Diagram / Diagrama de Braço
- Interactive fretboard — click any fret to mark notes with custom colors
- Scale visualizer — choose a scale and root note to highlight all positions on the neck
- Position view — split the fretboard into sections to study scales by position
- Custom tuning per string
- Multiple simultaneous diagrams
- Download diagram as image (PNG)

### Scales / Escalas
- 10 scales: Major, Natural Minor, Blues, Major Pentatonic, Minor Pentatonic, Dorian, Mixolydian, Lydian, Phrygian, Aeolian
- All positions across the full fretboard (up to 24 frets)

### Instruments / Instrumentos
- 7 instruments with correct default tunings:
  Guitar (6-string), Bass (4-string), Violin, Ukulele, Banjo, Mandolin, Cavaquinho
- Supports 4 to 7 strings
- Available in English and Brazilian Portuguese
- Responsive design for desktop and mobile

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework (SSG/SSR) |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [MUI](https://mui.com/) | UI components |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management |
| [i18next](https://www.i18next.com/) | Internationalization (EN / PT-BR) |
| [html2canvas](https://html2canvas.hertzen.com/) | Fretboard diagram export as PNG |
| [jsPDF](https://github.com/parallax/jsPDF) | Guitar tab export as PDF |

---

## Getting Started

**Requires:** Node.js >= 20.x

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Start production build
npm run lint       # Check lint errors
npm run lint:fix   # Fix lint and format with Prettier
npm test           # Run tests (Jest)
```

---

## Project Structure

```
src/
├── pages/
│   ├── index.tsx                  # Home — scales and instruments list
│   ├── editor/                    # Interactive fretboard + tab editor
│   ├── scales/[id].tsx            # Scale detail with tone and instrument selector
│   └── instruments/[id].tsx       # Instrument detail
├── components/
│   ├── guitar/                    # Interactive fretboard component
│   ├── tab-view/                  # Tab editor with PDF export
│   ├── config/                    # Editor controls panel
│   ├── home/                      # Home page
│   └── common/                    # Shared components (Card, PageLayout...)
├── store/
│   └── store.ts                   # Global state with Zustand
├── data/
│   ├── scalesData.ts              # Scale definitions
│   ├── scaleUtils.ts              # Note calculation by scale and root
│   └── instrumentsData.ts         # Instrument definitions and tunings
├── utils/
│   └── scales.ts                  # Note ↔ fret position mapping
└── locales/
    └── i18n.ts                    # i18next configuration
public/
└── locales/
    ├── en/common.json             # English translations + SEO metadata
    └── pt-BR/common.json          # Portuguese translations + SEO metadata
```

---

## Supported Scales

| Scale | Type | Use Cases |
|-------|------|-----------|
| Major | Diatonic | Pop, rock, country, classical |
| Natural Minor | Diatonic | Rock, metal, folk, classical |
| Blues | Hexatonic | Blues, rock, improvisation |
| Major Pentatonic | Pentatonic | Country, pop, rock solos |
| Minor Pentatonic | Pentatonic | Rock, blues, jazz solos |
| Dorian | Modal | Jazz, funk, modern rock |
| Mixolydian | Modal | Blues, rock, Celtic |
| Lydian | Modal | Film scores, progressive rock |
| Phrygian | Modal | Metal, flamenco, Middle Eastern |
| Aeolian | Modal | Rock, pop, classical |

## Supported Instruments

| Instrument | Strings | Default Tuning |
|------------|---------|----------------|
| Guitar | 6 | E A D G B E |
| Bass | 4 | E A D G |
| Violin | 4 | G D A E |
| Ukulele | 4 | G C E A |
| Banjo | 5 | G D G B D |
| Mandolin | 8 | G D A E |
| Cavaquinho | 4 | D G B D |

---

## Deploy

The project is configured for deployment on [Vercel](https://vercel.com).

**Requirement:** set Node.js version to `20.x` or higher in **Project Settings → General** on the Vercel dashboard.

---

## License

MIT
