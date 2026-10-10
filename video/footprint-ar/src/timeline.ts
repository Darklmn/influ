// Timeline derived from the final (tightened, 1.30x) ElevenLabs voice-over.
// Word timings: faster-whisper large-v3 word timestamps, corrected with the
// silence map (scripts/vo_chunks.json) so each line starts on real speech onset.

export const FPS = 30;
export const VO_DURATION = 41.48;
export const DURATION_SEC = 42.5;
export const DURATION_FRAMES = Math.round(DURATION_SEC * FPS); // 1275

export const f = (sec: number) => Math.round(sec * FPS);

// Music grid: 114.47 BPM, bar = 2.0967s, first downbeat at 0.09s.
// Chosen so bars land exactly on 12.67s (candle opens), 37.83s (CTA drop), 39.93s (URL).
export const BAR = 2.0967;
export const BEAT = BAR / 4;
export const GRID0 = 0.0899;
export const barTime = (k: number) => GRID0 + k * BAR;

export type Word = {t: string; s: number; e: number; hl?: boolean};
export type LineT = {id: string; start: number; end: number; phrases: Word[][]};

const w = (t: string, s: number, e: number, hl = false): Word => ({t, s, e, hl});

export const LINES: LineT[] = [
  {
    id: 'hook',
    start: 0,
    end: 4.06,
    phrases: [
      [w('هل', 0.0, 0.14), w('تتداول', 0.14, 0.64), w('بالشموع', 0.64, 1.1, true), w('فقط؟', 1.1, 1.7)],
      [w('إذن', 1.8, 2.18), w('أنت', 2.18, 2.62), w('ترى', 2.62, 2.9), w('نصف', 2.9, 3.16, true), w('الحقيقة!', 3.16, 3.66, true)],
    ],
  },
  {
    id: 'candle',
    start: 4.06,
    end: 8.72,
    phrases: [
      [w('الشمعة', 4.06, 4.42), w('تخبرك', 4.42, 5.06), w('أين', 5.06, 5.34), w('تحرّك', 5.34, 5.76, true), w('السعر…', 5.76, 6.2, true)],
      [w('لكنها', 6.36, 6.8), w('لا', 6.8, 7.0), w('تخبرك', 7.0, 7.52), w('مَن', 7.52, 7.74, true), w('حرّكه', 7.74, 8.28, true)],
    ],
  },
  {
    id: 'intro',
    start: 8.72,
    end: 12.67,
    phrases: [
      [w('وهنا', 8.72, 9.06), w('يأتي', 9.06, 9.66), w('دور', 9.66, 9.94), w('الفوت', 9.94, 10.18, true), w('برينت', 10.18, 10.46, true)],
      [w('أقوى', 10.46, 11.1), w('أدوات', 11.1, 11.6), w('الأوردر', 11.6, 12.02, true), w('فلو', 12.02, 12.28, true)],
    ],
  },
  {
    id: 'inside',
    start: 12.67,
    end: 18.16,
    phrases: [
      [w('الفوت', 12.67, 12.98), w('برينت', 12.98, 13.3), w('يفتح', 13.3, 14.0, true), w('الشمعة', 14.0, 14.38, true), w('من', 14.38, 14.56), w('الداخل', 14.56, 15.1, true)],
      [w('ويُظهر', 15.28, 15.68), w('حجم', 15.68, 15.94, true), w('التداول', 15.94, 16.4, true), w('عند', 16.4, 16.6), w('كل', 16.6, 16.86), w('مستوى', 16.86, 17.38, true), w('سعري', 17.38, 17.78, true)],
    ],
  },
  {
    id: 'bidask',
    start: 18.16,
    end: 23.08,
    phrases: [
      [w('على', 18.16, 18.4), w('اليسار', 18.4, 18.86), w('البائعون', 18.98, 19.52, true), w('عند', 19.52, 19.72), w('البيد', 19.72, 20.18, true)],
      [w('وعلى', 20.33, 20.72), w('اليمين', 20.72, 21.26), w('المشترون', 21.43, 21.92, true), w('عند', 21.92, 22.14), w('الآسك', 22.14, 22.68, true)],
    ],
  },
  {
    id: 'imbalance',
    start: 23.08,
    end: 29.79,
    phrases: [
      [w('وعندما', 23.08, 23.42), w('يتفوّق', 23.42, 24.0, true), w('طرف', 24.0, 24.36), w('على', 24.36, 24.6), w('الآخر', 24.6, 25.08), w('بقوة', 25.08, 25.58, true)],
      [w('يظهر', 25.81, 26.18), w('الإمبالانس', 26.18, 26.78, true)],
      [w('وغالبًا', 27.05, 27.54), w('ما', 27.54, 27.68), w('يكشف', 27.68, 28.12), w('دخول', 28.12, 28.46), w('الأموال', 28.46, 28.96, true), w('الكبيرة', 28.96, 29.42, true)],
    ],
  },
  {
    id: 'delta',
    start: 29.79,
    end: 35.0,
    phrases: [
      [w('أمّا', 29.79, 29.96), w('الدلتا', 29.96, 30.44, true), w('فهي', 30.64, 30.86), w('الفرق', 30.86, 31.14, true), w('بين', 31.14, 31.32), w('الشراء', 31.32, 31.8, true), w('والبيع', 31.8, 32.24, true)],
      [w('لتعرف', 32.46, 32.86), w('مَن', 32.86, 33.0), w('يسيطر', 33.0, 33.54, true), w('فعلًا', 33.54, 33.92), w('على', 33.92, 34.04), w('السوق', 34.04, 34.42, true)],
    ],
  },
  {
    id: 'cta',
    start: 35.0,
    end: DURATION_SEC,
    phrases: [
      [w('توقّف', 35.0, 35.36, true), w('عن', 35.36, 35.46), w('التخمين', 35.46, 35.96, true)],
      [w('واقرأ', 36.2, 36.48), w('السوق', 36.48, 36.88), w('كالمحترفين', 36.88, 37.64, true)],
      [w('احصل', 37.83, 38.06), w('على', 38.06, 38.22), w('أدواتك', 38.22, 38.7), w('المجانية', 38.7, 39.28, true), w('الآن', 39.28, 39.64, true)],
    ],
  },
];

// Precise sync points used by the scenes (seconds)
export const CUE = {
  halfTruth: 2.9,
  candleIn: 4.06,
  priceMove: 5.06,
  whoMoved: 7.52,
  footprintWord: 9.94,
  orderFlowWord: 11.6,
  openCandle: 13.3,
  volumeFill: 15.68,
  bidSide: 18.98,
  askSide: 21.43,
  dominate: 23.42,
  imbalanceWord: 26.18,
  bigMoney: 28.46,
  deltaWord: 29.96,
  deltaDiff: 30.86,
  control: 33.0,
  stopGuess: 35.0,
  readPro: 36.2,
  freeTools: 37.83,
  url: 39.88,
};
