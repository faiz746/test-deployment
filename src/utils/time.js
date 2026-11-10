// utils/time.js
export const hoursOptions = () => {
  const times = [];

  for (let h = 1; h <= 12; h++) {
    times.push(h < 10 ? `0${h}` : h);
  }

  return times;
};
export const minutesOptions = () => {
  const times = [];

  for (let h = 0; h < 60; h++) {
    times.push(h < 10 ? `0${h}` : h);
  }

  return times;
};
