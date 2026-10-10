import React from 'react';
import {AbsoluteFill} from 'remotion';
import {HookCandles3D} from '../components/three/HookCandles3D';
import {C, FONT_AR, FONT_LAT} from '../theme';
import {CUE} from '../timeline';
import {clamp01, eOutBack, eOutCubic, prog, shake, spr} from '../anim';

// 0 – 4.06s  "هل تتداول بالشموع فقط؟ إذن أنت ترى نصف الحقيقة!"
export const S1Hook: React.FC<{t: number}> = ({t}) => {
  if (t > 4.3) return null;
  const sh = shake(t, CUE.halfTruth, 16, 0.3);
  const chip = spr(t, 0.35, {stiffness: 160, damping: 16});
  // "half the truth" split
  const line = eOutCubic(prog(t, CUE.halfTruth - 0.05, 0.22));
  const veil = eOutCubic(prog(t, CUE.halfTruth + 0.05, 0.3));
  const q = eOutBack(prog(t, CUE.halfTruth + 0.12, 0.45), 2);
  const half = eOutBack(prog(t, CUE.halfTruth + 0.02, 0.4), 2.2);
  const qPulse = 1 + Math.sin(Math.max(0, t - CUE.halfTruth) * 9) * 0.03;

  return (
    <AbsoluteFill style={{transform: `translate(${sh.x}px, ${sh.y}px)`}}>
      <HookCandles3D t={t} opacity={1} />

      {/* guide label */}
      <div
        style={{
          position: 'absolute',
          top: 318,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: clamp01(chip * 1.5),
          transform: `translateY(${(1 - chip) * 30}px) scale(${0.9 + 0.1 * chip})`,
        }}
      >
        <div
          style={{
            direction: 'rtl',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '10px 28px',
            borderRadius: 999,
            background: C.blue,
            color: C.white,
            fontFamily: FONT_AR,
            fontWeight: 800,
            fontSize: 36,
            boxShadow: '0 12px 30px rgba(1,84,253,0.25)',
          }}
        >
          <span>دليل الأوردر فلو</span>
          <span style={{fontFamily: FONT_LAT, fontWeight: 700, fontSize: 26, opacity: 0.85, letterSpacing: 2}}>ORDER FLOW</span>
        </div>
      </div>

      {/* right half veiled — you only see half the truth */}
      {t > CUE.halfTruth - 0.1 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 420,
              bottom: 640,
              left: 540,
              right: 0,
              transformOrigin: 'left center',
              transform: `scaleX(${veil})`,
              background: `repeating-linear-gradient(135deg, rgba(255,255,255,0.94) 0 18px, rgba(242,246,255,0.96) 18px 36px)`,
              borderLeft: `6px solid ${C.blue}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 420,
              width: 6,
              height: 860 * line,
              background: C.blue,
              marginLeft: -3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 540,
              right: 0,
              top: 560,
              display: 'flex',
              justifyContent: 'center',
              fontFamily: FONT_AR,
              fontWeight: 900,
              fontSize: 340,
              lineHeight: 1,
              color: C.blue,
              opacity: clamp01(q * 1.4),
              transform: `scale(${q * qPulse}) rotate(${(1 - q) * -20}deg)`,
            }}
          >
            ؟
          </div>
          <div
            style={{
              position: 'absolute',
              left: 540 - 85,
              top: 760,
              width: 170,
              height: 170,
              borderRadius: '50%',
              background: C.black,
              color: C.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT_LAT,
              fontWeight: 900,
              fontSize: 58,
              transform: `scale(${half})`,
              boxShadow: '0 18px 40px rgba(0,0,0,0.25)',
              border: `6px solid ${C.white}`,
            }}
          >
            50%
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
