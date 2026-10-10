import React from 'react';
import {Composition} from 'remotion';
import {Main, MainProps} from './Main';
import {DURATION_FRAMES, FPS} from './timeline';
import {H, W} from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FootprintAR"
      component={Main}
      durationInFrames={DURATION_FRAMES}
      fps={FPS}
      width={W}
      height={H}
      defaultProps={{withVO: false} satisfies MainProps}
    />
  );
};
