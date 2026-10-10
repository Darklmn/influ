import React from 'react';
import {C, H, W} from '../theme';
import {eInCubic, eOutCubic, prog} from '../anim';

// Signature transition: the three slanted bars of the "E" (black / blue / black) sweep across
// the frame right → left, fully covering it for a couple of frames at `at` (the cut point).
export const BrandWipe: React.FC<{t: number; at: number}> = ({t, at}) => {
  if (t < at - 0.45 || t > at + 0.5) return null;
  const band = H / 3 + 6;
  const skew = band * 0.62;
  const bw = W + 520;
  const colors = [C.black, C.blue, C.black];
  return (
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      {colors.map((col, i) => {
        const d = i * 0.035;
        const enter = eOutCubic(prog(t, at - 0.3 - d, 0.28));
        const exit = eInCubic(prog(t, at + 0.06 + d, 0.3));
        // covering range: x0 ∈ [W - bw, -skew]
        const cover = (W - bw - skew) / 2;
        const x0 = 1130 + (cover - 1130) * enter - (bw + skew + cover + 60) * exit;
        const y0 = i * (H / 3) - 3;
        const pts = [
          [x0 + skew, y0],
          [x0 + skew + bw, y0],
          [x0 + bw, y0 + band],
          [x0, y0 + band],
        ]
          .map((p) => p.join(','))
          .join(' ');
        return <polygon key={i} points={pts} fill={col} />;
      })}
    </svg>
  );
};
