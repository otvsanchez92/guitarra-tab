import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Grid, Select, MenuItem, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { commonScales } from '@/data/scalesData';
import { commonInstruments } from '@/data/instrumentsData';
import { getScaleNotes, noteToIndex } from '@/data/scaleUtils';
import { PageLayout } from '@/components/common/PageLayout';
import { Guitar } from '@/components/guitar';
import { TActive } from '@/store/types';

export default function ScaleDetailPage() {
  const router = useRouter();
  const { id, instrument, tone } = router.query;
  const { t } = useTranslation();

  const scale = commonScales.find(s => s.id === id);
  const [selectedTone, setSelectedTone] = React.useState(tone || 'C');
  const [selectedInstrument, setSelectedInstrument] = React.useState(instrument || commonInstruments[0].id);
  const [showPositions, setShowPositions] = React.useState(false);

  if (!scale) {
    return <div>{t('scales.notFound')}</div>;
  }

  const buildQuery = (instrument: typeof commonInstruments[0]) => ({
    scaleType: scale.id,
    tone: selectedTone,
    strings: instrument.strings
  });

  const handleStart = () => {
    const instrument = commonInstruments.find(i => i.id === selectedInstrument);
    if (instrument) router.push({ pathname: '/editor', query: buildQuery(instrument) });
  };

  const handleStartBlocks = () => {
    const instrument = commonInstruments.find(i => i.id === selectedInstrument);
    if (instrument) router.push({ pathname: '/editor', query: { ...buildQuery(instrument), blocks: 5 } });
  };

  const TOTAL_FRETS = 24;
  const POSITIONS = 5;
  const BLOCK_SIZE = Math.ceil(TOTAL_FRETS / POSITIONS);

  const instrumentData = commonInstruments.find(i => i.id === selectedInstrument) || commonInstruments[0];
  const scaleNoteNames = getScaleNotes(scale.id, selectedTone as string);
  const scaleNoteIndices = new Set(scaleNoteNames.map(n => noteToIndex(n)));
  const rootNoteIndex = noteToIndex(selectedTone as string);

  const allScaleNotes: TActive[] = [];
  for (let s = 0; s < instrumentData.strings; s++) {
    const openIdx = noteToIndex(instrumentData.tuning[s]);
    for (let f = 0; f <= TOTAL_FRETS; f++) {
      const ni = (openIdx + f) % 12;
      if (scaleNoteIndices.has(ni)) {
        allScaleNotes.push({ x: f, y: s, color: ni === rootNoteIndex ? '#FFD700' : '#9b59b6' });
      }
    }
  }

  const positionBlocks = Array.from({ length: POSITIONS }, (_, i) => ({
    start: i * BLOCK_SIZE,
    end: Math.min((i + 1) * BLOCK_SIZE - 1, TOTAL_FRETS),
    label: `${i + 1}ª posição — trastes ${i * BLOCK_SIZE}–${Math.min((i + 1) * BLOCK_SIZE - 1, TOTAL_FRETS)}`,
  }));

  return (
 

<PageLayout title={t(`scales.${scale.id}.title`)}>
<>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="#fff">
          {t(`scales.${scale.id}.description`)}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {t('scales.type')}: {scale.type}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {t('scales.examples')}: {scale.examples.join(', ')}
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('scales.selectTone')}
            </Typography>
            <Select
              value={selectedTone}
              onChange={e => setSelectedTone(e.target.value as string)}
              fullWidth
              sx={{
                mb: 2,
                color: '#fff',
                backgroundColor: '#1a1a1a',
                border: '1px solid #3A3A3A',
                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                '.MuiSvgIcon-root': { color: '#fff' },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#1a1a1a',
                    border: '1px solid #3A3A3A',
                    color: '#fff',
                    '& .MuiMenuItem-root:hover': { bgcolor: '#2a2a2a' },
                    '& .Mui-selected': { bgcolor: '#9b59b6 !important' },
                  },
                },
              }}
            >
              {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(tone => (
                <MenuItem key={tone} value={tone}>
                  {tone}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {t('scales.selectInstrument')}
            </Typography>
            <Select
              value={selectedInstrument}
              onChange={e => setSelectedInstrument(e.target.value as string)}
              fullWidth
              sx={{
                mb: 2,
                color: '#fff',
                backgroundColor: '#1a1a1a',
                border: '1px solid #3A3A3A',
                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                '.MuiSvgIcon-root': { color: '#fff' },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#1a1a1a',
                    border: '1px solid #3A3A3A',
                    color: '#fff',
                    '& .MuiMenuItem-root:hover': { bgcolor: '#2a2a2a' },
                    '& .Mui-selected': { bgcolor: '#9b59b6 !important' },
                  },
                },
              }}
            >
              {commonInstruments.map(instrument => (
                <MenuItem key={instrument.id} value={instrument.id}>
                  {t(instrument.name)}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {t('scales.pattern')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {id &&
                  getScaleNotes(id as string, selectedTone as string).map((note, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        bgcolor: note === selectedTone ? 'blue' : 'red',
                        color: 'white',
                        fontSize: '1.2rem'
                      }}
                    >
                      {note}
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          size="large"
          onClick={handleStartBlocks}
          sx={{ px: 4, height: '48px', fontSize: '1rem' }}
        >
          {t('scales.startBlocks')}
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          sx={{ px: 4, height: '48px', fontSize: '1.1rem' }}
        >
          {t('scales.start')}
        </Button>
      </Box>

      {/* Positions toggle + view */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ fontFamily: 'Lilita One, sans-serif' }}>
            {t('scales.positions')}
          </Typography>
          <Button
            variant={showPositions ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setShowPositions(v => !v)}
            sx={{ minWidth: 120 }}
          >
            {showPositions ? t('scales.hidePositions') : t('scales.showPositions')}
          </Button>
        </Box>

        {showPositions && <><Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFD700' }} />
            <Typography variant="caption" color="text.secondary">{selectedTone}</Typography>
          </Box>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#9b59b6' }} />
            <Typography variant="caption" color="text.secondary">{t('scales.otherNotes')}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {positionBlocks.map(({ start, end, label }) => (
            <Box
              key={start}
              sx={{ bgcolor: '#111', border: '1px solid #2a2a2a', borderRadius: 2, p: 2, overflowX: 'auto' }}
            >
              <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 1 }}>
                {label}
              </Typography>
              <Guitar
                tuning={instrumentData.tuning}
                strings={instrumentData.strings}
                frets={end}
                startFret={start}
                notes={allScaleNotes}
                editTuning={false}
                onSelectNote={() => {}}
              />
            </Box>
          ))}
        </Box>
        </>}
      </Box>
      </>
      </PageLayout>
  );
}
