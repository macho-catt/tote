import React from 'react';
import PropTypes from 'prop-types';
import { quoteStyles } from '../styles/components';

export default function Quote({ isRefreshing, currQuote }) {
  return (
    <section className={quoteStyles.section}>
      {isRefreshing ? (
        <div>Data refreshing...</div>
      ) : (
        <div>{currQuote && currQuote.q}</div>
      )}
    </section>
  );
}

Quote.propTypes = {
  isRefreshing: PropTypes.bool,
  currQuote: PropTypes.objectOf(PropTypes.node),
};

Quote.defaultProps = {
  isRefreshing: false,
  currQuote: null,
};
