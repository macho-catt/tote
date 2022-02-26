const decToHex = (dec) => {
  let hex = dec.toString(16);
  hex = hex.length > 1 ? hex : `0${hex}`;
  return hex.toUpperCase();
};

const transformToColor = (h, m, s) => {
  const R = 255 - parseInt((h / 24) * 255, 10);
  const G = 255 - parseInt((m / 60) * 255, 10);
  const B = 255 - parseInt((s / 60) * 255, 10);
  return `#${decToHex(R)}${decToHex(G)}${decToHex(B)}`;
};

// https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
const getLuminance = (h, m, s) => {
  const R = 255 - parseInt((h / 24) * 255, 10);
  const G = 255 - parseInt((m / 60) * 255, 10);
  const B = 255 - parseInt((s / 60) * 255, 10);
  return 0.299 * R + 0.587 * G + 0.114 * B;
};

export { decToHex, transformToColor, getLuminance };
