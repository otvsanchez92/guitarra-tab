import React from 'react';
import { Card, CardContent, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { InstrumentData } from '../../data/instrumentsData';

interface InstrumentCardProps {
  instrument: InstrumentData;
  onClick: () => void;
}

export const InstrumentCard: React.FC<InstrumentCardProps> = ({ instrument, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
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
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {instrument.description}
        </Typography>
        {instrument.strings > 0 && (
          <Typography variant="body1" gutterBottom>
            {instrument.strings} cordas
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          Categoria: {instrument.category}
        </Typography>
      </CardContent>
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onClick}>
        Começar com este instrumento
      </Button>
    </Card>
  );
};
