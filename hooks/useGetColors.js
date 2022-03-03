import { useState, useEffect } from 'react';
import { transformToColor, getLuminance } from '../lib/colors';

/*
  Takes the current time and obtains a hex color for the background,
  the hex color's luminance, and a contrasting text color for the background
*/
const useGetColors = (hour, min, sec) => {
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

  return { bgColor, luminance, textColor };
};

export default useGetColors;
