import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container } from '@mui/material';
import { Guitar } from '@/components/guitar';
import { Config } from '@/components/config';
import { Tabs } from '@/components/tabs';
import { Scale } from '@/components/scale';
import { useStore } from '@/store';
import type { TStore, TActive } from '@/store/types';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import { translations } from '@/locales/pt-BR';

export default function Editor() {
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
    color
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
        <title>{translations.title} - Editor</title>
        <meta name="description" content={translations.description} />
        <meta name="keywords" content={translations.keywords} />
        <meta name="author" content={translations.author} />
        <meta property="og:title" content={translations.ogTitle} />
        <meta property="og:description" content={translations.ogDescription} />
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
            actives={instruments[0]?.actives || []}
            changeTuning={changeTuning}
            editTuning={editTuning}
            copyScale={copyScale}
            changeFrets={changeFrets}
            frets={instruments[0]?.frets || 24}
            addInstrument={() => addInstrument()}
          >
            <>
              {instruments.map(instrumentData => (
                <div key={instrumentData.instrument} style={{ margin: 'auto' }}>
                  <Guitar
                    editTuning={instrumentData.instrument === 0 ? editTuning : false}
                    frets={instrumentData.frets}
                    tuning={instrumentData.tuning}
                    onSelectNote={({ x, y }) => addNote({ x, y, color }, instrumentData.instrument)}
                    strings={instrumentData.strings}
                    notes={instrumentData.notes}
                  />
                </div>
              ))}
            </>
          </Config>

          <Tabs
            tuning={instruments[0].tuning}
            strings={instruments[0].strings}
            notes={instruments.map(instrument => instrument.notes).flat() as TActive[]}
          />
        </Container>
      </main>
    </>
  );
}
