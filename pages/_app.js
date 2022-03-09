import '../styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const title = 'tote';
  const description =
    'tote (time + quote) displays a changing background color based on the current time of day. Every minute, a new quote appears on the screen.';
  const url = 'https://tote.vercel.app';

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} key="desc" />
        <meta name="image" content="/home.png" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/home.png" />
        <meta property="og:url" content={url} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.node).isRequired,
};
