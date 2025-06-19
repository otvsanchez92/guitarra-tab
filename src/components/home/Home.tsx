import React from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Card, CardContent, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { commonScales } from '@/data/scalesData';
import { commonInstruments } from '@/data/instrumentsData';
import { IconType } from 'react-icons';

const Home: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const handleScaleClick = (scale: (typeof commonScales)[0]) => {
    router.push({
      pathname: `/scales/${scale.id}`
    });
  };

  const handleInstrumentClick = (instrument: (typeof commonInstruments)[0] & { icon: IconType }) => {
    router.push({
      pathname: `/instruments/${instrument.id}`
    });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t('home.title')}
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {t('home.commonScales')}
          </Typography>
        </Grid>
        {commonScales.map(scale => (
          <Grid item xs={12} sm={6} md={3} key={scale.id}>
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
                <Typography variant="body2" color="text.secondary">
                  {t(scale.description)}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Example:</Typography>
                  <Typography variant="body1">{scale.examples.join(', ')}</Typography>
                </Box>
              </CardContent>
              <Button onClick={() => handleScaleClick(scale)} fullWidth variant="contained" sx={{ mt: 2 }}>
                {t('home.startWithScale')}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {t('home.instruments')}
          </Typography>
        </Grid>
        {commonInstruments.map(instrument => (
          <Grid item xs={12} sm={6} md={3} key={instrument.name}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
            >
              <CardContent>
                <>{instrument.icon}</>
                <Typography variant="h6" gutterBottom>
                  {instrument.name}
                </Typography>
                {instrument.strings > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    {t('home.strings', { count: instrument.strings })}
                  </Typography>
                )}
              </CardContent>
              <Button onClick={() => handleInstrumentClick(instrument)} fullWidth variant="contained" sx={{ mt: 2 }}>
                {t('home.startWithInstrument')}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export { Home };
