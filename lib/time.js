const toStandard = (h, m, s) => {
  if (h < 1) return `12:${m}:${s} am`;
  if (h < 12) return `${h}:${m}:${s} am`;
  if (h > 12) return `${h - 12}:${m}:${s} pm`;
  return `${h}:${m}:${s} pm`;
};

export { toStandard };
