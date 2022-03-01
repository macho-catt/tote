import React, { useState, useEffect, useMemo, createContext } from 'react';
import { useRouter } from 'next/router';
// import useSWR from 'swr'
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { AppHead, Clock, ColorInfo, Quote, Info } from '../components';
import { transformToColor, getLuminance } from '../lib/colors';
import rest from '../lib/fetcher';
import homeStyles from '../styles/pages/home.styles';

export const ClockContext = createContext();

const DEF_QUOTE = {
  q: `Destiny is a funny thing. You never know how things are going to work out.`,
  a: `Iroh, Avatar: The Last Airbender`,
};

export async function getServerSideProps() {
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
  // const [hour, setHour] = useState(null);
  // const [min, setMin] = useState(null);
  // const [sec, setSec] = useState(null);

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
  const [isQuoteShowing, setIsQuoteShowing] = useState(true);
  const router = useRouter();

  // *trick* to refresh the page: https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  const refreshData = async () => {
    setIsRefreshing(true);

    /* 
    // //trigger on-demand revalidation
    // await fetch(
    //   `/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}`
    // );
    // //it appears that a second call to router.replace does not work. Temp fix is to use a page reloaad.
    // router.reload();
    */
    await router.replace(router.asPath);
  };

  // Trigger when quotesData changes due to refresh
  useEffect(() => {
    // ensures quotesData does not get popped twice on initial render
    if (isRefreshing) {
      setCurrQuote(quotesData.pop());
      setIsRefreshing(false);
    }
  }, [quotesData]);

  // Update current quote every minute. Refresh the page if quotesData is empty.
  useEffect(() => {
    if (quotesData.length === 0) {
      refreshData();
    } else {
      setIsQuoteShowing(false);

      setTimeout(() => {
        const quote = quotesData.pop();
        // Ensure quote is valid
        if (
          quote.q ===
          'Too many requests. Obtain an auth key for unlimited access.'
        ) {
          setCurrQuote(DEF_QUOTE);
        } else {
          setCurrQuote(quote);
        }

        setIsQuoteShowing(true);
      }, 500);
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
