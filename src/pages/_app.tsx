import type { AppProps } from 'next/app';
import { Header } from '@/components/header';
import React from 'react';
import dynamic from 'next/dynamic';
import { createTheme, ThemeProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales/i18n';
import '@fontsource/lilita-one';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: '"Lilita One", sans-serif',
      fontWeight: 400,
      fontSize: '2.5rem',
      color: '#9b59b6'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: '"Lilita One", sans-serif',
          fontWeight: 400
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#FFD700',
            color: '#0D0D0D'
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: '#00BFFF',
            color: '#0D0D0D'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          border: '1px solid #3A3A3A'
        }
      }
    }
  },
  palette: {
    background: {
      default: '#0D0D0D',
      paper: '#1A1A1A'
    },
    primary: {
      main: '#FFD700',
      contrastText: '#0D0D0D'
    },
    secondary: {
      main: '#00BFFF',
      contrastText: '#0D0D0D'
    },
    text: {
      primary: '#EAEAEA',
      secondary: '#EAEAEA'
    },
    divider: '#3A3A3A',
    action: {
      hover: '#3A3A3A',
      selected: '#9B59B6'
    }
  }
});

const TodoProvider = dynamic(() => import('@/utils/context').then(ctx => ctx.default), {
  ssr: false
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <TodoProvider>
          <Header />
          <Component {...pageProps} />
        </TodoProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
