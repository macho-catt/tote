import { useState } from 'react';

/*
  Toggles the time between military and standard,
  and toggles the transition
*/
const useToggleTime = () => {
  const [isMilitary, setIsMilitary] = useState(true);
  const [isShowing, setIsShowing] = useState(true);

  return [
    isMilitary,
    isShowing,
    {
      setIsMilitary,
      setIsShowing,
      toggleTime: () => {
        setIsShowing(false);

        setTimeout(() => {
          setIsMilitary(!isMilitary);
          setIsShowing(true);
        }, 500);
      },
    },
  ];
};

export default useToggleTime;
