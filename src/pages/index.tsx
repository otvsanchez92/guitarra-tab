import Head from 'next/head';
import { Container } from '@mui/material';

import { translations } from '@/locales/pt-BR';
import { Home } from '@/components/home';

export default function Index() {
  return (
    <>
      <Head>
        <title>Maps Musical</title>
        <meta name="description" content="Maps Musical" />
        <meta name="keywords" content="Maps Musical" />
        <meta name="author" content="Maps Musical" />
        <meta property="og:title" content="Maps Musical" />
        <meta property="og:description" content="Maps Musical" />
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
      <main>
        <Container>
          <Home />
        </Container>
      </main>
    </>
  );
}
