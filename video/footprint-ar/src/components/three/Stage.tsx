import React, {useEffect} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {H, W} from '../../theme';

// Camera tuned so that 1 world unit = 100 px on the z = 0 plane:
// visible height = 2 · d · tan(fov/2) = 19.2 units  →  d = 35.83 for fov 30°
export const CAM_Z = 35.83;
export const wx = (px: number) => (px - W / 2) / 100;
export const wy = (py: number) => (H / 2 - py) / 100;

const Env: React.FC = () => {
  const {gl, scene} = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
};

export const Stage: React.FC<{children: React.ReactNode; opacity?: number}> = ({children, opacity = 1}) => (
  <ThreeCanvas
    width={W}
    height={H}
    flat
    camera={{fov: 30, position: [0, 0, CAM_Z], near: 1, far: 140}}
    gl={{antialias: true, alpha: true, preserveDrawingBuffer: true}}
    style={{position: 'absolute', inset: 0, opacity}}
  >
    <Env />
    <ambientLight intensity={0.9} />
    <directionalLight position={[6, 10, 14]} intensity={2.2} />
    <directionalLight position={[-9, -3, 8]} intensity={0.7} />
    {children}
  </ThreeCanvas>
);
