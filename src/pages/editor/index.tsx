import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { LuRows3, LuFileImage } from 'react-icons/lu';
import { Guitar } from '@/components/guitar';
import { Config } from '@/components/config';
import { TabView } from '@/components/tab-view';
import type { TTechnique, TTabNote } from '@/components/tab-view';
import { ScaleExportPanel } from '@/components/scale-export';
import { useStore } from '@/store';
import type { TStore } from '@/store/types';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import { translations } from '@/locales/pt-BR';
import { getScaleNotes } from '@/data/scaleUtils';

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
  }: TStore = useStore((state: TStore) => state);

  const [editTuning, setEditTuning] = useState(false);
  const [blocks, setBlocks] = useState(0);
  const [showTab, setShowTab] = useState(false);
  const [showScaleExport, setShowScaleExport] = useState(false);
  const [tabSequence, setTabSequence] = useState<TTabNote[]>([]);
  const [selectedTechnique, setSelectedTechnique] = useState<TTechnique>('none');

  const handleNoteSelect = (x: number, y: number, instrumentIndex: number) => {
    addNote({ x, y, color }, instrumentIndex);
    if (showTab) {
      setTabSequence(prev => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, string: y, fret: x, technique: selectedTechnique },
      ]);
    }
  };

  useEffect(() => {
    const scaleParam = router.query.scale;
    if (scaleParam) {
      const scaleArray = Array.isArray(scaleParam) ? scaleParam : scaleParam.split(',');
      selectScale(scaleArray);
    }
  }, [router.query.scale, selectScale]);

  useEffect(() => {
    const scaleType = router.query.scaleType;
    const tone = router.query.tone;
    if (scaleType && tone) {
      selectScale(getScaleNotes(scaleType as string, tone as string), tone as string);
    }
  }, [router.query.scaleType, router.query.tone, selectScale]);

  useEffect(() => {
    const stringsParam = router.query.strings;
    if (stringsParam) changeNumberStrings(Number(stringsParam));
  }, [router.query.strings, changeNumberStrings]);

  useEffect(() => {
    const diagramsParam = router.query.diagrams;
    if (diagramsParam) addInstrument(Number(diagramsParam));
  }, [router.query.diagrams, addInstrument]);

  useEffect(() => {
    const blocksParam = router.query.blocks;
    if (blocksParam) setBlocks(Number(blocksParam));
  }, [router.query.blocks]);

  const copyScale = () => {
    const element = document.getElementById('guitar') as HTMLElement;
    if (!element) return;
    html2canvas(element).then(canvas => {
      const screenshot = canvas.toDataURL('image/png');
      const newWindow = window.open();
      if (newWindow) newWindow.document.write(`<img src="${screenshot}" />`);
    });
  };

  // Build fret block ranges when blocks mode is active
  const totalFrets = instruments[0]?.frets || 24;
  const blockRanges =
    blocks > 1
      ? Array.from({ length: blocks }, (_, i) => {
          const blockSize = Math.ceil(totalFrets / blocks);
          const start = i * blockSize;
          const end = Math.min(start + blockSize - 1, totalFrets);
          return { start, end, label: `${i + 1}ª posição — trastes ${start}–${end}` };
        })
      : null;

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
        <Container maxWidth="xl">
          <Config
            onChangeNumberStrings={changeNumberStrings}
            onChangeColor={changeColor}
            clearNotes={clearNotes}
            clearNote={clearNote}
            actives={instruments[0]?.actives || []}
            changeTuning={() => setEditTuning(v => !v)}
            editTuning={editTuning}
            copyScale={copyScale}
            changeFrets={changeFrets}
            frets={instruments[0]?.frets || 24}
            addInstrument={() => addInstrument()}
          >
            {blockRanges ? (
              // ── Blocks mode ──────────────────────────────────────────────
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {blockRanges.map(({ start, end, label }) =>
                  instruments.map(instrumentData => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={blocks <= 3 ? 12 / blocks : 4}
                      key={`${instrumentData.instrument}-${start}`}
                    >
                      <Box
                        sx={{
                          bgcolor: '#111',
                          border: '1px solid #2a2a2a',
                          borderRadius: 2,
                          p: 2,
                          overflowX: 'auto'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: '#888', display: 'block', mb: 1, textAlign: 'center' }}
                        >
                          {label}
                        </Typography>
                        <Guitar
                          editTuning={instrumentData.instrument === 0 ? editTuning : false}
                          frets={end}
                          startFret={start}
                          tuning={instrumentData.tuning}
                          onSelectNote={({ x, y }) => handleNoteSelect(x, y, instrumentData.instrument)}
                          strings={instrumentData.strings}
                          notes={instrumentData.notes}
                        />
                      </Box>
                    </Grid>
                  ))
                )}
              </Grid>
            ) : (
              // ── Normal mode ───────────────────────────────────────────────
              <Box sx={{ mt: 1, overflowX: 'auto' }}>
                {instruments.map(instrumentData => (
                  <div key={instrumentData.instrument} style={{ margin: 'auto' }}>
                    <Guitar
                      editTuning={instrumentData.instrument === 0 ? editTuning : false}
                      frets={instrumentData.frets}
                      startFret={0}
                      tuning={instrumentData.tuning}
                      onSelectNote={({ x, y }) => handleNoteSelect(x, y, instrumentData.instrument)}
                      strings={instrumentData.strings}
                      notes={instrumentData.notes}
                    />
                  </div>
                ))}
              </Box>
            )}
          </Config>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1 }}>
            <Tooltip title={showScaleExport ? 'Ocultar exportação' : 'Exportar diagrama'}>
              <IconButton
                onClick={() => setShowScaleExport(v => !v)}
                size="small"
                sx={{
                  color: showScaleExport ? '#2ecc71' : '#555',
                  border: '1px solid',
                  borderColor: showScaleExport ? '#2ecc71' : '#333',
                  borderRadius: 1.5,
                  px: 1.5,
                  gap: 0.5,
                  '&:hover': { bgcolor: 'rgba(46,204,113,0.08)', borderColor: '#2ecc71' }
                }}
              >
                <LuFileImage size={16} />
                <Typography variant="caption" sx={{ fontSize: 11, fontWeight: 600 }}>
                  PDF
                </Typography>
              </IconButton>
            </Tooltip>

            <Tooltip title={showTab ? 'Ocultar tablatura' : 'Mostrar tablatura'}>
              <IconButton
                onClick={() => setShowTab(v => !v)}
                size="small"
                sx={{
                  color: showTab ? '#00e676' : '#555',
                  border: '1px solid',
                  borderColor: showTab ? '#00e676' : '#333',
                  borderRadius: 1.5,
                  px: 1.5,
                  gap: 0.5,
                  '&:hover': { bgcolor: 'rgba(0,230,118,0.08)', borderColor: '#00e676' }
                }}
              >
                <LuRows3 size={16} />
                <Typography variant="caption" sx={{ fontSize: 11, fontWeight: 600 }}>
                  TAB
                </Typography>
              </IconButton>
            </Tooltip>
          </Box>

          <ScaleExportPanel
            visible={showScaleExport}
            tuning={instruments[0]?.tuning || ['E', 'B', 'G', 'D', 'A', 'E']}
            strings={instruments[0]?.strings || 6}
            frets={instruments[0]?.frets || 24}
          />

          <TabView
            visible={showTab}
            tabSequence={tabSequence}
            selectedTechnique={selectedTechnique}
            onTechniqueChange={setSelectedTechnique}
            onClear={() => setTabSequence([])}
            onUndo={() => setTabSequence(prev => prev.slice(0, -1))}
            onRemoveNote={(index: number) => setTabSequence(prev => prev.filter((_, i) => i !== index))}
            tuning={instruments[0]?.tuning || ['E', 'B', 'G', 'D', 'A', 'E']}
            strings={instruments[0]?.strings || 6}
          />
        </Container>
      </main>
    </>
  );
}
