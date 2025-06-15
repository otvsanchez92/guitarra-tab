import Head from 'next/head';
import { Container } from '@mui/material';

import { translations } from '@/locales/pt-BR';
import { Home } from '@/components/home';

export default function Index() {
  return (
    <>
      <Head>
        <title>{translations.title}</title>
        <meta name="description" content={translations.description} />
        <meta name="keywords" content={translations.keywords} />
        <meta name="author" content={translations.author} />
        <meta property="og:title" content={translations.ogTitle} />
        <meta property="og:description" content={translations.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main>
        <Container>
          <Home />
        </Container>
      </main>
    </>
  );
}
