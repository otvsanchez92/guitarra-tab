import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router'; 
import { commonInstruments, InstrumentData } from '@/data/instrumentsData';
import { commonScales } from '@/data/scalesData';
import { Card, CardContent } from '@mui/material';
import { ScaleData } from '@/data/scalesData';
import { ButtonCard } from '@/components/scales/styles';


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
    <Container>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h1" gutterBottom>
        {t(instrument.name)}
        </Typography>

      
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {commonScales.map(scale => (
              <Grid item xs={12} sm={6} md={4} key={scale.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t(scale.title)}
                  </Typography>
                  <Typography variant="body2" color="#fff">
                    {t(scale.description)}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">Example:</Typography>
                    <Typography variant="body1">{scale.examples.join(', ')}</Typography>
                  </Box>
                </CardContent>
                <ButtonCard onClick={() => handleScaleClick(scale)} fullWidth variant="contained" sx={{ mt: 2 }}>
                  {t('home.startWithScale')}
                </ButtonCard>
              </Card>
            </Grid>
          ))}
          </Grid>
      </Box>
    </Container>
  );
}
