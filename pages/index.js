import React, { useState, useEffect, useMemo, createContext } from 'react';
import dayjs from 'dayjs';
import { AppHead, Clock, ColorInfo } from '../components';
import { transformToColor, getLuminance } from '../lib/colors';
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

  const [bgColor, setBgColor] = useState(`${transformToColor(hour, min, sec)}`);
  const [luminance, setLuminance] = useState(getLuminance(hour, min, sec));
  const [textColor, setTextColor] = useState(
    luminance > 127.5 ? 'text-black' : 'text-white'
  );

  // Update bg-color and luminance when time changes
  useEffect(() => {
    setBgColor(transformToColor(hour, min, sec));
    setLuminance(getLuminance(hour, min, sec));
  }, [hour, min, sec]);

  // Change text-color based on luminance value
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

          <ColorInfo bgColor={bgColor} luminance={luminance} />
        </main>
      </div>
    </div>
  );
}
