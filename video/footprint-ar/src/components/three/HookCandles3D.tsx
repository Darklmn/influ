import React, {useMemo} from 'react';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Stage, wy} from './Stage';
import {C} from '../../theme';
import {eOutCubic, prog, spr} from '../../anim';

// [open, close, high, low]
const CANDLES = [
  [2.0, 2.8, 3.1, 1.7],
  [2.8, 2.3, 3.0, 2.0],
  [2.3, 3.4, 3.6, 2.2],
  [3.4, 3.0, 3.7, 2.8],
  [3.0, 4.1, 4.4, 2.9],
  [4.1, 3.7, 4.3, 3.4],
  [3.7, 4.9, 5.2, 3.6],
  [4.9, 4.6, 5.3, 4.3],
  [4.6, 6.0, 6.3, 4.5],
];
const S = 1.22;
const MID = 4.0;
const STEP = 1.02;
const BW = 0.8;

export const HookCandles3D: React.FC<{t: number; opacity: number}> = ({t, opacity}) => {
  const geoms = useMemo(
    () =>
      CANDLES.map(([o, c]) => new RoundedBoxGeometry(BW, Math.max(Math.abs(c - o) * S, 0.08), BW, 4, 0.08)),
    [],
  );
  const mats = useMemo(
    () => ({
      bull: new THREE.MeshPhysicalMaterial({color: C.blue, roughness: 0.28, metalness: 0.05, clearcoat: 0.8, transparent: true}),
      bear: new THREE.MeshPhysicalMaterial({color: '#0b0b0b', roughness: 0.3, metalness: 0.1, clearcoat: 1, transparent: true}),
      wick: new THREE.MeshStandardMaterial({color: '#111111', roughness: 0.5, transparent: true}),
    }),
    [],
  );
  Object.values(mats).forEach((m) => (m.opacity = opacity));

  const push = eOutCubic(prog(t, 0, 4.2));
  return (
    <Stage>
      <group position={[-0.2, wy(930), -6 + 8 * push]} rotation={[0.17, -0.5 + 0.12 * t, 0.02]}>
        <gridHelper args={[20, 20, C.blue300, C.blue100]} position={[0, (1.4 - MID) * S, 0]} />
        {CANDLES.map(([o, c, h, l], i) => {
          const g = Math.max(0.001, spr(t, 0.15 + i * 0.07, {stiffness: 150, damping: 12}));
          const bull = c >= o;
          const bodyY = ((o + c) / 2 - l) * S;
          return (
            <group key={i} position={[(i - 4) * STEP, (l - MID) * S, 0]} scale={[1, g, 1]}>
              <mesh position={[0, ((h - l) * S) / 2, 0]} material={mats.wick}>
                <cylinderGeometry args={[0.06, 0.06, (h - l) * S, 12]} />
              </mesh>
              <mesh position={[0, bodyY, 0]} geometry={geoms[i]} material={bull ? mats.bull : mats.bear} />
            </group>
          );
        })}
      </group>
    </Stage>
  );
};
