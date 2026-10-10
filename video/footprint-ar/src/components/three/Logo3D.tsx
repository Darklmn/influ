import React, {useMemo} from 'react';
import * as THREE from 'three';
import {Stage, wy} from './Stage';
import {C} from '../../theme';
import {LOGO} from '../../logoPaths';
import {clamp01, eOutBack, eOutCubic, lerp, prog} from '../../anim';

// The real TE emblem (vectorised from the brand logo) extruded in 3D — black & blue glossy bars
// that fly in and assemble exactly like the flat logo, then idle with a slow premium turn.

const parse = (d: string) =>
  d
    .split('M')
    .filter(Boolean)
    .map((sub) => {
      const nums = sub.replace('Z', '').trim().split(/\s+/).map(Number);
      const pts: [number, number][] = [];
      for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
      return pts;
    });

const [ex, ey, ew, eh] = LOGO.emblemBox;
const CX = ex + ew / 2;
const CY = ey + eh / 2;

const toShape = (d: string) => {
  const [outer, ...holes] = parse(d);
  const shape = new THREE.Shape(outer.map(([x, y]) => new THREE.Vector2(x - CX, -(y - CY))));
  holes.forEach((h) => shape.holes.push(new THREE.Path(h.map(([x, y]) => new THREE.Vector2(x - CX, -(y - CY))))));
  return shape;
};

const PIECES = (['T', 'eTop', 'eMid', 'eBot'] as const).map((k) => ({
  k,
  shape: toShape(LOGO.emblem[k].d),
  blue: LOGO.emblem[k].color === 'blue',
}));

export const Logo3D: React.FC<{t: number; start: number; widthPx: number; centerY: number}> = ({t, start, widthPx, centerY}) => {
  const geoms = useMemo(
    () =>
      PIECES.map((p) => {
        const g = new THREE.ExtrudeGeometry(p.shape, {
          depth: 70,
          bevelEnabled: true,
          bevelThickness: 8,
          bevelSize: 5,
          bevelSegments: 4,
          curveSegments: 4,
        });
        g.translate(0, 0, -35);
        g.computeVertexNormals();
        return g;
      }),
    [],
  );
  const mats = useMemo(
    () => ({
      black: new THREE.MeshPhysicalMaterial({color: '#0a0a0a', roughness: 0.22, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08}),
      blue: new THREE.MeshPhysicalMaterial({color: C.blue, roughness: 0.22, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.08, emissive: C.blue, emissiveIntensity: 0.12}),
    }),
    [],
  );

  const s = widthPx / 100 / ew;
  const lt = t - start;
  const idle = Math.max(0, lt - 0.9);
  const whole = eOutCubic(clamp01(lt / 0.9));
  const rotY = lerp(-1.1, 0, whole) + Math.sin(idle * 1.25) * 0.32 * clamp01(idle);
  const rotX = lerp(0.5, 0, whole) + Math.sin(idle * 0.9 + 1) * 0.06;

  return (
    <Stage>
      <group position={[0, wy(centerY) + Math.sin(idle * 1.6) * 0.06, 0]} rotation={[rotX, rotY, 0]} scale={[s, s, s]}>
        {PIECES.map((p, i) => {
          const a = eOutBack(prog(t, start + 0.05 + i * 0.09, 0.55), 1.3);
          const fromX = p.k === 'T' ? -420 : 520;
          const fromZ = 260 - i * 40;
          return (
            <mesh
              key={p.k}
              geometry={geoms[i]}
              material={p.blue ? mats.blue : mats.black}
              position={[lerp(fromX, 0, a), 0, lerp(fromZ, 0, a)]}
              rotation={[0, lerp(p.k === 'T' ? -1.4 : 1.4, 0, a), 0]}
              scale={Math.max(0.001, clamp01(a * 1.5))}
            />
          );
        })}
      </group>
    </Stage>
  );
};
