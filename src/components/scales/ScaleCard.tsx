import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ScaleData } from '../../data/scalesData';
import { ButtonCard } from './styles';
import { useTranslation } from 'react-i18next';

interface ScaleCardProps {
  scale: ScaleData;
  onClick: () => void;
}

export const ScaleCard: React.FC<ScaleCardProps> = ({ scale, onClick }) => {
  const { t } = useTranslation();

  return (
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
        <Typography variant="body2" color="#fff" gutterBottom>
          {t(scale.description)}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <div>
            {scale.examples.map((example, index) => (
              <span key={index} style={{ marginRight: '5px' }}>{example}</span>
            ))}
          </div>
          <Typography variant="caption" color="#fff">
            {t('scales.type')}: {t(`scales.types.${scale.type}`)}
          </Typography>
        </Box>
      </CardContent>
      <ButtonCard fullWidth variant="contained" sx={{ mt: 2 }} onClick={onClick}>
        {t('home.startWithScale')}
      </ButtonCard>
    </Card>
  );
};
