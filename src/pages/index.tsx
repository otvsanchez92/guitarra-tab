import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container } from '@mui/material';
import { Guitar } from '@/components/guitar';
import { Config } from '@/components/config';
import { Tabs } from '@/components/tabs';
import { Scale } from '@/components/scale';
import { useStore } from '@/store';
import type { TStore, TInstrument } from '@/store/types';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const {
    addNote,
    changeNumberStrings,
    changeColor,
    clearNotes,
    clearNote,
    changeFrets,
    selectScale,
    instruments,
    addInstrument,
  }: TStore = useStore((state: any) => state);

 
  



  useEffect(() => {
    const scaleParam = router.query.scale;
    if (scaleParam) {
      const scaleArray = Array.isArray(scaleParam) ? scaleParam : scaleParam.split(',');
      selectScale(scaleArray);
    }
  }, [router.query.scale, selectScale]);


 


  useEffect(() => {
    const diagramsParam = router.query.diagrams;
    if (diagramsParam) {
      addInstrument(Number(diagramsParam));
    }
  }, [router.query.diagrams, addInstrument]);

  const [editTuning, setEditTuning] = useState(false);

  const changeTuning = () => {
    setEditTuning(!editTuning);
  };

  const copyScale = () => {
    const element: any = document.getElementById('guitar');

    html2canvas(element).then(canvas => {
      const screenshot = canvas.toDataURL('image/png');

      const newWindow: any = window.open();
      newWindow.document.write('<img src="' + screenshot + '" />');
    });
  };

  return (
    <>
      <Head>
        <title>Scale Tab Creator - Musical Scale Diagrams Generator</title>
        <meta name="description" content="Create custom scale diagrams for guitar, bass, and other string instruments. Online tab generator with customizable tuning and number of strings." />
        <meta name="keywords" content="scale diagrams, tabs, guitar, bass, string instruments, music theory, musical scales, tablatures, tab generator, customizable tuning" />
        <meta name="author" content="Scale Tab Creator" />
        <meta property="og:title" content="Scale Tab Creator - Musical Scale Diagrams Generator" />
        <meta property="og:description" content="Create custom scale diagrams for guitar, bass, and other string instruments. Online tab generator with customizable tuning and number of strings." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main>
        <Container>
 
        <Scale />
          <Config
            onChangeNumberStrings={changeNumberStrings}
            onChangeColor={changeColor}
            clearNotes={clearNotes}
            clearNote={clearNote}
            actives={instruments[0].actives}
            changeTuning={changeTuning}
            editTuning={editTuning}
            copyScale={copyScale}
            changeFrets={changeFrets}
            frets={instruments[0].frets}
          >
            
            <>
  
            { instruments.map(({ tuning, strings, color, frets, notes, instrument }: TInstrument) => (
                <div style={{ margin: 'auto' }} id="guitar" key={instrument}>
                  <Guitar
                    editTuning={instrument === 0 ? editTuning : false}
                    frets={frets}
                    tuning={tuning}
                    onSelectNote={({ x, y }) => addNote({ x, y, color }, instrument)}
                    strings={strings}
                    color={color}
                    notes={notes}
                  />

                  {instrument}

                  {JSON.stringify({ tuning, strings, color, frets, notes })}
                </div>  
              ))}
          </>
          </Config>
   
          {instruments.length === 1 ? <Tabs tuning={instruments[0].tuning} notes={instruments[0].notes} strings={instruments[0].strings} /> : null}
        </Container>
      </main>
    </>
  );
}
