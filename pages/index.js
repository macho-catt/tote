import React, { useState, useMemo, createContext } from 'react';
// import useSWR from 'swr'
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useGetColors, useQuote } from '../hooks';
import { AppHead, Clock, ColorInfo, Quote, Info } from '../components';
import rest from '../lib/fetcher';
import homeStyles from '../styles/pages/home.styles';

export const ClockContext = createContext();

const DEF_QUOTE = {
  q: `Destiny is a funny thing. You never know how things are going to work out.`,
  a: `Iroh, Avatar: The Last Airbender`,
  c: null,
  h: null,
};

export async function getServerSideProps() {
  // try {
  const quotesApiUrl = `https://zenquotes.io/api/quotes/`;
  // for testing
  // const quotesApiUrl = `https://zenquotes.io/api/random`;
  const quotesData = await rest(quotesApiUrl);
  return {
    props: {
      quotesData,
    },
  };
  // } catch (error) {
  //   return { props: {} };
  // }
}

export default function Home({ quotesData }) {
  const [hour, setHour] = useState(dayjs().format('HH'));
  const [min, setMin] = useState(dayjs().format('mm'));
  const [sec, setSec] = useState(dayjs().format('ss'));

  const timeValue = useMemo(() => ({
    hour: [hour, setHour],
    min: [min, setMin],
    sec: [sec, setSec],
  }));

  const { bgColor, luminance, textColor } = useGetColors(hour, min, sec);
  const { currQuote, isRefreshing, isQuoteShowing } = useQuote(quotesData, min);

  return (
    <div>
      <AppHead />

      <div
        id="root"
        data-testid="root"
        className={textColor}
        style={{ background: `${bgColor}` }}
      >
        {/* <div id="root" className={`bg-[${color}]`}> */}
        <main className={homeStyles.main}>
          <Info />
          <Quote
            currQuote={currQuote}
            isRefreshing={isRefreshing}
            isShowing={isQuoteShowing}
          />

          <ClockContext.Provider value={timeValue}>
            <Clock />
          </ClockContext.Provider>

          <ColorInfo bgColor={bgColor} luminance={luminance} />
        </main>
      </div>
    </div>
  );
}

Home.propTypes = {
  quotesData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.objectOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Home.defaultProps = {
  quotesData: DEF_QUOTE,
};
