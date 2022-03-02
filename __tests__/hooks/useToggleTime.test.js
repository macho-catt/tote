import { renderHook, act } from '@testing-library/react-hooks';
import { useToggleTime } from '../../hooks';

describe('hook useToggleTime', () => {
  it('should toggle military time state', async () => {
    expect.hasAssertions();
    const { result, waitForNextUpdate } = renderHook(() => useToggleTime());
    // initial state
    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toBe(true);

    // first toggle
    act(() => {
      result.current[2].toggleTime();
    });
    await waitForNextUpdate();

    await expect(result.current[0]).resolves.toBe(false);
    await expect(result.current[1]).resolves.toBe(true);

    // second toggle
    act(() => {
      result.current[2].toggleTime();
    });
    await waitForNextUpdate();

    await expect(result.current[0]).resolves.toBe(true);
    await expect(result.current[1]).resolves.toBe(true);
  });
});
