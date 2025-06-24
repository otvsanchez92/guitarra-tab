import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

export const Space = styled('div')(({ theme }) => ({
  height: '64px',
  [theme.breakpoints.down('md')]: {
    height: '56px',
  },
}));

export const HeaderItems = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const HeaderContainer = styled(AppBar)(({ theme }) => ({
  position: 'static',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  color: '#fff'
}));

export const Logo = styled(Typography)({
  color: 'white',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const Navigation = styled(Box)({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
});

export const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'component',
})(({ theme }) => ({
  color: theme.palette.common.white,
  textTransform: 'uppercase',
  fontWeight: 500,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.light,
  },
  '&.active': {
    color: theme.palette.primary.main,
  }
}));

export const NavItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  '&:hover': {
    color: theme.palette.primary.light
  }
}));
