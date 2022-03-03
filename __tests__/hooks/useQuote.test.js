import { renderHook, act } from '@testing-library/react-hooks';
import * as nextRouter from 'next/router';
import { useQuote } from '../../hooks';

describe('hook useQuote', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the initial quote correctly', () => {
    expect.assertions(3);
    const quotes = [
      {
        q: 'Test quote',
        a: 'Test author',
      },
    ];
    const min = 1;
    const { result } = renderHook(() => useQuote(quotes, min));

    act(() => jest.advanceTimersByTime(500));

    expect(result.current.currQuote).toStrictEqual({
      q: 'Test quote',
      a: 'Test author',
    });
    expect(quotes).toHaveLength(0);
    expect(result.current.isQuoteShowing).toBe(true);
  });

  it('should render the second quote in the list after the initial quote', () => {
    expect.assertions(6);
    const quotes = [
      {
        q: 'Test quote 2',
        a: 'Test author 2',
      },
      {
        q: 'Test quote 1',
        a: 'Test author 1',
      },
    ];
    let min = 1;
    const { result, rerender } = renderHook(() => useQuote(quotes, min));

    act(() => jest.advanceTimersByTime(500));

    expect(result.current.currQuote).toStrictEqual({
      q: 'Test quote 1',
      a: 'Test author 1',
    });
    expect(quotes).toHaveLength(1);
    expect(result.current.isQuoteShowing).toBe(true);

    min += 1;
    rerender();
    act(() => jest.advanceTimersByTime(500));

    expect(result.current.currQuote).toStrictEqual({
      q: 'Test quote 2',
      a: 'Test author 2',
    });
    expect(quotes).toHaveLength(0);
    expect(result.current.isQuoteShowing).toBe(true);
  });

  it('should render default quote on error', () => {
    expect.assertions(1);
    const quotes = [
      {
        q: 'Too many requests. Obtain an auth key for unlimited access.',
      },
    ];
    const min = 1;
    const { result } = renderHook(() => useQuote(quotes, min));

    act(() => jest.advanceTimersByTime(500));
    expect(result.current.currQuote).toStrictEqual({
      q: `Destiny is a funny thing. You never know how things are going to work out.`,
      a: `Iroh, Avatar: The Last Airbender`,
      c: null,
      h: null,
    });
  });

  it('should refresh when quotes list is empty', async () => {
    expect.assertions(3);

    // mock next/router
    jest.spyOn(nextRouter, 'useRouter').mockImplementation();
    nextRouter.useRouter.mockImplementation(() => ({
      route: '/',
      replace: jest.fn(),
      asPath: '/',
    }));

    let quotes = [];
    const min = 1;
    const { result, rerender } = renderHook(() => useQuote(quotes, min));

    act(() => jest.advanceTimersByTime(500));
    expect(result.current.isRefreshing).toBe(true);

    quotes = [
      {
        q: 'New quote',
        a: 'New author',
      },
    ];

    rerender();
    act(() => jest.advanceTimersByTime(500));

    expect(result.current.currQuote).toStrictEqual({
      q: 'New quote',
      a: 'New author',
    });
    expect(result.current.isRefreshing).toBe(false);
  });
});
