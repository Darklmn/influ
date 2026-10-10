import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT_AR, FONT_LAT, FONT_MONO} from '../theme';
import {CUE} from '../timeline';
import cues from '../sfxCues.json';
import {
  CLOSE_ROW,
  IMB_ROWS,
  LAD,
  LAD_BOTTOM,
  MAX_ASK,
  MAX_BID,
  OPEN_ROW,
  ROWS,
  fmtPrice,
  rowCY,
  rowY,
} from '../data';
import {clamp01, eInOutCubic, eOutBack, eOutCubic, lerp, prog, spr} from '../anim';
import {ArrowIcon, BankIcon} from '../components/Icons';

// 14.5 – 29.8s — the 2D footprint ladder that the 3D candle turns into.
//   S4 "ويُظهر حجم التداول عند كل مستوى سعري"   numbers fill row by row (synced ticks)
//   S5 "على اليسار البائعون عند البيد / على اليمين المشترون عند الآسك"
//   S6 "يتفوّق طرف على الآخر بقوة … الإمبالانس … الأموال الكبيرة"

const RT = cues.rowTicks;
const DIAG_BID_ROW = 3; // 88 @ 4519.25
const DIAG_ASK_ROW = 2; // 412 @ 4519.50
const BID_CX = LAD.bidX + LAD.cellW / 2;
const ASK_CX = LAD.askX + LAD.cellW / 2;

const Header: React.FC<{x: number; latin: string; ar: string; color: string; a: number; up: boolean; dim: number}> = ({x, latin, ar, color, a, up, dim}) => (
  <div
    style={{
      position: 'absolute',
      left: x - 150,
      width: 300,
      top: 282,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: clamp01(a * 1.6) * dim,
      transform: `translateY(${(1 - a) * 30}px) scale(${0.8 + 0.2 * a})`,
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <ArrowIcon up={up} size={38} color={color} />
      <span style={{fontFamily: FONT_LAT, fontWeight: 900, fontSize: 48, color, letterSpacing: 3, lineHeight: 1}}>{latin}</span>
    </div>
    <span style={{fontFamily: FONT_AR, fontWeight: 800, fontSize: 36, color: C.black, lineHeight: 1.3, direction: 'rtl'}}>{ar}</span>
  </div>
);

export const FootprintScene: React.FC<{t: number}> = ({t}) => {
  if (t < 14.4 || t > 29.9) return null;
  const appear = eOutCubic(prog(t, 14.5, 0.45));

  // ---- S4
  const chip = spr(t, 13.45, {stiffness: 170, damping: 16});
  const chipOut = eOutCubic(prog(t, 18.0, 0.3));
  const candleCol = eOutCubic(prog(t, 15.0, 0.45));
  const priceIn = (i: number) => eOutCubic(prog(t, 14.85 + i * 0.03, 0.35));
  const priceFlash = (i: number) => {
    const s = 17.3 + i * 0.05;
    return clamp01(1 - Math.abs(t - s - 0.12) / 0.22);
  };
  const rowNum = (i: number) => prog(t, RT.start + i * RT.step, 0.28);

  // ---- S5 columns
  const bidA = eOutBack(prog(t, CUE.bidSide, 0.4), 1.6);
  const askA = eOutBack(prog(t, CUE.askSide, 0.4), 1.6);
  const bidFrame = eOutCubic(prog(t, CUE.bidSide, 0.5));
  const askFrame = eOutCubic(prog(t, CUE.askSide, 0.5));
  const bothBack = eOutCubic(prog(t, 22.3, 0.4));
  let bidDim = 1;
  let askDim = 1;
  if (t >= CUE.bidSide && t < CUE.askSide) askDim = lerp(1, 0.4, eOutCubic(prog(t, CUE.bidSide, 0.3)));
  if (t >= CUE.askSide) {
    askDim = lerp(0.4, 1, eOutCubic(prog(t, CUE.askSide, 0.3)));
    bidDim = lerp(lerp(1, 0.5, eOutCubic(prog(t, CUE.askSide, 0.3))), 1, bothBack);
  }

  // ---- S6 imbalance
  const focus = eInOutCubic(prog(t, CUE.dominate, 0.5));
  const unfocus = eInOutCubic(prog(t, 28.3, 0.6));
  const zoom = 1 + 0.12 * focus * (1 - unfocus);
  const diag = eOutCubic(prog(t, 24.0, 0.42));
  const ratio = eOutBack(prog(t, 24.6, 0.4), 1.8);
  const imb = eOutBack(prog(t, CUE.imbalanceWord, 0.35), 2);
  const stack = (k: number) => (k === 0 ? imb : eOutBack(prog(t, k === 1 ? 27.15 : 27.45, 0.35), 2));
  const bracket = eOutCubic(prog(t, 27.6, 0.35));
  const money = eOutBack(prog(t, CUE.bigMoney, 0.5), 1.4);
  const diagOut = eOutCubic(prog(t, 26.95, 0.3));
  const ratioSwap = eOutCubic(prog(t, CUE.imbalanceWord, 0.25));
  const glow = 0.5 + 0.5 * Math.sin((t - CUE.imbalanceWord) * 7);

  const rowDim = (i: number) => {
    if (t < CUE.dominate) return 1;
    const keep = i === DIAG_ASK_ROW || i === DIAG_BID_ROW || (t > 27.0 && IMB_ROWS.includes(i));
    const d = keep ? 1 : 0.22;
    return lerp(1, d, focus) * (1 - unfocus) + unfocus * (IMB_ROWS.includes(i) ? 1 : 0.55);
  };

  const originY = rowCY(2.5);
  const askCellFill = (i: number) => {
    const base = 0.06 + 0.34 * (ROWS[i].ask / MAX_ASK);
    const s = IMB_ROWS.includes(i) ? stack(IMB_ROWS.indexOf(i)) : 0;
    return {s, bg: s > 0 ? `rgba(1,84,253,${lerp(base, 1, clamp01(s))})` : `rgba(1,84,253,${base})`};
  };

  return (
    <AbsoluteFill style={{opacity: appear}}>
      {/* S4 label */}
      <div
        style={{
          position: 'absolute',
          top: 296,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: clamp01(chip * 1.4) * (1 - chipOut),
          transform: `translateY(${(1 - chip) * 20 - chipOut * 20}px)`,
        }}
      >
        <div
          style={{
            direction: 'rtl',
            padding: '8px 30px',
            borderRadius: 999,
            border: `3px solid ${C.blue}`,
            background: C.white,
            color: C.blue,
            fontFamily: FONT_AR,
            fontWeight: 900,
            fontSize: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="17" cy="17" r="11" fill="none" stroke={C.blue} strokeWidth="5" />
            <path d="M25 25 L35 35" stroke={C.blue} strokeWidth="6" strokeLinecap="round" />
          </svg>
          <span>من داخل الشمعة</span>
        </div>
      </div>

      {/* S5 headers */}
      {t >= CUE.bidSide - 0.05 && <Header x={BID_CX} latin="BID" ar="البائعون" color={C.black} a={bidA} up={false} dim={0.4 + 0.6 * bidDim} />}
      {t >= CUE.askSide - 0.05 && <Header x={ASK_CX} latin="ASK" ar="المشترون" color={C.blue} a={askA} up dim={0.4 + 0.6 * askDim} />}

      {/* ladder (zooms on the imbalance in S6) */}
      <AbsoluteFill style={{transformOrigin: `470px ${originY}px`, transform: `scale(${zoom})`}}>
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          {/* mini candle */}
          <g opacity={candleCol}>
            <line
              x1={LAD.candleX}
              x2={LAD.candleX}
              y1={lerp(rowCY(4.5), rowCY(0), candleCol)}
              y2={lerp(rowCY(4.5), rowCY(9), candleCol)}
              stroke={C.black}
              strokeWidth={6}
              strokeLinecap="round"
            />
            <rect
              x={LAD.candleX - 17}
              y={lerp(rowCY(4.5), rowY(CLOSE_ROW), candleCol)}
              width={34}
              height={(rowY(OPEN_ROW) + LAD.rowH - rowY(CLOSE_ROW)) * candleCol}
              rx={8}
              fill={C.blue}
            />
          </g>
          {/* column frames */}
          {bidFrame > 0 && (
            <rect
              x={LAD.bidX - 9}
              y={LAD.top - 9}
              width={LAD.cellW + 18}
              height={LAD_BOTTOM - LAD.top + 18}
              rx={22}
              fill="none"
              stroke={C.black}
              strokeWidth={5}
              strokeDasharray={2400}
              strokeDashoffset={2400 * (1 - bidFrame)}
              opacity={(0.4 + 0.6 * bidDim) * (1 - focus)}
            />
          )}
          {askFrame > 0 && (
            <rect
              x={LAD.askX - 9}
              y={LAD.top - 9}
              width={LAD.cellW + 18}
              height={LAD_BOTTOM - LAD.top + 18}
              rx={22}
              fill="none"
              stroke={C.blue}
              strokeWidth={5}
              strokeDasharray={2400}
              strokeDashoffset={2400 * (1 - askFrame)}
              opacity={(0.4 + 0.6 * askDim) * (1 - focus)}
            />
          )}
        </svg>

        {ROWS.map((r, i) => {
          const n = rowNum(i);
          const pop = eOutBack(clamp01(n * 1.6), 2.2);
          const dimR = rowDim(i);
          const ask = askCellFill(i);
          const isDiagBid = i === DIAG_BID_ROW;
          const isDiagAsk = i === DIAG_ASK_ROW;
          const outlineBid = isDiagBid ? focus * (1 - diagOut) : 0;
          const outlineAsk = isDiagAsk ? focus * (1 - clamp01(ask.s)) : 0;
          const glowOn = IMB_ROWS.includes(i) && ask.s > 0;
          return (
            <React.Fragment key={r.price}>
              {/* bid cell */}
              <div
                style={{
                  position: 'absolute',
                  left: LAD.bidX,
                  top: rowY(i),
                  width: LAD.cellW,
                  height: LAD.rowH,
                  borderRadius: 14,
                  background: `rgba(3,3,2,${0.035 + 0.2 * (r.bid / MAX_BID)})`,
                  border: `${outlineBid > 0.01 ? 5 : 2}px solid ${outlineBid > 0.01 ? C.black : C.ink(0.08)}`,
                  opacity: bidDim * dimR,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontWeight: 800,
                    fontSize: 40,
                    color: C.black,
                    opacity: clamp01(n * 2),
                    transform: `scale(${0.6 + 0.4 * pop})`,
                  }}
                >
                  {Math.round(r.bid * eOutCubic(clamp01(n)))}
                </span>
              </div>
              {/* ask cell */}
              <div
                style={{
                  position: 'absolute',
                  left: LAD.askX,
                  top: rowY(i),
                  width: LAD.cellW,
                  height: LAD.rowH,
                  borderRadius: 14,
                  background: ask.bg,
                  border: `${outlineAsk > 0.01 ? 5 : 2}px solid ${outlineAsk > 0.01 ? C.blue : C.blueA(0.16)}`,
                  opacity: askDim * dimR,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  transform: `scale(${1 + 0.06 * Math.sin(Math.PI * clamp01(ask.s))})`,
                  boxShadow: glowOn ? `0 0 ${24 + 26 * glow}px rgba(1,84,253,${0.35 + 0.25 * glow})` : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontWeight: 800,
                    fontSize: 40,
                    color: ask.s > 0.4 ? C.white : C.blue900,
                    opacity: clamp01(n * 2),
                    transform: `scale(${0.6 + 0.4 * pop})`,
                  }}
                >
                  {Math.round(r.ask * eOutCubic(clamp01(n)))}
                </span>
              </div>
              {/* price */}
              <div
                style={{
                  position: 'absolute',
                  left: LAD.priceX,
                  top: rowY(i),
                  height: LAD.rowH,
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: FONT_MONO,
                  fontWeight: 600,
                  fontSize: 31,
                  color: priceFlash(i) > 0.05 ? C.blue : C.ink(0.6),
                  opacity: priceIn(i) * (0.35 + 0.65 * dimR) * (IMB_ROWS.includes(i) ? 1 - bracket : 1),
                  transform: `translateX(${(1 - priceIn(i)) * 30}px) scale(${1 + 0.18 * priceFlash(i)})`,
                  transformOrigin: 'left center',
                }}
              >
                {fmtPrice(r.price)}
              </div>
            </React.Fragment>
          );
        })}

        {/* diagonal comparison: Ask(P) vs Bid(P − 1 tick) */}
        {t > 23.9 && diagOut < 1 && (
          <svg width={1080} height={1920} style={{position: 'absolute', opacity: 1 - diagOut}}>
            <defs>
              <marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 Z" fill={C.blue} />
              </marker>
            </defs>
            <line
              x1={BID_CX + 60}
              y1={rowCY(DIAG_BID_ROW)}
              x2={lerp(BID_CX + 60, ASK_CX - 70, diag)}
              y2={lerp(rowCY(DIAG_BID_ROW), rowCY(DIAG_ASK_ROW), diag)}
              stroke={C.blue}
              strokeWidth={7}
              strokeLinecap="round"
              markerEnd={diag > 0.9 ? 'url(#ah)' : undefined}
            />
          </svg>
        )}
        {/* ratio bubble (callout above the 412 cell) → becomes the IMBALANCE label */}
        {t > 24.5 && (
          <div
            style={{
              position: 'absolute',
              left: ASK_CX - 140,
              width: 280,
              top: rowY(DIAG_ASK_ROW) - 126,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transformOrigin: 'center bottom',
              transform: `scale(${ratio * (1 - 0.15 * bracket)})`,
              opacity: clamp01(ratio * 1.5) * (1 - bracket),
            }}
          >
            <div
              style={{
                padding: '8px 22px',
                borderRadius: 20,
                background: ratioSwap > 0.5 ? C.blue : C.black,
                color: C.white,
                boxShadow: '0 14px 30px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 230,
                height: 98,
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              {ratioSwap <= 0.5 ? (
                <>
                  <span style={{fontFamily: FONT_LAT, fontWeight: 900, fontSize: 50, lineHeight: 1.05}}>×4.7</span>
                  <span style={{fontFamily: FONT_MONO, fontWeight: 600, fontSize: 24, opacity: 0.85}}>412 ÷ 88</span>
                </>
              ) : (
                <>
                  <span style={{fontFamily: FONT_LAT, fontWeight: 900, fontSize: 36, lineHeight: 1.2, letterSpacing: 1}}>IMBALANCE</span>
                  <span style={{fontFamily: FONT_LAT, fontWeight: 700, fontSize: 25, opacity: 0.9}}>×4.7 ≥ ×3</span>
                </>
              )}
            </div>
            <svg width="34" height="16" viewBox="0 0 34 16" style={{marginTop: -1}}>
              <path d="M0 0 H34 L17 16 Z" fill={ratioSwap > 0.5 ? C.blue : C.black} />
            </svg>
          </div>
        )}
        {/* stacked imbalance bracket */}
        {bracket > 0 && (
          <div style={{position: 'absolute', left: LAD.askX + LAD.cellW + 18, top: rowY(2), height: rowY(4) + LAD.rowH - rowY(2), display: 'flex', alignItems: 'center', opacity: bracket}}>
            <svg width={34} height={rowY(4) + LAD.rowH - rowY(2)} style={{overflow: 'visible'}}>
              <path
                d={`M4 4 H20 V${rowY(4) + LAD.rowH - rowY(2) - 4} H4`}
                fill="none"
                stroke={C.blue}
                strokeWidth={6}
                strokeLinejoin="round"
                strokeDasharray={600}
                strokeDashoffset={600 * (1 - bracket)}
              />
            </svg>
            <div
              style={{
                marginLeft: 10,
                direction: 'rtl',
                fontFamily: FONT_AR,
                fontWeight: 900,
                fontSize: 33,
                lineHeight: 1.25,
                color: C.blue,
                transform: `translateX(${(1 - bracket) * 20}px)`,
              }}
            >
              إمبالانس
              <br />
              <span style={{color: C.black}}>متتالي</span>
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* big money card */}
      {money > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 150,
            right: 150,
            top: 930,
            height: 200,
            borderRadius: 32,
            background: C.white,
            border: `5px solid ${C.blue}`,
            boxShadow: '0 24px 60px rgba(1,84,253,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 26,
            direction: 'rtl',
            opacity: clamp01(money * 1.6),
            transform: `translateY(${(1 - money) * 80}px) scale(${0.85 + 0.15 * money})`,
          }}
        >
          <BankIcon size={124} p={eOutCubic(prog(t, CUE.bigMoney + 0.1, 0.6))} />
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontFamily: FONT_AR, fontWeight: 900, fontSize: 52, color: C.black, lineHeight: 1.2}}>الأموال الكبيرة</span>
            <span style={{fontFamily: FONT_LAT, fontWeight: 800, fontSize: 30, color: C.blue, letterSpacing: 3, direction: 'ltr', textAlign: 'right'}}>
              BIG MONEY IN ↑
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
