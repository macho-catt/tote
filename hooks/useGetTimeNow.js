import { useEffect, useRef, useContext } from 'react';
import dayjs from 'dayjs';
import { ClockContext } from '../pages';

/*
  Returns the updated time every second
*/
const useGetTimeNow = () => {
  const { hour, min, sec } = useContext(ClockContext);
  const [hourVal, setHourVal] = hour;
  const [minVal, setMinVal] = min;
  const [secVal, setSecVal] = sec;
  const timeRef = useRef();

  const getTimeNow = () => {
    setHourVal(dayjs().format('HH'));
    setMinVal(dayjs().format('mm'));
    setSecVal(dayjs().format('ss'));
  };

  useEffect(() => {
    timeRef.current = setInterval(getTimeNow, 1000);

    return () => clearInterval(timeRef.current);
  }, []);

  return { hourVal, minVal, secVal };
};

export default useGetTimeNow;
