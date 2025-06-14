import { Typography } from '@mui/material';
import { GuitarTable, Line, GuitarContent, Tuning, GuitarColumnText, GuitarRow, GuitarColumn, Button } from './style';
import {  TGuitarProps } from './types';
import { TActive } from '@/store/types';
import { selectNote } from '@/utils/scales';
import { Marks } from './Marks';
import { TStore, useStore } from '@/store';
import { SelectTuning } from '@/components/select-tuning';

const Guitar = ({ tuning, onSelectNote, strings, color, editTuning, frets, notes }: TGuitarProps) => {

  const freatboard = frets + 1;

  const {  setActiveButton, changeTuning, addScale }: TStore = useStore((state: any) => state);



  const isActive = ({ x, y }: TActive) => {
    return notes.some((note: TActive) => note.x === y && note.y === x);  // Swap coordinates
  };


  const selectColor = ({ x, y }: TActive) => {
    const activeNote = notes.find((note: TActive) => note.x === y && note.y === x);  // Swap coordinates
    
    if (activeNote) {
      return color;
    }

    return 'transparent';
  };

  const renderNumbers = () =>
    Array.from(Array(freatboard), (_, x) => (
      <GuitarColumnText key={`${x}-numbers`}>
        <Typography>{x}</Typography>
      </GuitarColumnText>
    ));

  const renderNotes = () => (
    <>
      {renderNumbers()}
      {Array.from(Array(strings), (_, x) => (
        <GuitarRow key={x}>
          {Array.from(Array(freatboard), (_, y) => (
            <GuitarColumn key={`${x}-${y}`}>
              <Button
                onClick={() => {
                  setActiveButton({ x: y, y: x, color: color });
                  onSelectNote({ x: y, y: x });           
                  addScale(selectNote(tuning[x], y));
                }}
                style={{ 
                  backgroundColor: selectColor({ x, y, color }), 
                  opacity: isActive({ x, y, color }) ? 1 : 0.2
                }}
                className={isActive({ x, y, color }) ? 'active' : ''}
              >
                {selectNote(tuning[x], y)}
              </Button>
              <Line style={{ height: 2 + x * 0.3 }} />
              <Marks x={x} y={y} strings={strings} color={color} />
            </GuitarColumn>
          ))}
        </GuitarRow>
      ))}
      {renderNumbers()}
    </>
  );

  const renderTuning = () => (
    <div>
      <Tuning />
      {tuning
        .filter((note: string, index: number) => index < strings)
        .map((note: string, index: number) =>
          editTuning ? (
            <SelectTuning value={note} key={`tuning-${index}`} position={index} onChange={changeTuning} />
          ) : (
            <Tuning key={`${note}-${index}`}>
              <Typography>{note}</Typography>{' '}
            </Tuning>
          )
        )}
    </div>
  );

  return (
    <GuitarContent id="guitar" style={{
    maxWidth: frets === 24 ? 940 : 500,
    margin: 'auto',
    }}>
      {renderTuning()}
      <GuitarTable cellSpacing="0">{renderNotes()}</GuitarTable>
    </GuitarContent>
  );
};

export { Guitar };
