import React, { useState, useEffect, useMemo, createContext } from 'react';
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

  const decToHex = (dec) => {
    let hex = dec.toString(16);
    hex = hex.length > 1 ? hex : `0${  hex}`;
    return hex.toUpperCase();
  };

  const transformToColor = (h, m, s) => {
    const R = parseInt((h / 24) * 255, 10).toString(16);
    const G = parseInt((m / 60) * 255, 10).toString(16);
    const B = parseInt((s / 60) * 255, 10).toString(16);
    const hex = `#${decToHex(R)}${decToHex(G)}${decToHex(B)}`;
    return hex;
  };

  const [color, setColor] = useState(`${transformToColor(hour, min, sec)}`);
  // const [color, setColor] = useState("bg-[#AAAA15]");
  useEffect(() => {
    setColor(transformToColor(hour, min, sec));
  }, [hour, min, sec]);

  return (
    <div>
      <AppHead />

      <div id="root" style={{ background: `${color}` }}>
        {/* <div id="root" className={`bg-[${color}]`}> */}
        <main className={layoutStyles.main}>
          <ClockContext.Provider value={value}>
            <Clock />
          </ClockContext.Provider>

          <div>{color}</div>
        </main>
      </div>
    </div>
  );
}
