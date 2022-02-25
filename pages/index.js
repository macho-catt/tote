import React, { useState, useMemo, createContext } from 'react';
import dayjs from 'dayjs';
import { AppHead, Clock } from '../components';
import layoutStyles from '../styles/pages/layout.styles';

export const ClockContext = createContext();

export default function Home() {
  const [hour, setHour] = useState(dayjs().format('HH'));
  const [min, setMin] = useState(dayjs().format('mm'));
  const [sec, setSec] = useState(dayjs().format('ss'));

  const value = useMemo(() => ({
      setHour,
      setMin,
      setSec,
    }));

  return (
    <div>
      <AppHead />

      <div id="root" className={layoutStyles.root}>
        <main className={layoutStyles.main}>
          <ClockContext.Provider value={value}>
            <Clock />
          </ClockContext.Provider>

          <div>
            {hour}:{min}:{sec}
          </div>
        </main>
      </div>
    </div>
  );
}
