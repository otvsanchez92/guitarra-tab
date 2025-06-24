import { Container, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const StyledContainer = styled(Container)({
  paddingTop: '2rem',
  paddingBottom: '2rem'
});

const StyledBox = styled(Box)({
  flexGrow: 1,
  padding: '1rem'
});

export function PageLayout({ title, subtitle, children, maxWidth = 'md' }: PageLayoutProps) {
  return (
    <StyledContainer maxWidth={maxWidth}>
      <StyledBox>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
            {subtitle}
          </Typography>
        )}
        {children}
      </StyledBox>
    </StyledContainer>
  );
}
