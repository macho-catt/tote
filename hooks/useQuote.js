import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const DEF_QUOTE = {
  q: `Destiny is a funny thing. You never know how things are going to work out.`,
  a: `Iroh, Avatar: The Last Airbender`,
};

const useQuote = (quotesData, min) => {
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

  return { currQuote, isRefreshing, isQuoteShowing };
};

export default useQuote;
