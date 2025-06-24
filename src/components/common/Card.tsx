import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CardProps {
  title: string;
  description: string;
  examples?: string[];
  onClick?: () => void;
  buttonText?: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
}

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-5px)',
    transition: 'transform 0.3s ease-in-out'
  }
});

const StyledButton = styled(Button)({
  marginTop: '1rem'
});

export function ScaleCard({ title, description, examples, onClick, buttonText, buttonVariant = 'contained' }: CardProps) {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="#fff">
          {description}
        </Typography>
        {examples && examples.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Example:</Typography>
            <Typography variant="body1">{examples.join(', ')}</Typography>
          </Box>
        )}
      </CardContent>
      {onClick && (
        <StyledButton onClick={onClick} fullWidth variant={buttonVariant}>
          {buttonText || 'Start'}
        </StyledButton>
      )}
    </StyledCard>
  );
}

export function InstrumentCard({ title, description, onClick, buttonText }: CardProps) {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="#fff">
          {description}
        </Typography>
      </CardContent>
      {onClick && (
        <StyledButton onClick={onClick} fullWidth variant="contained">
          {buttonText || 'View Scales'}
        </StyledButton>
      )}
    </StyledCard>
  );
}
