import { renderHook } from '@testing-library/react-hooks';
import { useGetColors } from '../../hooks';
import { transformToColor, getLuminance } from '../../lib/colors';

describe('hook useGetColors', () => {
  it('should render the correct color values at midnight', () => {
    expect.assertions(3);
    const h = 0;
    const m = 0;
    const s = 0;

    const { result } = renderHook(() => useGetColors(h, m, s));
    expect(result.current.bgColor).toBe(transformToColor(h, m, s));
    expect(result.current.luminance).toBe(getLuminance(h, m, s));
    expect(result.current.textColor).toBe('text-black');
  });

  it('should render the correct color values at noon', () => {
    expect.assertions(3);
    const h = 12;
    const m = 0;
    const s = 0;

    const { result } = renderHook(() => useGetColors(h, m, s));
    expect(result.current.bgColor).toBe(transformToColor(h, m, s));
    expect(result.current.luminance).toBe(getLuminance(h, m, s));
    expect(result.current.textColor).toBe('text-white');
  });
});
