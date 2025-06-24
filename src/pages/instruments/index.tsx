import { Container, Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { commonInstruments } from '@/data/instrumentsData';
import { PageLayout } from '@/components/common/PageLayout';
import { InstrumentCard } from '@/components/common/InstrumentCard';

export default function InstrumentsPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleInstrumentClick = (instrument: any) => {
    router.push({
      pathname: '/editor',
      query: {
        instrument: instrument.name,
        notes: instrument.notes.join(',')
      }
    }); 
  };

  return (
<PageLayout title={t('instruments.title')}>
   
        <Grid container spacing={4}>
          {commonInstruments.map(instrument => (
            <Grid item xs={12} sm={6} md={4} key={instrument.id}>
              
              <InstrumentCard title={t(instrument.name)} description={t(instrument.description)} icon={instrument.icon} onClick={() => handleInstrumentClick(instrument)} buttonText={t('instruments.startWithInstrument')} buttonVariant="contained" />
            </Grid>
          ))}
        </Grid>
        </PageLayout>
  );
}
