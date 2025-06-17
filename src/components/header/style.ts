import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

export const Space = styled('div')(() => ({
  height: '64px'
}));

export const HeaderContainer = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.default,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  color: theme.palette.common.white,
  padding: '0 24px',
  transition: 'background-color 0.3s ease',

  '& .MuiToolbar-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

export const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.5rem',
  letterSpacing: '0.5px',
  color: theme.palette.common.white,
  textDecoration: 'none',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    color: theme.palette.primary.light
  }
}));
