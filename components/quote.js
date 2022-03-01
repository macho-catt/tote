import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { quoteStyles } from '../styles/components';

export default function Quote({ isRefreshing, currQuote, isShowing }) {
  return (
    <section className={quoteStyles.section}>
      {isRefreshing ? (
        <div>
          <span
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          />
          <h2 className={quoteStyles.h1}>Data refreshing...</h2>
        </div>
      ) : (
        <div>
          {currQuote && (
            <Transition
              show={isShowing}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className={quoteStyles.content}
            >
              <h2 className={quoteStyles.h2}> {currQuote.q} </h2>
              <h1 className={quoteStyles.h1}>- {currQuote.a} </h1>
            </Transition>
          )}
        </div>
      )}
    </section>
  );
}

Quote.propTypes = {
  isRefreshing: PropTypes.bool,
  currQuote: PropTypes.objectOf(PropTypes.node),
  isShowing: PropTypes.bool,
};

Quote.defaultProps = {
  isRefreshing: false,
  currQuote: null,
  isShowing: true,
};
