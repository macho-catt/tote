import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { Info } from '../../components';

describe('info', () => {
  beforeEach(() => {
    // Allows Dialog to be closd
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserver: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    render(<Info />);
  });

  it('should render the button', () => {
    expect.assertions(1);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('should open and close the modal', async () => {
    expect.hasAssertions();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const text = await screen.findByText('tote');
    expect(text).toBeInTheDocument();

    fireEvent.keyDown(text, { key: 'Escape', code: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByText('tote')).not.toBeInTheDocument();
    });
  });
});
