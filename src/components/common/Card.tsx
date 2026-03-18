import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
            <Typography variant="caption" color="text.secondary">
              {t('scales.examples')}:
            </Typography>
            <Typography variant="body2">{examples.join(', ')}</Typography>
          </Box>
        )}
      </CardContent>
      {onClick && (
        <StyledButton onClick={onClick} fullWidth variant={buttonVariant}>
          {buttonText || t('home.startWithScale')}
        </StyledButton>
      )}
    </StyledCard>
  );
}
