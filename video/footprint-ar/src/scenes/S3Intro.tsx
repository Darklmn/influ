import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT_AR, FONT_LAT} from '../theme';
import {CUE} from '../timeline';
import {clamp01, eInCubic, eOutBack, eOutCubic, prog, rand, shake, spr} from '../anim';

// 8.72 – 12.67s  "وهنا يأتي دور الفوت برينت، أقوى أدوات الأوردر فلو."
// (the spinning 3D candle underneath is CandleSlices3D, mounted in Main)
const shineText = (t: number, at: number, base: string): React.CSSProperties => {
  const x = 120 - 140 * eOutCubic(prog(t, at, 0.7));
  return {
    backgroundImage: `linear-gradient(100deg, ${base} 0%, ${base} 42%, #BFD2FF 50%, ${base} 58%, ${base} 100%)`,
    backgroundSize: '300% 100%',
    backgroundPosition: `${x}% 0`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
};

export const S3Intro: React.FC<{t: number}> = ({t}) => {
  if (t < 8.6 || t > 12.95) return null;
  const slam = eOutCubic(prog(t, CUE.footprintWord, 0.22));
  const sh = shake(t, CUE.footprintWord + 0.05, 12, 0.3);
  const exit = eInCubic(prog(t, 12.45, 0.4));
  const pill = spr(t, CUE.orderFlowWord, {stiffness: 200, damping: 14});
  const intro = eOutCubic(prog(t, 8.72, 0.4));
  const letters = 'FOOTPRINT'.split('');
  const flow = clamp01(prog(t, 11.7, 0.3));

  return (
    <AbsoluteFill style={{transform: `translate(${sh.x}px, ${sh.y - exit * 160}px)`, opacity: 1 - exit}}>
      {/* soft spotlight behind the 3D candle */}
      <div
        style={{
          position: 'absolute',
          left: 540 - 380,
          top: 1050 - 380,
          width: 760,
          height: 760,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(1,84,253,0.16) 0%, rgba(1,84,253,0) 70%)',
          opacity: intro,
        }}
      />
      {t >= CUE.footprintWord - 0.02 && (
        <div
          style={{
            position: 'absolute',
            top: 296,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${1.5 - 0.5 * slam})`,
            opacity: clamp01(slam * 2),
            filter: slam < 1 ? `blur(${(1 - slam) * 10}px)` : undefined,
          }}
        >
          <div
            style={{
              fontFamily: FONT_AR,
              fontWeight: 900,
              fontSize: 132,
              lineHeight: 1.15,
              direction: 'rtl',
              ...shineText(t, CUE.footprintWord + 0.25, C.blue),
            }}
          >
            الفوت برينت
          </div>
          <div style={{display: 'flex', marginTop: -6}}>
            {letters.map((ch, i) => {
              const a = eOutBack(prog(t, CUE.footprintWord + 0.06 + i * 0.03, 0.3), 2);
              return (
                <span
                  key={i}
                  style={{
                    fontFamily: FONT_LAT,
                    fontWeight: 900,
                    fontSize: 104,
                    letterSpacing: 6,
                    color: C.black,
                    display: 'inline-block',
                    opacity: clamp01(a * 2),
                    transform: `translateY(${(1 - a) * 50}px)`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ORDER FLOW badge + flowing orders */}
      <div
        style={{
          position: 'absolute',
          top: 612,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: clamp01(pill * 1.5),
          transform: `scale(${0.6 + 0.4 * pill})`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '12px 34px',
            borderRadius: 999,
            background: C.blue,
            boxShadow: '0 16px 36px rgba(1,84,253,0.32)',
          }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44">
            <path d="M4 30 L16 18 L24 26 L40 10" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 10 H40 V20" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{fontFamily: FONT_LAT, fontWeight: 800, fontSize: 46, color: C.white, letterSpacing: 5}}>ORDER FLOW</span>
        </div>
      </div>
      <svg width={1080} height={80} style={{position: 'absolute', top: 700, left: 0, opacity: flow}}>
        <line x1={170} x2={910} y1={40} y2={40} stroke={C.blueA(0.18)} strokeWidth={4} strokeLinecap="round" />
        {Array.from({length: 16}).map((_, i) => {
          const sp = 260 + rand(i) * 340;
          const x = 170 + ((rand(i + 50) * 740 + (t - 11.7) * sp) % 740);
          const big = rand(i + 9) > 0.7;
          return <circle key={i} cx={x} cy={40} r={big ? 11 : 6} fill={big ? C.blue : C.black} opacity={big ? 0.9 : 0.6} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};
