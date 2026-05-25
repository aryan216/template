/** Chapter 5 — copy & config */

export const BIRTHDAY_NAME = "Khushi";

export const CAKE_WISH_LINES = [
  "Tonight the candles listen before anyone else does.",
  "One slice, one wish, and a year that finally feels like yours.",
];

export const CAKE_BALLOONS = [
  { id: 0, left: "8%", size: 2.6, delay: 0, duration: 22, hue: "blush", drift: 28 },
  { id: 1, left: "22%", size: 2.1, delay: 4, duration: 26, hue: "gold", drift: -22 },
  { id: 2, left: "78%", size: 2.8, delay: 2, duration: 20, hue: "cream", drift: 32 },
  { id: 3, left: "68%", size: 2.3, delay: 7, duration: 24, hue: "rose", drift: -18 },
  { id: 4, left: "88%", size: 1.9, delay: 5, duration: 28, hue: "blush", drift: 24 },
  { id: 5, left: "14%", size: 2.4, delay: 9, duration: 23, hue: "rose", drift: -30 },
  { id: 6, left: "42%", size: 1.7, delay: 11, duration: 30, hue: "gold", drift: 14, back: true },
  { id: 7, left: "56%", size: 2, delay: 1, duration: 25, hue: "cream", drift: -26, back: true },
] as const;
