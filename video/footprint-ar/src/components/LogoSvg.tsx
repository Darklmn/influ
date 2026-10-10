import React from 'react';
import {LOGO} from '../logoPaths';
import {clamp01, eOutBack, eOutCubic} from '../anim';

type Props = {
  /** 0..1 build-in progress (pieces slide in like the logo's slanted bars) */
  build?: number;
  /** 0..1 position of a light sweep across the logo (outside 0..1 = hidden) */
  shine?: number;
  width: number;
  id: string;
  show?: 'full' | 'emblem' | 'wordmark';
  style?: React.CSSProperties;
};

const COL = LOGO.colors;

export const LogoSvg: React.FC<Props> = ({build = 1, shine = -1, width, id, show = 'full', style}) => {
  const [vx, vy, vw, vh] =
    show === 'emblem'
      ? LOGO.emblemBox
      : show === 'wordmark'
        ? [LOGO.viewBox[0], 700, LOGO.viewBox[2], LOGO.viewBox[1] + LOGO.viewBox[3] - 700]
        : LOGO.viewBox;
  const height = (width * vh) / vw;
  const p = (a: number, d: number) => clamp01((build - a) / d);

  const emblem = show !== 'wordmark';
  const words = show !== 'emblem';

  const T = eOutCubic(p(0, 0.35));
  const bars = (['eTop', 'eMid', 'eBot'] as const).map((k, i) => ({k, v: eOutBack(p(0.12 + i * 0.09, 0.35), 1.2)}));
  const letters = [...LOGO.trading, ...LOGO.evolution];
  const sw = eOutCubic(p(0.62, 0.38));
  const swBox = LOGO.swoosh.box;

  const allPaths = (
    <>
      {emblem && Object.values(LOGO.emblem).map((e, i) => <path key={`e${i}`} d={e.d} fillRule="evenodd" />)}
      {words && letters.map((l, i) => <path key={`l${i}`} d={l.d} fillRule="evenodd" />)}
      {words && <path d={LOGO.swoosh.d} />}
    </>
  );

  const shineX = vx - 300 + (vw + 600) * shine;

  return (
    <svg width={width} height={height} viewBox={`${vx} ${vy} ${vw} ${vh}`} style={{overflow: 'visible', ...style}}>
      <defs>
        <clipPath id={`${id}-sw`}>
          <rect x={swBox[0] - 10} y={swBox[1] - 20} width={(swBox[2] + 20) * sw} height={swBox[3] + 40} />
        </clipPath>
        <clipPath id={`${id}-all`}>{allPaths}</clipPath>
        <linearGradient id={`${id}-shine`} gradientUnits="userSpaceOnUse" x1={shineX - 140} y1={vy} x2={shineX + 140} y2={vy + vh}>
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {emblem && (
        <g>
          <path
            d={LOGO.emblem.T.d}
            fill={COL.black}
            fillRule="evenodd"
            opacity={T}
            transform={`translate(${-90 * (1 - T)} 0)`}
          />
          {bars.map(({k, v}) => (
            <path
              key={k}
              d={LOGO.emblem[k].d}
              fill={LOGO.emblem[k].color === 'blue' ? COL.blue : COL.black}
              fillRule="evenodd"
              opacity={clamp01(v * 1.4)}
              transform={`translate(${140 * (1 - v)} 0)`}
            />
          ))}
        </g>
      )}
      {words &&
        letters.map((l, i) => {
          const v = eOutCubic(p(0.3 + i * 0.018, 0.3));
          return (
            <path
              key={i}
              d={l.d}
              fill={COL.black}
              fillRule="evenodd"
              opacity={v}
              transform={`translate(0 ${40 * (1 - v)})`}
            />
          );
        })}
      {words && <path d={LOGO.swoosh.d} fill={COL.blue} clipPath={`url(#${id}-sw)`} />}
      {shine > 0 && shine < 1 && (
        <rect x={vx - 50} y={vy - 50} width={vw + 100} height={vh + 100} fill={`url(#${id}-shine)`} clipPath={`url(#${id}-all)`} />
      )}
    </svg>
  );
};
