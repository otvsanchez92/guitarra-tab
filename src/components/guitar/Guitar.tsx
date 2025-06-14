import { useState } from 'react';
import { Typography } from '@mui/material';
import { GuitarColumn, GuitarRow, GuitarTable, Line, GuitarContent, Tuning, GuitarColumnText, Button } from './style';
import { TActive, TGuitarProps } from './types';
import { selectNote } from '@/utils/scales';
import { Marks } from './Marks';
import { TStore, useStore } from '@/store';
import { SelectTuning } from '@/components/select-tuning';

const Guitar = ({ tuning, onSelectNote, strings, color, editTuning, frets }: TGuitarProps) => {
  const freatboard = frets + 1;

  const { actives, setActiveButton, changeTuning, addScale }: TStore = useStore((state: any) => state);

  const active = ({ x, y }: TActive) =>
    actives && actives.filter((item: { x: number; y: number }) => item.x === x && item.y === y).length > 0;

  const selectColor = ({ x, y }: TActive) => {
    const selectActive = actives && actives.find((item: { x: number; y: number }) => item.x === x && item.y === y);

    if (selectActive) {
      return selectActive.color;
    }

    return color;
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
                  setActiveButton({ x, y, color });
                  onSelectNote({ x, y });
                  addScale(selectNote(tuning[x], y));
                }}
                style={{ backgroundColor: selectColor({ x, y }), opacity: active({ x, y }) ? 1 : 0 }}
              >
                {selectNote(tuning[x], y)}
              </Button>
              <Line style={{ height: 2 + x * 0.3 }} />
              <Marks x={x} y={y} strings={strings} />
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
    maxWidth:  frets === 24 ? 940 : 500,
    margin: 'auto'
    }}>
      {renderTuning()}
      <GuitarTable cellSpacing="0">{renderNotes()}</GuitarTable>
    </GuitarContent>
  );
};

export { Guitar };
