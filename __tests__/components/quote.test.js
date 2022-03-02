import { screen, render } from '@testing-library/react';
import { Quote } from '../../components';

describe('quote', () => {
  it('should render the current quote and author', () => {
    expect.assertions(2);
    const refresh = false;
    const show = true;
    const quote = {
      q: 'Test current quote',
      a: 'Test author',
    };
    render(<Quote isRefreshing={refresh} currQuote={quote} isShowing={show} />);

    const quoteText = screen.getByText(quote.q);
    const quoteAuthor = screen.getByText(`- ${quote.a}`);
    expect(quoteText).toBeInTheDocument();
    expect(quoteAuthor).toBeInTheDocument();
  });

  it('should render the refresh when data is refreshing', () => {
    expect.assertions(1);
    const refresh = true;
    const show = true;
    const quote = {
      q: 'Test current quote',
      a: 'Test author',
    };
    render(<Quote isRefreshing={refresh} currQuote={quote} isShowing={show} />);

    const text = screen.getByText('Data refreshing...');
    expect(text).toBeInTheDocument();
  });
});
