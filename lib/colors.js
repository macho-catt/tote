import { hexToHsluv, hsluvToHex, hsluvToRgb } from 'hsluv';

const decToHex = (dec) => {
  let hex = dec.toString(16);
  hex = hex.length > 1 ? hex : `0${hex}`;
  return hex.toUpperCase();
};

const transformToColor = (h, m, s) => {
  // const R = 255 - parseInt((h / 24) * 255, 10);
  // const G = 255 - parseInt((m / 60) * 255, 10);
  // const B = 255 - parseInt((s / 60) * 255, 10);
  // return `#${decToHex(R)}${decToHex(G)}${decToHex(B)}`;
  const hr = parseInt(h, 10);
  const min = parseInt(m, 10);
  const sec = parseInt(s, 10);
  const hue = (((hr * 60 + min) * 60 + sec) / 86400) * 360;
  const saturation = 75 + Math.cos((sec / 30) * Math.PI) * 15;
  const light = 50 + Math.cos(((min * 60 + sec) / 60 / 30) * Math.PI) * 10;
  const hex = hsluvToHex([hue, saturation, light]);

  return hex;
};

// https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
const getLuminance = (h, m, s) => {
  const hex = transformToColor(h, m, s);
  const [R, G, B] = hsluvToRgb(hexToHsluv(hex));
  // const R = 255 - parseInt((h / 24) * 255, 10);
  // const G = 255 - parseInt((m / 60) * 255, 10);
  // const B = 255 - parseInt((s / 60) * 255, 10);
  return 0.299 * (R * 255) + 0.587 * (G * 255) + 0.114 * (B * 255);
};

export { decToHex, transformToColor, getLuminance };
