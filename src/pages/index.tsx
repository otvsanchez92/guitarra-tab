import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Container } from '@mui/material';
import { Guitar } from '@/components/guitar';
import { Config } from '@/components/config';
import { Tabs } from '@/components/tabs';
import { Scale } from '@/components/scale';
import { useStore } from '@/store';
import type { TStore } from '@/store/types';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const {
    tuning,
    addNote,
    strings,
    color,
    changeNumberStrings,
    changeColor,
    clearNotes,
    notes,
    clearNote,
    actives,
    changeFrets,
    frets,
    selectScale
  }: TStore = useStore((state: any) => state);

  const [diagrams, setDiagrams] = useState(1);
  



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
      setDiagrams(Number(diagramsParam));
    }
  }, [router.query.diagrams]);

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
 
          <Config
            onChangeNumberStrings={changeNumberStrings}
            onChangeColor={changeColor}
            clearNotes={clearNotes}
            clearNote={clearNote}
            actives={actives}
            changeTuning={changeTuning}
            editTuning={editTuning}
            copyScale={copyScale}
            changeFrets={changeFrets}
            frets={frets}
          >
           

              {Array.from({ length: diagrams }, (_, index) => (
                <div style={{ margin: 'auto' }} id="guitar" key={index}>
                  <Guitar
                    editTuning={editTuning}
                    frets={frets}
                    tuning={tuning}
                    onSelectNote={({ x, y }) => addNote({ x, y, color })}
                    strings={strings}
                    color={color}
                    diagramIndex={index}
                  />
              </div>  
              ))}
          
          </Config>
          <Scale />
          {diagrams === 1 ? <Tabs tuning={tuning} notes={notes} strings={strings} /> : null}
        </Container>
      </main>
    </>
  );
}
