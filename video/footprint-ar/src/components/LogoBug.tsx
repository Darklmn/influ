import React from 'react';
import {LogoSvg} from './LogoSvg';
import {prog} from '../anim';

// Persistent brand logo, top-centre (inside TikTok / Reels safe zone). Visible the whole video;
// it hands over to the large 3D logo on the final call-to-action.
export const LogoBug: React.FC<{t: number}> = ({t}) => {
  const build = prog(t, 0.12, 1.1);
  const out = prog(t, 37.55, 0.3);
  if (out >= 1) return null;
  // light sweep every ~7s
  const cycle = (t - 1.4) % 7;
  const shine = t > 1.4 ? cycle / 0.9 : -1;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 150,
        display: 'flex',
        justifyContent: 'center',
        opacity: 1 - out,
        transform: `translateY(${-30 * out}px)`,
      }}
    >
      <LogoSvg id="bug" width={226} build={build} shine={shine} />
    </div>
  );
};
