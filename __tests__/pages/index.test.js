import { screen, render } from '@testing-library/react';
import dayjs from 'dayjs';
import Home, { getServerSideProps } from '../../pages/index';
import { transformToColor, getLuminance } from '../../lib/colors';

describe('home', () => {
  let currTime;
  let currBgColor;
  let luminance;
  let currTextColor;

  beforeEach(() => {
    currTime = dayjs().format('HH:mm:ss');
    const hour = dayjs().format('HH');
    const min = dayjs().format('mm');
    const sec = dayjs().format('ss');
    currBgColor = transformToColor(hour, min, sec);
    luminance = getLuminance(hour, min, sec);
    currTextColor = luminance > 127.5 ? 'text-black' : 'text-white';
    render(<Home />);
  });

  it('should render the current time', () => {
    expect.assertions(1);
    expect(screen.getByText(`${currTime}`)).toBeInTheDocument();
  });

  it('should render the correct background color', () => {
    expect.assertions(1);
    const rootDiv = screen.getByTestId('root');
    expect(rootDiv).toHaveStyle(`background-color: ${currBgColor}`);
  });

  it('should render the current background color as hex on the screen', () => {
    expect.assertions(1);
    const text = screen.getByText(`Hex color: ${currBgColor}`);
    expect(text).toBeInTheDocument();
  });

  it('should render the correct luminance on the screen', () => {
    expect.assertions(1);
    const text = screen.getByText(`Luminance: ${luminance.toFixed(4)}`);
    expect(text).toBeInTheDocument();
  });

  it('should render the correct text color', () => {
    expect.assertions(1);
    const rootDiv = screen.getByTestId('root');
    expect(rootDiv).toHaveStyle(`color: ${currTextColor}`);
  });
});

describe('getServerSideProps', () => {
  const testQuote = {
    q: `Test quote`,
    a: `by tester`,
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should handle errors', async () => {
    expect.assertions(1);
    fetch.mockResponseOnce(JSON.stringify({ status: 'error' }));
    const res = await getServerSideProps();
    expect(res).toStrictEqual(
      expect.objectContaining({
        props: {
          quotesData: {
            status: 'error',
          },
        },
      })
    );
  });

  it('should call the quotes API', async () => {
    expect.assertions(1);
    fetch.mockResponseOnce(
      JSON.stringify({ status: 'success', message: testQuote })
    );
    const res = await getServerSideProps();
    expect(res).toStrictEqual(
      expect.objectContaining({
        props: {
          quotesData: {
            status: 'success',
            message: testQuote,
          },
        },
      })
    );
  });
});
