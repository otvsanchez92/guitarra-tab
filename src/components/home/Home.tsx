import React from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Typography, Button, Container, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { commonScales } from '@/data/scalesData';
import { commonInstruments, InstrumentData } from '@/data/instrumentsData';
import { ScaleCard } from '@/components/common/Card';
import { InstrumentCard } from '@/components/common/InstrumentCard';

const Home = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleScaleClick = (scale: (typeof commonScales)[0]) => {
    router.push(`/scales/${scale.id}`);
  };

  const handleInstrumentClick = (instrument: InstrumentData) => {
    router.push(`/instruments/${instrument.id}`);
  };

  return (
    <Container maxWidth="lg">
      {/* Hero */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontFamily: 'Lilita One, sans-serif', fontSize: { xs: '2.2rem', md: '3.5rem' } }}
        >
          {t('home.title')}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 560, lineHeight: 1.6 }}
        >
          {t('home.subtitle')}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/editor')}
          sx={{ px: 5, py: 1.5, fontSize: '1rem', mt: 1 }}
        >
          {t('home.openEditor')}
        </Button>
      </Box>

      <Divider sx={{ mb: 6, opacity: 0.2 }} />

      {/* Scales */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Lilita One, sans-serif' }}>
          {t('home.commonScales')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('home.commonScalesSubtitle')}
        </Typography>
        <Grid container spacing={3}>
          {commonScales.map(scale => (
            <Grid item xs={12} sm={6} md={4} key={scale.id}>
              <ScaleCard
                title={t(scale.title)}
                description={t(scale.description)}
                examples={scale.examples}
                onClick={() => handleScaleClick(scale)}
                buttonText={t('home.startWithScale')}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ mb: 6, opacity: 0.2 }} />

      {/* Instruments */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Lilita One, sans-serif' }}>
          {t('home.instruments')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('home.instrumentsSubtitle')}
        </Typography>
        <Grid container spacing={3}>
          {commonInstruments.map(instrument => (
            <Grid item xs={12} sm={6} md={4} key={instrument.id}>
              <InstrumentCard
                title={t(instrument.name)}
                description={t(instrument.description)}
                icon={instrument.icon}
                onClick={() => handleInstrumentClick(instrument)}
                buttonText={t('home.startWithInstrument')}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export { Home };
