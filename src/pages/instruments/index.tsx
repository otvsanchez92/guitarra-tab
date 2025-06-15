import { Container, Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { InstrumentCard } from '@/components/instruments/InstrumentCard';
import { commonInstruments, InstrumentData } from '@/data/instrumentsData';

export default function InstrumentsPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleInstrumentClick = (instrument: InstrumentData) => {
    router.push({
      pathname: '/editor',
      query: {
        instrument: instrument.name,
        strings: instrument.strings,
        tuning: instrument.tuning.join(',')
      }
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('instruments.title')}
        </Typography>

        <Grid container spacing={4}>
          {commonInstruments.map(instrument => (
            <Grid item xs={12} sm={6} md={3} key={instrument.name}>
              <InstrumentCard instrument={instrument} onClick={() => handleInstrumentClick(instrument)} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
