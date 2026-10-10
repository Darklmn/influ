import {spring} from 'remotion';
import {FPS} from './timeline';

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const lerp = (a: number, b: number, x: number) => a + (b - a) * x;

/** 0..1 progress of t through [start, start + dur] */
export const prog = (t: number, start: number, dur: number) => clamp01((t - start) / dur);

export const eOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
export const eInCubic = (x: number) => x * x * x;
export const eInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const eOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
export const eInOutQuint = (x: number) => (x < 0.5 ? 16 * x ** 5 : 1 - Math.pow(-2 * x + 2, 5) / 2);
export const eOutBack = (x: number, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);

/** physically based spring starting at `start` seconds (0 → 1, may overshoot) */
export const spr = (t: number, start: number, cfg: {stiffness?: number; damping?: number; mass?: number} = {}) =>
  t < start
    ? 0
    : spring({
        frame: (t - start) * FPS,
        fps: FPS,
        config: {stiffness: cfg.stiffness ?? 170, damping: cfg.damping ?? 15, mass: cfg.mass ?? 1},
      });

/** opacity window: fades in over `fi` after a, fades out over `fo` before b */
export const win = (t: number, a: number, b: number, fi = 0.2, fo = 0.2) =>
  Math.min(prog(t, a, fi), 1 - prog(t, b - fo, fo));

/** deterministic pseudo random */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** small decaying shake (px) starting at `start` */
export const shake = (t: number, start: number, amp = 14, dur = 0.35) => {
  if (t < start || t > start + dur) return {x: 0, y: 0};
  const k = 1 - (t - start) / dur;
  return {
    x: Math.sin((t - start) * 90) * amp * k * k,
    y: Math.cos((t - start) * 77) * amp * 0.6 * k * k,
  };
};
