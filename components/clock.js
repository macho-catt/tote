import React, { useEffect, useContext, useRef } from 'react';
import dayjs from 'dayjs';
import { clockStyles } from '../styles/components';
import { ClockContext } from '../pages';

export default function Clock() {
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

  return (
    <section className={clockStyles.section}>
      <div>
        {hourVal}:{minVal}:{secVal}
      </div>
    </section>
  );
}
