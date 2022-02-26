import '../styles/global.css';
import PropTypes from 'prop-types';
// import { SWRConfig } from 'swr';
// import rest from '../lib/fetcher';

export default function App({ Component, pageProps }) {
  return (
    // <SWRConfig
    //   value={{
    //     fetcher: rest,
    //   }}
    // >
    <Component {...pageProps} />
    // </SWRConfig>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.node).isRequired,
};
