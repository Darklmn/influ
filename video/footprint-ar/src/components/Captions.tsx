import React from 'react';
import {C, FONT_AR} from '../theme';
import {LINES, Word} from '../timeline';
import {clamp01, eOutBack, eOutCubic, prog} from '../anim';

// Word-by-word Arabic captions synced to the voice-over timestamps.
// Blue text (brand), key words in black with the blue logo swoosh drawn underneath.

const PHRASES: {words: Word[]; start: number; end: number}[] = [];
LINES.forEach((line) => {
  line.phrases.forEach((ph) => {
    PHRASES.push({words: ph, start: ph[0].s, end: ph[ph.length - 1].e});
  });
});
PHRASES.forEach((p, i) => {
  const next = PHRASES[i + 1];
  // hold each phrase on screen until the next one starts (max 1.2s after its last word)
  p.end = next ? Math.min(next.start - 0.06, p.end + 1.2) : p.end + 1.0;
});

// Captions are hidden while a scene shows the same words as a big graphic
const HIDE: [number, number][] = [[34.95, 36.12]];

const Swoosh: React.FC<{p: number; id: string}> = ({p, id}) => (
  <svg
    viewBox="0 0 200 24"
    preserveAspectRatio="none"
    style={{position: 'absolute', left: '-4%', right: '-4%', bottom: -10, width: '108%', height: 20, overflow: 'visible'}}
  >
    <defs>
      <clipPath id={id}>
        <rect x={200 - 200 * p} y="-10" width={200 * p} height="44" />
      </clipPath>
    </defs>
    <path d="M4 18 C 60 6, 130 4, 196 10 C 198 12, 197 16, 194 16 C 130 11, 70 13, 8 22 C 3 23, 1 20, 4 18 Z" fill={C.blue} clipPath={`url(#${id})`} />
  </svg>
);

export const Captions: React.FC<{t: number}> = ({t}) => {
  if (HIDE.some(([a, b]) => t >= a && t <= b)) return null;
  const ph = PHRASES.find((p) => t >= p.start - 0.12 && t <= p.end);
  if (!ph) return null;
  const out = prog(t, ph.end - 0.12, 0.12);
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top: 1300,
        height: 270,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1 - out,
        transform: `translateY(${-18 * out}px)`,
      }}
    >
      <div
        style={{
          direction: 'rtl',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'baseline',
          columnGap: 20,
          rowGap: 6,
          fontFamily: FONT_AR,
          fontWeight: 800,
          fontSize: 70,
          lineHeight: 1.32,
          textAlign: 'center',
        }}
      >
        {ph.words.map((w, i) => {
          const a = clamp01((t - (w.s - 0.06)) / 0.2);
          const v = eOutBack(a, 2.2);
          const active = t >= w.s - 0.04 && t < w.e + 0.04;
          const sw = eOutCubic(prog(t, w.s + 0.05, 0.3));
          return (
            <span
              key={i}
              style={{
                position: 'relative',
                display: 'inline-block',
                color: w.hl ? C.black : C.blue,
                opacity: clamp01(a * 1.6),
                transform: `translateY(${(1 - v) * 26}px) scale(${0.86 + 0.14 * v + (active ? 0.05 : 0)})`,
                textShadow: '0 2px 0 rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.95)',
              }}
            >
              {w.t}
              {w.hl && <Swoosh p={sw} id={`sw-${ph.start}-${i}`.replace('.', '_')} />}
            </span>
          );
        })}
      </div>
    </div>
  );
};
