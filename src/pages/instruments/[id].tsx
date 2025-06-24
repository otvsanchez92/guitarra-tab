import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router'; 
import { commonInstruments, InstrumentData } from '@/data/instrumentsData';
import { commonScales } from '@/data/scalesData';
import { ScaleData } from '@/data/scalesData';
import { PageLayout } from '@/components/common/PageLayout';
import { ScaleCard } from '@/components/common/Card';


export default function InstrumentsPage() {

  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const instrument = commonInstruments.find(i => i.id === id);

  const handleScaleClick = (scale: ScaleData) => {
    router.push({
      pathname: `/scales/${scale.id}`,
      query: {
        tone: 'C',
        instrument: instrument?.id
      }
    });
  };

  if (!instrument) {
    return <div>{t('instruments.notFound')}</div>;
  }

 
  return (
    <PageLayout title={t(instrument.name)}>
      <Grid container spacing={4}>
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
    </PageLayout>
  );
}
