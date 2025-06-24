import React from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Card, CardContent, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { commonScales } from '@/data/scalesData';
import { commonInstruments, InstrumentData } from '@/data/instrumentsData';
import type { ReactNode } from 'react';
import { ButtonCard } from './styles';
import { PageLayout } from '@/components/common/PageLayout';
import { ScaleCard } from '@/components/common/Card';
import { InstrumentCard } from '@/components/common/InstrumentCard';

const Home = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const handleScaleClick = (scale: (typeof commonScales)[0]) => {
    router.push({
      pathname: `/scales/${scale.id}`
    });
  };

  const handleInstrumentClick = (instrument: InstrumentData) => {
    router.push({
      pathname: `/instruments/${instrument.id}`
    });
  };

  return (
    <PageLayout title={t('home.title')}>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {t('home.commonScales')}
          </Typography>
        </Grid>
        {commonScales.map((scale) => (
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

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {t('home.instruments')}
          </Typography>
        </Grid>
        {commonInstruments.map((instrument) => (
          <Grid item xs={12} sm={6} md={4} key={instrument.name}>
            <InstrumentCard
              title={t(instrument.name)}
              description={instrument.description}
              icon={instrument.icon}
              onClick={() => handleInstrumentClick(instrument)}
              buttonText={t('home.startWithInstrument')}
            />
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
};

export { Home };
