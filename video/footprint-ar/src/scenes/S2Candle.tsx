import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT_AR, FONT_MONO} from '../theme';
import {CUE} from '../timeline';
import {clamp01, eInCubic, eInOutCubic, eOutBack, eOutCubic, lerp, prog, spr} from '../anim';

// 4.06 – 8.72s  "الشمعة تخبرك أين تحرّك السعر… لكنها لا تخبرك مَن حرّكه."
const LOW = 4517.75;
const HIGH = 4520.0;
const OPEN = 4518.0;
const CLOSE = 4519.75;
const py = (p: number) => 1060 - (p - LOW) * 262.2;
const CX = 420;
const BODY_W = 176;
const AXIS_X = 700;

const priceAt = (t: number) => {
  if (t < 5.06) return OPEN;
  if (t < 5.36) return lerp(OPEN, LOW, eInOutCubic(prog(t, 5.06, 0.3)));
  if (t < 6.0) return lerp(LOW, HIGH, eInOutCubic(prog(t, 5.36, 0.64)));
  return lerp(HIGH, CLOSE, eOutCubic(prog(t, 6.0, 0.25)));
};

const Tag: React.FC<{label: string; y: number; t: number; at: number; blue?: boolean; out: number; toX: number}> = ({label, y, t, at, blue, out, toX}) => {
  const a = eOutBack(prog(t, at, 0.35), 1.6);
  return (
    <div style={{position: 'absolute', right: 1080 - toX, top: y - 27, display: 'flex', alignItems: 'center', opacity: clamp01(a * 1.5) * (1 - out), transform: `translateX(${(1 - a) * -40}px)`}}>
      <div
        style={{
          fontFamily: FONT_AR,
          fontWeight: 800,
          fontSize: 32,
          padding: '4px 18px',
          borderRadius: 12,
          background: blue ? C.blue : C.white,
          color: blue ? C.white : C.black,
          border: `3px solid ${blue ? C.blue : C.black}`,
          direction: 'rtl',
        }}
      >
        {label}
      </div>
      <div style={{width: (toX - 300) * a, height: 3, background: blue ? C.blue : C.black}} />
    </div>
  );
};

export const S2Candle: React.FC<{t: number}> = ({t}) => {
  if (t < 3.95 || t > 8.8) return null;
  const p = priceAt(t);
  const lo = t < 5.36 ? Math.min(OPEN, p) : LOW;
  const hi = t < 6.0 ? Math.max(OPEN, p) : HIGH;
  const bodyTop = py(Math.max(OPEN, p));
  const bodyBot = py(Math.min(OPEN, p));
  const bull = p >= OPEN;

  const enter = spr(t, 4.06, {stiffness: 150, damping: 13});
  const zoomOut = eInCubic(prog(t, 8.42, 0.3));
  const annotOut = eOutCubic(prog(t, 6.55, 0.35));
  const mystery = eOutBack(prog(t, 6.62, 0.45), 2);
  const pulse = 1 + 0.05 * Math.sin(Math.max(0, t - 6.62) * 10);
  const who = (d: number) => eOutBack(prog(t, CUE.whoMoved + d, 0.4), 1.8);
  const ticks = [];
  for (let v = LOW; v <= HIGH + 1e-6; v += 0.25) ticks.push(v);
  const axisIn = eOutCubic(prog(t, 4.3, 0.5));

  return (
    <AbsoluteFill
      style={{
        transformOrigin: `${CX}px 760px`,
        transform: `scale(${(0.55 + 0.45 * enter) * (1 + zoomOut * 3.2)})`,
        opacity: 1 - zoomOut,
        filter: zoomOut > 0 ? `blur(${zoomOut * 14}px)` : undefined,
      }}
    >
      {/* price axis */}
      <svg width={1080} height={1920} style={{position: 'absolute', opacity: axisIn * (1 - annotOut * 0.85)}}>
        <line x1={AXIS_X} y1={py(HIGH) - 30} x2={AXIS_X} y2={py(LOW) + 30} stroke={C.ink(0.25)} strokeWidth={3} />
        {ticks.map((v) => (
          <g key={v}>
            <line x1={AXIS_X} x2={AXIS_X + 14} y1={py(v)} y2={py(v)} stroke={C.ink(0.3)} strokeWidth={3} />
            <text x={AXIS_X + 26} y={py(v) + 10} fontFamily={FONT_MONO} fontWeight={600} fontSize={28} fill={C.ink(0.5)}>
              {v.toFixed(2)}
            </text>
          </g>
        ))}
      </svg>

      {/* live price line + tag */}
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <line x1={CX} x2={AXIS_X} y1={py(p)} y2={py(p)} stroke={C.blue} strokeWidth={3} strokeDasharray="10 10" opacity={0.55 * (1 - annotOut)} />
        {/* wick */}
        <line x1={CX} x2={CX} y1={py(hi) - 2} y2={py(lo) + 2} stroke={C.black} strokeWidth={9} strokeLinecap="round" />
        {/* body */}
        <rect
          x={CX - BODY_W / 2}
          y={bodyTop}
          width={BODY_W}
          height={Math.max(8, bodyBot - bodyTop)}
          rx={14}
          fill={bull ? C.blue : C.black}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: AXIS_X + 6,
          top: py(p) - 28,
          height: 56,
          padding: '0 18px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 12,
          background: C.blue,
          color: C.white,
          fontFamily: FONT_MONO,
          fontWeight: 800,
          fontSize: 34,
          boxShadow: '0 10px 24px rgba(1,84,253,0.3)',
          opacity: axisIn,
        }}
      >
        {(Math.round(p * 4) / 4).toFixed(2)}
      </div>

      {/* OHLC annotations */}
      <Tag label="الأعلى" y={py(HIGH)} t={t} at={6.0} out={annotOut} toX={CX - 8} />
      <Tag label="الإغلاق" y={py(CLOSE) + 22} t={t} at={6.12} blue out={annotOut} toX={CX - BODY_W / 2 - 4} />
      <Tag label="الافتتاح" y={py(OPEN) - 20} t={t} at={6.24} out={annotOut} toX={CX - BODY_W / 2 - 4} />
      <Tag label="الأدنى" y={py(LOW) + 6} t={t} at={6.36} out={annotOut} toX={CX - 8} />

      {/* … but not WHO moved it */}
      <div
        style={{
          position: 'absolute',
          left: CX - BODY_W / 2,
          width: BODY_W,
          top: bodyTop,
          height: bodyBot - bodyTop,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_AR,
          fontWeight: 900,
          fontSize: 210,
          color: C.white,
          opacity: clamp01(mystery * 1.4),
          transform: `scale(${mystery * pulse})`,
        }}
      >
        ؟
      </div>
      {[
        {label: 'مشترون؟', x: 560, y: 600, blue: true, d: 0},
        {label: 'بائعون؟', x: 60, y: 820, blue: false, d: 0.12},
      ].map((c) => {
        const a = who(c.d);
        return (
          <div
            key={c.label}
            style={{
              position: 'absolute',
              left: c.x,
              top: c.y,
              padding: '10px 30px',
              borderRadius: 999,
              background: c.blue ? C.blue : C.black,
              color: C.white,
              fontFamily: FONT_AR,
              fontWeight: 900,
              fontSize: 50,
              direction: 'rtl',
              opacity: clamp01(a * 1.5),
              transform: `translateX(${(1 - a) * (c.blue ? 120 : -120)}px) rotate(${c.blue ? -4 : 4}deg) scale(${0.7 + 0.3 * a})`,
              boxShadow: c.blue ? '0 14px 30px rgba(1,84,253,0.3)' : '0 14px 30px rgba(0,0,0,0.25)',
            }}
          >
            {c.label}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
