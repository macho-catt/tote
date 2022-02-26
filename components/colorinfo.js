import React from 'react';
import PropTypes from 'prop-types';
import { colorInfoStyles } from '../styles/components';

export default function ColorInfo({ bgColor, luminance }) {
  return (
    <section className={colorInfoStyles.section}>
      <div>Hex color: {bgColor}</div>
      <div>Luminance: {luminance.toFixed(4)}</div>
    </section>
  );
}

ColorInfo.propTypes = {
  bgColor: PropTypes.string,
  luminance: PropTypes.number,
};

ColorInfo.defaultProps = {
  bgColor: null,
  luminance: null,
};
