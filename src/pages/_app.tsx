import type { AppProps } from 'next/app';
import { Header } from '@/components/header';
import React from 'react';
import dynamic from 'next/dynamic';
import { createTheme, ThemeProvider, GlobalStyles } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales/i18n';
import '@fontsource/lilita-one';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

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
      secondary:'#3A3A3A'
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
  const { t } = useTranslation();
  return (<>
    <Head>
    <title>{t('title')}</title>
    <meta name="description" content={t('description')} />
    <meta name="keywords" content={t('keywords')} />
    <meta name="author" content={t('author')} />
    <meta property="og:title" content={t('ogTitle')} />
    <meta property="og:description" content={t('description')} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.png" />
    {/* Favicon */}
    <link rel="icon" href="/favicon.ico" />

    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

    {/* Apple Touch Icon */}
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

    {/* Android Chrome */}
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#0D0D0D" />

    {/* Other meta tags */}
    <meta name="application-name" content="Maps Musical" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Maps Musical" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-TileColor" content="#0D0D0D" />
  </Head>
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
    </>
  );
}
