import React from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Grid, Select, MenuItem, Button, styled } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { PageLayout } from '@/components/common/PageLayout';

const StyledSelect = styled(Select)({
  '& .MuiSelect-select': {
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  '& .MuiSelect-icon': {
    color: '#ffffff',
  },
});

const StyledMenuItem = styled(MenuItem)({
  color: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.1),
  },
});
import { useTranslation } from 'react-i18next';
import { commonScales } from '@/data/scalesData';
import { commonInstruments } from '@/data/instrumentsData';
import { getScaleNotes } from '@/data/scaleUtils';

export default function ScaleDetailPage() {
  const router = useRouter();
  const { id, instrument, tone } = router.query;
  const { t } = useTranslation();

  const scale = commonScales.find(s => s.id === id);
  const [selectedTone, setSelectedTone] = React.useState(tone || 'C');
  const [selectedInstrument, setSelectedInstrument] = React.useState(instrument ||commonInstruments[0].id);

  if (!scale) {
    return <div>{t('scales.notFound')}</div>;
  }

  const handleStart = () => {
    const instrument = commonInstruments.find(i => i.id === selectedInstrument);
    if (instrument) {
      router.push({
        pathname: '/editor',
        query: {
          scaleType: scale.id,
          tone: selectedTone,
          strings: instrument.strings
        }
      });
    }
  };

  return (
    <PageLayout title={t(scale.title)}>
      <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {t(`scales.${scale.id}.description`)}
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
            <StyledSelect
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value as string)}
              displayEmpty
              sx={{ mb: 2 }}
            >
              {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(tone => (
                <StyledMenuItem key={tone} value={tone}>
                  {tone}
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {t('scales.selectInstrument')}
            </Typography>
            <StyledSelect
              value={selectedInstrument}
              onChange={(e) => setSelectedInstrument(e.target.value as string)}
              displayEmpty
              sx={{ mb: 2 }}
            >
              {commonInstruments.map(instrument => (
                <StyledMenuItem key={instrument.id} value={instrument.id}>
                  {t(instrument.name)}
                </StyledMenuItem>
              ))}
            </StyledSelect>
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
      </>
      </PageLayout>
  );
}
