import { renderHook } from '@testing-library/react-hooks';
import dayjs from 'dayjs';
import { useGetTimeNow } from '../../hooks';
import { ClockContext } from '../../pages/index';

/*
  Test hook with fake timers
*/
describe('hook useGetTimeNow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the current time', () => {
    expect.assertions(3);
    const hour = dayjs().format('HH');
    const min = dayjs().format('mm');
    const sec = dayjs().format('ss');
    const setHour = jest.fn();
    const setMin = jest.fn();
    const setSec = jest.fn();

    const testValue = {
      hour: [hour, setHour],
      min: [min, setMin],
      sec: [sec, setSec],
    };
    const wrapper = ({ children }) => (
      <ClockContext.Provider value={testValue}>
        {children}
      </ClockContext.Provider>
    );
    const { result } = renderHook(() => useGetTimeNow(), { wrapper });

    // Advance time by 2 seconds and ensure that the clock is still correct
    jest.advanceTimersByTime(2000);

    expect(result.current.hourVal).toBe(hour);
    expect(result.current.minVal).toBe(min);
    expect(result.current.secVal).toBe(sec);
  });
});
