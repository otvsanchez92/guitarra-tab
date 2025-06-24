import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { ScaleData } from '../../data/scalesData';
import { ButtonCard } from './styles';

interface ScaleCardProps {
  scale: ScaleData;
  onClick: () => void;
}

export const ScaleCard: React.FC<ScaleCardProps> = ({ scale, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          {scale.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {scale.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {scale.examples.map((example, index) => (
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
              {example}
            </Box>
          ))}
          <Typography variant="caption" color="text.secondary">
            Tipo: {scale.type}
          </Typography>
        </Box>
      </CardContent>
      <ButtonCard fullWidth variant="contained" sx={{ mt: 2 }} onClick={onClick}>
        Começar com esta escala
      </ButtonCard>
    </Card>
  );
};
