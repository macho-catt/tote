import React, { useState, useEffect, useContext, useRef } from 'react';
import dayjs from 'dayjs';
import { Transition } from '@headlessui/react';
import { clockStyles } from '../styles/components';
import { ClockContext } from '../pages';

export default function Clock() {
  const { hour, min, sec } = useContext(ClockContext);
  const [hourVal, setHourVal] = hour;
  const [minVal, setMinVal] = min;
  const [secVal, setSecVal] = sec;
  const timeRef = useRef();

  const [isMilitary, setIsMilitary] = useState(true);
  const [isShowing, setIsShowing] = useState(true);

  const toggleTime = () => {
    setIsShowing(false);

    setTimeout(() => {
      setIsMilitary(!isMilitary);
      setIsShowing(true);
    }, 500);
  };

  const toStandard = (h, m, s) => {
    if (h < 1) return `12:${m}:${s} am`;
    if (h < 12) return `${h}:${m}:${s} am`;
    if (h > 12) return `${h - 12}:${m}:${s} pm`;
    return `${h}:${m}:${s} pm`;
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
      <Transition
        show={isShowing}
        enter="transition duration-500"
        enterFrom="-translate-x-12 opacity-0 scale-95"
        enterTo="translate-x-0 opacity-100 scale-100"
        leave="transition duration-300"
        leaveFrom="translate-x-0 opacity-100 scale-100"
        leaveTo="-translate-x-12 opacity-0 scale-95"
      >
        {isMilitary ? (
          <button
            onClick={toggleTime}
            type="button"
            className={clockStyles.btn}
          >
            <div>
              {hourVal}:{minVal}:{secVal}
            </div>
          </button>
        ) : (
          <button
            onClick={toggleTime}
            type="button"
            className={clockStyles.btn}
          >
            <div className={clockStyles.standard}>
              {toStandard(hourVal, minVal, secVal)}
            </div>
          </button>
        )}
      </Transition>
    </section>
  );
}
