import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT_AR, FONT_LAT, FONT_MONO} from '../theme';
import {CUE} from '../timeline';
import {DELTA, SUM_ASK, SUM_BID, fmtInt} from '../data';
import {clamp01, eOutBack, eOutCubic, prog, shake, spr} from '../anim';
import {ArrowIcon} from '../components/Icons';

// 29.79 – 35.0s  "أمّا الدلتا، فهي الفرق بين الشراء والبيع، لتعرف مَن يسيطر فعلًا على السوق."
const HIST = [-320, 210, -150, 480, -90, 260, DELTA];
const ZERO_Y = 1205;
const MAX_H = 250;

const Card: React.FC<{
  t: number;
  at: number;
  label: string;
  ar: string;
  value: number;
  prefix?: string;
  variant: 'ask' | 'bid' | 'delta';
  width: number;
}> = ({t, at, label, ar, value, prefix = '', variant, width}) => {
  const a = spr(t, at, {stiffness: 210, damping: 15});
  const count = eOutCubic(prog(t, at, 0.45));
  const solid = variant === 'delta';
  const col = variant === 'bid' ? C.black : C.blue;
  return (
    <div
      style={{
        width,
        height: 170,
        borderRadius: 26,
        border: `5px solid ${col}`,
        background: solid ? C.blue : C.white,
        boxShadow: solid ? '0 18px 40px rgba(1,84,253,0.35)' : '0 12px 26px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: clamp01(a * 1.6),
        transform: `translateY(${(1 - a) * 60}px) scale(${0.7 + 0.3 * a})`,
        boxSizing: 'border-box',
      }}
    >
      <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
        <span style={{fontFamily: FONT_LAT, fontWeight: 800, fontSize: 28, letterSpacing: 2, color: solid ? C.white : col}}>{label}</span>
        <span style={{fontFamily: FONT_AR, fontWeight: 800, fontSize: 28, color: solid ? C.white : C.black}}>{ar}</span>
      </div>
      <span style={{fontFamily: FONT_MONO, fontWeight: 800, fontSize: 56, color: solid ? C.white : col, lineHeight: 1.15}}>
        {prefix}
        {fmtInt(Math.round(value * count))}
      </span>
    </div>
  );
};

const Op: React.FC<{t: number; at: number; ch: string}> = ({t, at, ch}) => {
  const a = eOutBack(prog(t, at, 0.3), 2);
  return (
    <span style={{fontFamily: FONT_LAT, fontWeight: 900, fontSize: 72, color: C.black, width: 56, textAlign: 'center', opacity: clamp01(a * 2), transform: `scale(${a})`}}>
      {ch}
    </span>
  );
};

export const S7Delta: React.FC<{t: number}> = ({t}) => {
  if (t < 29.6 || t > 35.05) return null;
  const disc = eOutCubic(prog(t, CUE.deltaWord, 0.24));
  const ring = prog(t, CUE.deltaWord, 0.7);
  const sh = shake(t, CUE.deltaWord + 0.04, 12, 0.3);
  const ctrl = eOutBack(prog(t, CUE.control, 0.4), 1.8);
  const bar = (i: number) => eOutCubic(prog(t, 32.45 + i * 0.07, 0.4));
  const last = HIST.length - 1;
  const barX = (i: number) => 195 + i * 114;

  return (
    <AbsoluteFill style={{transform: `translate(${sh.x}px, ${sh.y}px)`}}>
      {/* Δ */}
      {t >= CUE.deltaWord - 0.02 && (
        <>
          <div
            style={{
              position: 'absolute',
              left: 540 - 112,
              top: 318,
              width: 224,
              height: 224,
              borderRadius: '50%',
              border: `5px solid ${C.blue}`,
              transform: `scale(${1 + ring * 0.55})`,
              opacity: 1 - ring,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 540 - 112,
              top: 318,
              width: 224,
              height: 224,
              borderRadius: '50%',
              background: C.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.white,
              fontFamily: FONT_LAT,
              fontWeight: 900,
              fontSize: 150,
              lineHeight: 1,
              boxShadow: '0 22px 50px rgba(1,84,253,0.35)',
              transform: `scale(${1.8 - 0.8 * disc})`,
              opacity: clamp01(disc * 2),
              paddingBottom: 12,
              boxSizing: 'border-box',
            }}
          >
            Δ
          </div>
          <div
            style={{
              position: 'absolute',
              top: 556,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: FONT_LAT,
              fontWeight: 800,
              fontSize: 42,
              letterSpacing: 14,
              color: C.black,
              opacity: eOutCubic(prog(t, CUE.deltaWord + 0.15, 0.3)),
            }}
          >
            DELTA
          </div>
        </>
      )}

      {/* ASK − BID = Δ */}
      <div style={{position: 'absolute', top: 650, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', direction: 'ltr'}}>
        <Card t={t} at={CUE.deltaDiff} label="ASK" ar="شراء" value={SUM_ASK} variant="ask" width={262} />
        <Op t={t} at={31.2} ch="−" />
        <Card t={t} at={31.32} label="BID" ar="بيع" value={SUM_BID} variant="bid" width={262} />
        <Op t={t} at={31.68} ch="=" />
        <Card t={t} at={31.8} label="Δ" ar="دلتا" value={DELTA} prefix="+" variant="delta" width={282} />
      </div>

      {/* delta per candle → who is in control */}
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <line x1={150} x2={930} y1={ZERO_Y} y2={ZERO_Y} stroke={C.ink(0.25)} strokeWidth={3} opacity={bar(0)} />
        {HIST.map((v, i) => {
          const h = (Math.abs(v) / DELTA) * MAX_H * bar(i);
          const up = v >= 0;
          return (
            <rect
              key={i}
              x={barX(i) - 39}
              y={up ? ZERO_Y - h : ZERO_Y}
              width={78}
              height={Math.max(0.01, h)}
              rx={10}
              fill={up ? C.blue : C.black}
              opacity={i === last ? 1 : 0.85}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: barX(last) - 90,
          width: 180,
          top: ZERO_Y - MAX_H - 58,
          textAlign: 'center',
          fontFamily: FONT_MONO,
          fontWeight: 800,
          fontSize: 34,
          color: C.blue,
          opacity: bar(last),
        }}
      >
        +{fmtInt(DELTA)}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 960,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 26px',
          borderRadius: 999,
          background: C.black,
          color: C.white,
          direction: 'rtl',
          fontFamily: FONT_AR,
          fontWeight: 900,
          fontSize: 40,
          opacity: clamp01(ctrl * 1.5),
          transform: `scale(${0.7 + 0.3 * ctrl})`,
          transformOrigin: 'left center',
          boxShadow: '0 14px 30px rgba(0,0,0,0.2)',
        }}
      >
        <ArrowIcon up size={36} color={C.blue} />
        المشترون يسيطرون
      </div>
    </AbsoluteFill>
  );
};
