import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
import {Background} from './components/Background';
import {BrandWipe} from './components/BrandWipe';
import {Captions} from './components/Captions';
import {LogoBug} from './components/LogoBug';
import {ProgressBar} from './components/ProgressBar';
import {CandleSlices3D} from './components/three/CandleSlices3D';
import {FootprintScene} from './scenes/FootprintScene';
import {S1Hook} from './scenes/S1Hook';
import {S2Candle} from './scenes/S2Candle';
import {S3Intro} from './scenes/S3Intro';
import {S7Delta} from './scenes/S7Delta';
import {S8Cta} from './scenes/S8Cta';
import {C} from './theme';
import {CUE, FPS} from './timeline';
import {prog} from './anim';

export type MainProps = {withVO: boolean};

const FONTS = [
  '600 40px Cairo',
  '700 40px Cairo',
  '800 40px Cairo',
  '900 40px Cairo',
  '500 40px Poppins',
  '700 40px Poppins',
  '800 40px Poppins',
  '900 40px Poppins',
  '600 40px "JetBrains Mono"',
  '800 40px "JetBrains Mono"',
];

export const Main: React.FC<MainProps> = ({withVO}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(FONTS.flatMap((f) => [document.fonts.load(f, 'abc 0123'), document.fonts.load(f, 'ابتث')]))
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);

  return (
    <AbsoluteFill style={{background: C.white, overflow: 'hidden'}}>
      <Background t={t} />
      <S1Hook t={t} />
      <S2Candle t={t} />
      {t > 8.6 && t < 15.1 ? <CandleSlices3D t={t} /> : null}
      <S3Intro t={t} />
      <FootprintScene t={t} />
      <S7Delta t={t} />
      <S8Cta t={t} />
      {/* "توقّف" — hard flash cut */}
      <AbsoluteFill style={{background: C.white, opacity: t >= CUE.stopGuess - 0.02 ? 1 - prog(t, CUE.stopGuess, 0.14) : 0, pointerEvents: 'none'}} />
      <LogoBug t={t} />
      <Captions t={t} />
      <BrandWipe t={t} at={4.06} />
      <BrandWipe t={t} at={29.79} />
      <ProgressBar t={t} />
      <Audio src={staticFile('music_sfx.wav')} />
      {withVO ? <Audio src={staticFile('vo.wav')} /> : null}
    </AbsoluteFill>
  );
};
