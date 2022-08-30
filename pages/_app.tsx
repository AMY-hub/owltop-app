import Head from 'next/head';
import Router from 'next/router';
import { AppProps } from 'next/dist/shared/lib/router/router';
import ym, { YMInitializer } from 'react-yandex-metrika';

import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {

  Router.events.on('routeChangeComplete', (url: string): void => {
    if (typeof window !== 'undefined') {
      ym('hit', url);
    }
  });

  return (
    <>
      <Head>
        <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
        <meta property='og:locale' content='ru_RU' />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <YMInitializer
        accounts={[]}
        options={{ webvisor: true, defer: true }}
        version='2'
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
