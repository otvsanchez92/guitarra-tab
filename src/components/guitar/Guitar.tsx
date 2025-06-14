import { useState } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { GuitarTable, Line, GuitarContent, Tuning, GuitarColumnText, GuitarRow, GuitarColumn, Button } from './style';
import { TActive, TGuitarProps } from './types';
import { selectNote } from '@/utils/scales';
import { Marks } from './Marks';
import { TStore, useStore } from '@/store';
import { SelectTuning } from '@/components/select-tuning';

const Guitar = ({ tuning, onSelectNote, strings, color, editTuning, frets, diagramIndex = 0 }: TGuitarProps) => {
  const freatboard = frets + 1;

  const { actives, setActiveButton, changeTuning, addScale, notes }: TStore = useStore((state: any) => state);



  const isActive = ({ x, y }: TActive) => {
    return notes.some(note => note.x === y && note.y === x);  // Swap coordinates
  };


  const selectColor = ({ x, y }: TActive) => {
    const activeNote = notes.find(note => note.x === y && note.y === x);  // Swap coordinates
    
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
                  setActiveButton({ x: y, y: x, color });  // Swap coordinates
                  onSelectNote({ x: y, y: x });            // Swap coordinates
                  addScale(selectNote(tuning[x], y));
                }}
                style={{ 
                  backgroundColor: selectColor({ x, y }), 
                  opacity: isActive({ x, y }) ? 1 : 0.2
                }}
                className={isActive({ x, y }) ? 'active' : ''}
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
    maxWidth: frets === 24 ? 940 : 500,
    margin: 'auto',
    borderLeft: diagramIndex > 0 ? '2px solid #ccc' : 'none',
    paddingLeft: diagramIndex > 0 ? '1rem' : '0'
    }}>
      {renderTuning()}
      <GuitarTable cellSpacing="0">{renderNotes()}</GuitarTable>
    </GuitarContent>
  );
};

export { Guitar };
