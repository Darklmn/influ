import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, H, W} from '../theme';

// Clean white canvas with a faint blue graph-paper grid and slow drifting light — keeps depth
// while staying 100% on the white / blue / black brand palette.
export const Background: React.FC<{t: number}> = ({t}) => {
  const off = (t * 9) % 60;
  const b1x = 540 + Math.sin(t * 0.35) * 260;
  const b1y = 700 + Math.cos(t * 0.27) * 180;
  const b2x = 540 + Math.cos(t * 0.22) * 300;
  const b2y = 1400 + Math.sin(t * 0.31) * 160;
  return (
    <AbsoluteFill style={{background: C.white}}>
      <svg width={W} height={H} style={{position: 'absolute'}}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse" x={-off} y={off}>
            <path d="M60 0H0V60" fill="none" stroke={C.blueA(0.075)} strokeWidth="1.5" />
          </pattern>
          <radialGradient id="glow1">
            <stop offset="0" stopColor={C.blue} stopOpacity="0.10" />
            <stop offset="1" stopColor={C.blue} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fadeTop" cx="0.5" cy="0.45" r="0.75">
            <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.9" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />
        <circle cx={b1x} cy={b1y} r={620} fill="url(#glow1)" />
        <circle cx={b2x} cy={b2y} r={520} fill="url(#glow1)" />
        <rect width={W} height={H} fill="url(#fadeTop)" />
      </svg>
    </AbsoluteFill>
  );
};
