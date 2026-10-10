import React, {useMemo} from 'react';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Stage, wx, wy} from './Stage';
import {C} from '../../theme';
import {CLOSE_ROW, CELLS_CX, CELLS_W, LAD, OPEN_ROW, ROWS, rowCY} from '../../data';
import {eInOutCubic, eOutBack, lerp, prog, spr} from '../../anim';

// One 3D candle built from 10 price-level slices.
//  S3 (8.72s): closed candle spinning under the title
//  S4 (12.67s): spins to face camera and moves onto the ladder
//  13.3s "يفتح الشمعة من الداخل": slices separate, flip and widen into the footprint rows
//  ~14.6s: cross-fades into the crisp 2D footprint ladder (same geometry, see FootprintScene)

const N = ROWS.length;
const blue = new THREE.Color(C.blue);
const black = new THREE.Color('#0b0b0b');
const inside = new THREE.Color('#BFD3FF');

export const CandleSlices3D: React.FC<{t: number}> = ({t}) => {
  const geom = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.08), []);
  const mats = useMemo(
    () =>
      ROWS.map(
        () => new THREE.MeshPhysicalMaterial({color: C.blue, roughness: 0.3, metalness: 0.05, clearcoat: 0.8, transparent: true}),
      ),
    [],
  );

  const appear = spr(t, 8.72, {stiffness: 120, damping: 14});
  const fade = 1 - prog(t, 14.5, 0.4);
  // spin in S3, then settle facing camera
  const spinCont = (t - 8.72) * 1.05;
  const settle = eInOutCubic(prog(t, 12.67, 0.7));
  const target = Math.ceil(((12.67 - 8.72) * 1.05) / (Math.PI * 2)) * Math.PI * 2;
  const rotY = lerp(spinCont, target, settle);
  const move = eInOutCubic(prog(t, 12.67, 0.75));

  // closed (S3) → ladder position
  const closedH = 0.44;
  const ladderCenter = wy((rowCY(0) + rowCY(N - 1)) / 2);
  const cy = lerp(wy(1050), ladderCenter, move);
  const rowH = lerp(closedH, LAD.rowH / 100, move);

  return (
    <Stage opacity={fade}>
      <group scale={appear} rotation={[0.12 * (1 - settle), rotY, 0]}>
        {ROWS.map((_, i) => {
          const isBody = i >= CLOSE_ROW && i <= OPEN_ROW;
          const d = Math.abs(i - 4.5) * 0.05;
          const po = eInOutCubic(prog(t, 13.3 + d, 1.05));
          const pitch = rowH + 0.06 * po + Math.sin(Math.PI * po) * 0.22;
          const y = cy + (4.5 - i) * pitch;
          const closedW = isBody ? 1.5 : 0.12;
          const w = lerp(closedW, CELLS_W / 100, eOutBack(po, 0.4));
          const x = lerp(0, wx(CELLS_CX), po);
          const z = Math.sin(Math.PI * po) * 0.9;
          const flip = po * Math.PI * 2;
          const m = mats[i];
          const base = isBody ? blue : black;
          m.color.copy(base).lerp(inside, Math.min(1, po * 1.1));
          m.opacity = fade;
          return (
            <mesh
              key={i}
              geometry={geom}
              material={m}
              position={[x, y, z]}
              rotation={[flip, 0, 0]}
              scale={[w, isBody || po > 0.02 ? rowH * (isBody ? 1 : lerp(0.35, 1, po)) : rowH * 0.35, isBody ? 1.5 : lerp(0.12, 1.2, po)]}
            />
          );
        })}
        {/* wick line through the closed candle (disappears as it opens) */}
        <mesh position={[0, cy, -0.02]} scale={[1, 1, 1]}>
          <cylinderGeometry args={[0.04, 0.04, rowH * N * (1 - prog(t, 13.3, 0.3)) + 0.001, 10]} />
          <meshStandardMaterial color="#111" transparent opacity={fade * (1 - prog(t, 13.3, 0.3))} />
        </mesh>
      </group>
    </Stage>
  );
};
