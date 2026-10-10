import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT_AR, FONT_LAT} from '../theme';
import {CUE} from '../timeline';
import cues from '../sfxCues.json';
import {clamp01, eInCubic, eOutBack, eOutCubic, lerp, prog, rand, shake, spr} from '../anim';
import {CheckIcon, GiftIcon, LockIcon, PointerIcon} from '../components/Icons';
import {LogoSvg} from '../components/LogoSvg';
import {Logo3D} from '../components/three/Logo3D';

// 35.0 – 42.5s  "توقّف عن التخمين، واقرأ السوق كالمحترفين. احصل على أدواتك المجانية الآن من tradingevolution.site"
const URL_TXT = cues.urlTyping.chars;
const TAP = 41.3;

export const S8Cta: React.FC<{t: number}> = ({t}) => {
  if (t < 34.95) return null;

  // STOP stamp
  const stamp = eOutCubic(prog(t, CUE.stopGuess, 0.16));
  const stampOut = eInCubic(prog(t, 36.0, 0.2));
  const sh = shake(t, CUE.stopGuess + 0.08, 22, 0.4);

  // recap checklist
  const items = [
    {ar: 'الفوت برينت', en: 'FOOTPRINT', at: 36.3},
    {ar: 'الإمبالانس', en: 'IMBALANCE', at: 36.6},
    {ar: 'الدلتا', en: 'DELTA', at: 36.9},
  ];
  const recapOut = eInCubic(prog(t, 37.55, 0.28));

  // final CTA
  const wave = prog(t, CUE.freeTools, 0.8);
  const free = spr(t, 38.55, {stiffness: 190, damping: 13});
  const urlIn = spr(t, 39.7, {stiffness: 170, damping: 16});
  const typed = Math.max(0, Math.min(URL_TXT.length, Math.floor((t - cues.urlTyping.start) / cues.urlTyping.step) + 1));
  const caret = Math.floor(t * 3) % 2 === 0 || (t > cues.urlTyping.start && typed < URL_TXT.length);
  const tap = prog(t, TAP - 0.45, 0.45);
  const pressed = t > TAP && t < TAP + 0.18;
  const filled = eOutCubic(prog(t, TAP, 0.25));
  const ripple = prog(t, TAP, 0.6);

  return (
    <AbsoluteFill>
      {/* ---------- STOP guessing ---------- */}
      {t < 36.25 && (
        <AbsoluteFill style={{transform: `translate(${sh.x}px, ${sh.y}px)`}}>
          {Array.from({length: 7}).map((_, i) => {
            const a = 1 - eOutCubic(prog(t, CUE.stopGuess + 0.05 + i * 0.03, 0.35));
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 90 + rand(i * 3) * 820,
                  top: 380 + rand(i * 7 + 1) * 820,
                  fontFamily: FONT_AR,
                  fontWeight: 900,
                  fontSize: 90 + rand(i) * 110,
                  color: i % 2 ? C.blue : C.black,
                  opacity: a * 0.85,
                  transform: `scale(${0.4 + 0.6 * a}) rotate(${(rand(i + 2) - 0.5) * 50}deg)`,
                }}
              >
                ؟
              </div>
            );
          })}
          <div
            style={{
              position: 'absolute',
              left: 90,
              right: 90,
              top: 660,
              height: 230,
              borderRadius: 26,
              background: C.black,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(-4deg) scale(${(2.2 - 1.2 * stamp) * (1 - 0.4 * stampOut)})`,
              opacity: clamp01(stamp * 3) * (1 - stampOut),
              boxShadow: '0 30px 70px rgba(0,0,0,0.35)',
            }}
          >
            <span style={{fontFamily: FONT_AR, fontWeight: 900, fontSize: 96, color: C.white, direction: 'rtl'}}>
              توقّف عن <span style={{color: '#8FB0FF'}}>التخمين</span>
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* ---------- recap: read the market like a pro ---------- */}
      {t > 36.2 && t < 37.9 && (
        <AbsoluteFill style={{opacity: 1 - recapOut, transform: `translateY(${-140 * recapOut}px)`}}>
          {items.map((it, i) => {
            const a = eOutBack(prog(t, it.at, 0.38), 1.6);
            return (
              <div
                key={it.en}
                style={{
                  position: 'absolute',
                  left: 170,
                  right: 170,
                  top: 520 + i * 150,
                  height: 118,
                  borderRadius: 28,
                  background: C.white,
                  border: `4px solid ${C.blue}`,
                  boxShadow: '0 16px 36px rgba(1,84,253,0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 30px',
                  direction: 'rtl',
                  opacity: clamp01(a * 1.6),
                  transform: `translateX(${(1 - a) * 260}px)`,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
                  <CheckIcon size={66} p={eOutCubic(prog(t, it.at + 0.12, 0.3))} />
                  <span style={{fontFamily: FONT_AR, fontWeight: 900, fontSize: 54, color: C.black}}>{it.ar}</span>
                </div>
                <span style={{fontFamily: FONT_LAT, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: C.blue}}>{it.en}</span>
              </div>
            );
          })}
        </AbsoluteFill>
      )}

      {/* ---------- FREE TOOLS + URL ---------- */}
      {t > CUE.freeTools - 0.2 && (
        <>
          {/* shockwave */}
          <div
            style={{
              position: 'absolute',
              left: 540 - 300,
              top: 470 - 300,
              width: 600,
              height: 600,
              borderRadius: '50%',
              border: `${10 * (1 - wave)}px solid ${C.blue}`,
              transform: `scale(${0.3 + wave * 1.6})`,
              opacity: 1 - wave,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 540 - 360,
              top: 470 - 360,
              width: 720,
              height: 720,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(1,84,253,0.14) 0%, rgba(1,84,253,0) 68%)',
            }}
          />
          <Logo3D t={t} start={CUE.freeTools} widthPx={470} centerY={455} />
          <div style={{position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <LogoSvg id="cta-word" show="wordmark" width={560} build={prog(t, 38.15, 1.0)} shine={prog(t, 39.3, 0.9)} />
          </div>

          {/* free tools badge */}
          <div
            style={{
              position: 'absolute',
              top: 790,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              opacity: clamp01(free * 1.5),
              transform: `scale(${0.5 + 0.5 * free}) rotate(${(1 - free) * -8}deg)`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: '14px 40px',
                borderRadius: 999,
                background: C.blue,
                boxShadow: '0 20px 44px rgba(1,84,253,0.4)',
                direction: 'rtl',
              }}
            >
              <GiftIcon size={58} />
              <span style={{fontFamily: FONT_AR, fontWeight: 900, fontSize: 58, color: C.white}}>أدوات مجانية</span>
              <span
                style={{
                  fontFamily: FONT_LAT,
                  fontWeight: 900,
                  fontSize: 28,
                  color: C.blue,
                  background: C.white,
                  borderRadius: 10,
                  padding: '2px 12px',
                  letterSpacing: 2,
                }}
              >
                FREE
              </span>
            </div>
          </div>

          {/* URL bar */}
          {t > 39.6 && (
            <div
              style={{
                position: 'absolute',
                left: 100,
                right: 100,
                top: 950,
                height: 128,
                opacity: clamp01(urlIn * 1.5),
                transform: `translateY(${(1 - urlIn) * 60}px) scale(${pressed ? 0.96 : 1})`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 999,
                  background: filled > 0 ? `rgba(1,84,253,${filled})` : C.white,
                  border: `5px solid ${C.blue}`,
                  boxShadow: '0 18px 44px rgba(1,84,253,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 34px',
                  gap: 16,
                  direction: 'ltr',
                  overflow: 'hidden',
                }}
              >
                <LockIcon size={38} color={filled > 0.5 ? C.white : C.blue} />
                <span style={{fontFamily: FONT_LAT, fontWeight: 700, fontSize: 50, color: filled > 0.5 ? C.white : C.black, whiteSpace: 'nowrap'}}>
                  {URL_TXT.slice(0, Math.min(typed, 16))}
                  <span style={{color: filled > 0.5 ? C.white : C.blue}}>{URL_TXT.slice(16, typed)}</span>
                  <span style={{opacity: caret && filled < 0.5 ? 1 : 0, color: C.blue, marginLeft: 2}}>|</span>
                </span>
                <svg width="46" height="46" viewBox="0 0 46 46" style={{marginLeft: 'auto', opacity: filled}}>
                  <path d="M12 34 L34 12 M16 12 H34 V30" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {ripple > 0 && ripple < 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 640 - 100,
                    top: 64 - 100,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.55)',
                    transform: `scale(${0.2 + ripple * 3})`,
                    opacity: 1 - ripple,
                  }}
                />
              )}
            </div>
          )}
          {/* pointer tap */}
          {t > TAP - 0.5 && (
            <div
              style={{
                position: 'absolute',
                left: lerp(1000, 700, eOutCubic(tap)),
                top: lerp(1400, 1010, eOutCubic(tap)),
                transform: `scale(${pressed ? 0.85 : 1})`,
                opacity: clamp01(tap * 3) * (1 - prog(t, 42.1, 0.3)),
              }}
            >
              <PointerIcon size={96} />
            </div>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};
