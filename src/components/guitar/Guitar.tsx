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

const Guitar = ({ tuning, onSelectNote, strings, editTuning, frets, notes }: TGuitarProps) => {
  const fretboard = frets + 1;
  const { t } = useTranslation();
  const { setActiveButton, changeTuning, addScale }: TStore = useStore((state: TStore) => state);

  const isActive = ({ x, y }: TActive) => notes.some((note: TActive) => note.x === y && note.y === x);
  const getColor = ({ x, y }: TActive) =>
    notes.find((note: TActive) => note.x === y && note.y === x)?.color || 'red';

  const renderNumbers = () =>
    Array.from(Array(fretboard), (_, x) => (
      <GuitarColumnText key={`${x}-numbers`}>
        {x > 0 ? x : ''}
      </GuitarColumnText>
    ));

  const renderNotes = () => (
    <>
      {renderNumbers()}
      {Array.from(Array(strings), (_, x) => (
        <GuitarRow key={x}>
          {Array.from(Array(fretboard), (_, y) => {
            const active = isActive({ x, y });
            const color = getColor({ x, y });
            const noteName = selectNote(tuning[x], y);
            // string thickness: high strings thin, low strings thicker
            const stringHeight = 1 + (x / (strings - 1)) * 2.5;

            return (
              <GuitarColumn key={`${x}-${y}`}>
                <Button
                  title={noteName}
                  aria-label={`${t('guitar.selectNote')} ${noteName}`}
                  onClick={() => {
                    setActiveButton({ x: y, y: x, color });
                    onSelectNote({ x: y, y: x });
                    addScale(noteName);
                  }}
                  style={{
                    backgroundColor: active ? color : 'transparent'
                  }}
                  className={active ? 'active' : ''}
                >
                  {noteName}
                </Button>
                <Line style={{ height: stringHeight }} />
                <Marks x={x} y={y} strings={strings} color={color} />
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
        .filter((_: string, index: number) => index < strings)
        .map((note: string, index: number) =>
          editTuning ? (
            <SelectTuning value={note} key={`tuning-${index}`} position={index} onChange={changeTuning} />
          ) : (
            <Tuning key={`${note}-${index}`}>
              <Typography fontSize={13} fontWeight={600}>{note}</Typography>
            </Tuning>
          )
        )}
      <TuningHeader />
    </div>
  );

  return (
    <GuitarContent
      id="guitar"
      style={{ maxWidth: frets === 24 ? 980 : 520, margin: 'auto' }}
    >
      {renderTuning()}
      <GuitarTable cellSpacing="0">{renderNotes()}</GuitarTable>
    </GuitarContent>
  );
};

export { Guitar };
