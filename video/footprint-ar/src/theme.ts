// Brand system — 3 colours taken from the official logo (sampled by scripts/vectorize_logo.py)
export const C = {
  blue: '#0154FD',
  black: '#030302',
  white: '#FFFFFF',
  // tints of the brand blue / black (same hue, used for depth and data intensity)
  blue900: '#0036A8',
  blue50: '#F2F6FF',
  blue100: '#E3ECFF',
  blue200: '#C4D6FF',
  blue300: '#94B4FF',
  ink: (a: number) => `rgba(3,3,2,${a})`,
  blueA: (a: number) => `rgba(1,84,253,${a})`,
};

export const FONT_AR = '"Cairo", sans-serif';
export const FONT_LAT = '"Poppins", sans-serif';
export const FONT_MONO = '"JetBrains Mono", monospace';

export const W = 1080;
export const H = 1920;
