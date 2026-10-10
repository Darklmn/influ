import React from 'react';
import {C} from '../theme';
import {DURATION_SEC} from '../timeline';

export const ProgressBar: React.FC<{t: number}> = ({t}) => (
  <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: C.blueA(0.08)}}>
    <div style={{height: '100%', width: `${(t / DURATION_SEC) * 100}%`, background: C.blue, borderRadius: '0 4px 4px 0'}} />
  </div>
);
