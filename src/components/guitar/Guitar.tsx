import { Typography } from '@mui/material';
import {
  GuitarTable,
  Line,
  GuitarContent,
  Tuning,
  TuningHeader,
  GuitarColumnText,
  GuitarRow,
  GuitarColumn,
  Button
} from './style';
import { TGuitarProps } from './types';
import { TActive } from '@/store/types';
import { selectNote } from '@/utils/scales';
import { Marks } from './Marks';
import { TStore, useStore } from '@/store';
import { SelectTuning } from '@/components/select-tuning';
import { useTranslation } from 'react-i18next';

const Guitar = ({
  tuning,
  onSelectNote,
  strings,
  editTuning,
  frets,
  notes,
  startFret = 0
}: TGuitarProps) => {
  const fretCount = frets - startFret + 1;
  const { t } = useTranslation();
  const { setActiveButton, changeTuning, addScale }: TStore = useStore((state: TStore) => state);

  const isActive = (stringIdx: number, absoluteFret: number) =>
    notes.some(n => n.x === absoluteFret && n.y === stringIdx);

  const getColor = (stringIdx: number, absoluteFret: number) =>
    notes.find(n => n.x === absoluteFret && n.y === stringIdx)?.color || 'red';

  const renderNumbers = () =>
    Array.from(Array(fretCount), (_, col) => {
      const absFret = startFret + col;
      return (
        <GuitarColumnText key={`num-${absFret}`}>
          {absFret > 0 ? absFret : ''}
        </GuitarColumnText>
      );
    });

  const renderNotes = () => (
    <>
      {renderNumbers()}
      {Array.from(Array(strings), (_, stringIdx) => (
        <GuitarRow key={stringIdx}>
          {Array.from(Array(fretCount), (_, col) => {
            const absFret = startFret + col;
            const active = isActive(stringIdx, absFret);
            const color = getColor(stringIdx, absFret);
            const noteName = selectNote(tuning[stringIdx], absFret);
            const stringHeight = 1 + (stringIdx / Math.max(strings - 1, 1)) * 2.5;

            return (
              <GuitarColumn key={`${stringIdx}-${absFret}`}>
                <Button
                  title={noteName}
                  aria-label={`${t('guitar.selectNote')} ${noteName}`}
                  onClick={() => {
                    setActiveButton({ x: absFret, y: stringIdx, color });
                    onSelectNote({ x: absFret, y: stringIdx });
                    addScale(noteName);
                  }}
                  style={{ backgroundColor: active ? color : 'transparent' }}
                  className={active ? 'active' : ''}
                >
                  {noteName}
                </Button>
                <Line style={{ height: stringHeight }} />
                <Marks x={stringIdx} y={absFret} strings={strings} color={color} />
              </GuitarColumn>
            );
          })}
        </GuitarRow>
      ))}
      {renderNumbers()}
    </>
  );

  const renderTuning = () => (
    <div>
      <TuningHeader />
      {tuning
        .filter((_: string, i: number) => i < strings)
        .map((note: string, i: number) =>
          editTuning ? (
            <SelectTuning value={note} key={`tuning-${i}`} position={i} onChange={changeTuning} />
          ) : (
            <Tuning key={`${note}-${i}`}>
              <Typography fontSize={13} fontWeight={600}>{note}</Typography>
            </Tuning>
          )
        )}
      <TuningHeader />
    </div>
  );

  const maxWidth = fretCount * 38 + 50;

  return (
    <GuitarContent id={startFret === 0 ? 'guitar' : undefined} style={{ maxWidth, margin: 'auto' }}>
      {renderTuning()}
      <GuitarTable cellSpacing="0">{renderNotes()}</GuitarTable>
    </GuitarContent>
  );
};

export { Guitar };
