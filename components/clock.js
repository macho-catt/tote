import React, { useState, useEffect, useContext, useRef } from 'react';
import dayjs from 'dayjs';
import { clockStyles } from '../styles/components';
import { ClockContext } from '../pages';

export default function Clock() {
  const { hour, min, sec } = useContext(ClockContext);
  const [hourVal, setHourVal] = hour;
  const [minVal, setMinVal] = min;
  const [secVal, setSecVal] = sec;
  const timeRef = useRef();

  const [isMilitary, setIsMilitary] = useState(true);

  const toggleTime = () => {
    setIsMilitary(!isMilitary);
  };

  const toStandard = (h, m, s) => {
    if (h === 0) return `12:${m}:${s} am`;
    if (h < 12) return `${h}:${m}:${s} am`;
    return `${24 - h}:${m}:${s} pm`;
  };

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
      {isMilitary ? (
        <button onClick={toggleTime} type="button" className={clockStyles.btn}>
          <div>
            {hourVal}:{minVal}:{secVal}
          </div>
        </button>
      ) : (
        <button onClick={toggleTime} type="button" className={clockStyles.btn}>
          <div className={clockStyles.standard}>
            {toStandard(hourVal, minVal, secVal)}
          </div>
        </button>
      )}
    </section>
  );
}
