import Head from 'next/head';

export default function AppHead() {
  const title = 'tote';
  const description =
    'tote (time + quote) displays the local time and a new quote very minute. The background color also changes based on the current time.';

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <html lang="en" />
      <meta name="description" content={description} key="desc" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
