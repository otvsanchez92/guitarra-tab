import React from 'react';
import { Card, CardContent, Typography, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { ScaleData } from '../../data/scalesData';

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
          {scale.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {scale.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            {scale.notes.join(' - ')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Tipo: {scale.type}
          </Typography>
        </Box>
      </CardContent>
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onClick}>
        Começar com esta escala
      </Button>
    </Card>
  );
};
