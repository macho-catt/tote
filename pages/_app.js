import '../styles/global.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const title = 'tote';
  const description =
    'tote (time + quote) displays the local time and a new quote very minute. The background color also changes based on the current time.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} key="desc" />
        <meta name="image" content="/home.png" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta proeprty="og:image" content="/home.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.node).isRequired,
};
