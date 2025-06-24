import type { AppProps } from 'next/app';
import { Header } from '@/components/header';
import React from 'react';
import dynamic from 'next/dynamic';
import { createTheme, ThemeProvider, GlobalStyles } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales/i18n';
import '@fontsource/lilita-one';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
            backgroundColor: '#9b59b6',
            color: '#FFF'
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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid #3A3A3A',
          color: '#fff'
        }
      }
    }
  },
  palette: {
    background: {
      default: '#0D0D0D', 
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
      primary: '#3A3A3A',
      secondary:'#3A3A3A',
    },
    divider: '#3A3A3A',
    action: {
      hover: '#3A3A3A',
      selected: '#9B59B6'
    },
    common: {
      white: '#fff'
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
        <GlobalStyles styles={{
          '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
          'html, body': { margin: 0, padding: 0, width: '100%', height: '100%' }
        }} />
        <TodoProvider>
          <Header />
          <Component {...pageProps} />
        </TodoProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
