import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Grid, Select, MenuItem, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { commonScales } from '@/data/scalesData';
import { commonInstruments } from '@/data/instrumentsData';
import { useTheme } from '@mui/material';

export default function ScaleDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation();
  const theme = useTheme();

  const scale = commonScales.find(s => s.id === id);
  const [selectedTone, setSelectedTone] = React.useState('C');
  const [selectedInstrument, setSelectedInstrument] = React.useState(commonInstruments[0].id);

  if (!scale) {
    return <div>{t('scales.notFound')}</div>;
  }

  const handleStart = () => {
    const instrument = commonInstruments.find(i => i.id === selectedInstrument);
    if (instrument) {
      router.push({
        pathname: '/editor',
        query: {
          scale: scale.name,
          notes: scale.notes.join(',').toLowerCase(),
          description: scale.description,
          instrument: instrument.name,
          strings: instrument.strings,
          tuning: instrument.tuning.join(',').toLowerCase(),
          description: instrument.description,
          tone: selectedTone
        }
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('scales.detailTitle', { scale: scale.name })}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {scale.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {t('scales.type')}: {scale.type}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {t('scales.examples')}: {scale.examples.join(', ')}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('scales.selectTone')}
            </Typography>
            <Select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value as string)}
              fullWidth
              sx={{ mb: 2 }}
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
              onChange={(e) => setSelectedInstrument(e.target.value as string)}
              fullWidth
              sx={{ mb: 2 }}
            >
              {commonInstruments.map(instrument => (
                <MenuItem key={instrument.id} value={instrument.id}>
                  {instrument.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('scales.notes')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {scale.notes.map((note, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}
                >
                  {note}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          sx={{
            px: 4,
            height: '48px',
            fontSize: '1.1rem'
          }}
        >
          {t('scales.start')}
        </Button>
      </Box>
    </Container>
  );
}
