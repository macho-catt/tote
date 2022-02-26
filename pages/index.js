import React, { useState, useEffect, useMemo, createContext } from 'react';
import { useRouter } from 'next/router';
// import useSWR from 'swr'
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { AppHead, Clock, ColorInfo, Quote } from '../components';
import { transformToColor, getLuminance } from '../lib/colors';
import rest from '../lib/fetcher';
import homeStyles from '../styles/pages/home.styles';

export const ClockContext = createContext();

export async function getStaticProps() {
  try {
    const quotesApiUrl = `https://zenquotes.io/api/quotes/`;
    // for testing
    // const quotesApiUrl = `https://zenquotes.io/api/random`;
    const quotesData = await rest(quotesApiUrl);
    return {
      props: {
        quotesData,
      },
    };
  } catch (error) {
    return { props: {} };
  }
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

  const [bgColor, setBgColor] = useState(`${transformToColor(hour, min, sec)}`);
  const [luminance, setLuminance] = useState(getLuminance(hour, min, sec));
  const [textColor, setTextColor] = useState(
    luminance > 127.5 ? 'text-black' : 'text-white'
  );

  // Update bg-color and luminance when time changes
  useEffect(() => {
    setBgColor(transformToColor(hour, min, sec));
    setLuminance(getLuminance(hour, min, sec));
  }, [hour, min, sec]);

  // Change text-color based on luminance value
  useEffect(() => {
    if (luminance > 127.5) setTextColor('text-black');
    else setTextColor('text-white');
  }, [luminance]);

  const [currQuote, setCurrQuote] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  // *trick* to refresh the page: https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  // Trigger when quotesData changes due to refresh
  useEffect(() => {
    // ensures quotesData does not get popped twice on initial render
    if (isRefreshing) {
      console.log('test');
      setCurrQuote(quotesData.pop());
      setIsRefreshing(false);
    }
  }, [quotesData]);

  // Update current quote every minute by refreshing the page
  useEffect(() => {
    if (quotesData.length === 0) {
      refreshData();
    } else {
      setCurrQuote(quotesData.pop());
    }
  }, [min]);

  return (
    <div>
      <AppHead />

      <div
        id="root"
        className={`${textColor}`}
        style={{ background: `${bgColor}` }}
      >
        {/* <div id="root" className={`bg-[${color}]`}> */}
        <main className={homeStyles.main}>
          <Quote currQuote={currQuote} isRefreshing={isRefreshing} />

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
  quotesData: 'test',
};
