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
    hour: [hour, setHour],
    min: [min, setMin],
    sec: [sec, setSec],
  }));

  const decToHex = (dec) => {
    let hex = dec.toString(16);
    hex = hex.length > 1 ? hex : `0${hex}`;
    return hex.toUpperCase();
  };

  const transformToColor = (h, m, s) => {
    const R = (255 - parseInt((h / 24) * 255, 10)).toString(16);
    const G = (255 - parseInt((m / 60) * 255, 10)).toString(16);
    const B = (255 - parseInt((s / 60) * 255, 10)).toString(16);
    const hex = `#${decToHex(R)}${decToHex(G)}${decToHex(B)}`;
    return hex;
  };

  const getLuminance = (h, m, s) => {
    const R = 255 - parseInt((h / 24) * 255, 10);
    const G = 255 - parseInt((m / 60) * 255, 10);
    const B = 255 - parseInt((s / 60) * 255, 10);
    return 0.299 * R + 0.587 * G + 0.114 * B;
  };

  const [bgColor, setBgColor] = useState(`${transformToColor(hour, min, sec)}`);
  const [luminance, setLuminance] = useState(getLuminance(hour, min, sec));
  const [textColor, setTextColor] = useState(
    luminance > 127.5 ? 'text-black' : 'text-white'
  );

  useEffect(() => {
    setBgColor(transformToColor(hour, min, sec));
    setLuminance(getLuminance(hour, min, sec));
  }, [hour, min, sec]);

  useEffect(() => {
    if (luminance > 127.5) setTextColor('text-black');
    else setTextColor('text-white');
  }, [luminance]);

  return (
    <div>
      <AppHead />

      <div
        id="root"
        className={`${textColor}`}
        style={{ background: `${bgColor}` }}
      >
        {/* <div id="root" className={`bg-[${color}]`}> */}
        <main className={layoutStyles.main}>
          <ClockContext.Provider value={value}>
            <Clock />
          </ClockContext.Provider>

          <div>{bgColor}</div>
          <div>{luminance.toFixed(4)}</div>
        </main>
      </div>
    </div>
  );
}
