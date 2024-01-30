/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import NavBar from '@/components/NavBar';
import store from '../slices/index';
import favicon from '../images/icon.svg';
import '../scss/app.scss';

const init = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Head>
      <link rel="shortcut icon" href={favicon.src} />
    </Head>
    <NavBar />
    <main>
      <div className="container">
        <div className="anim-show">
          <Component {...pageProps} />
        </div>
      </div>
    </main>
  </Provider>
);

export default init;
