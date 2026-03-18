import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconType } from 'react-icons';

interface InstrumentCardProps {
  title: string;
  description: string;
  icon: IconType;
  onClick?: () => void;
  buttonText?: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
}

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-5px)',
    transition: 'transform 0.3s ease-in-out'
  }
});

const StyledButton = styled(Button)({
  marginTop: '1rem'
});

export function InstrumentCard({ title, description, icon: Icon, onClick, buttonText, buttonVariant = 'contained' }: InstrumentCardProps) {
  return (
    <StyledCard>
      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        <Icon size={40} style={{ marginBottom: '0.75rem' }} />
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {onClick && (
        <StyledButton onClick={onClick} fullWidth variant={buttonVariant}>
          {buttonText || 'View Details'}
        </StyledButton>
      )}
    </StyledCard>
  );
}
