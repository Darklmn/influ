import React from 'react';
import {C} from '../theme';

export const ArrowIcon: React.FC<{up?: boolean; size?: number; color?: string}> = ({up = true, size = 40, color = C.blue}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{transform: up ? undefined : 'rotate(180deg)'}}>
    <path d="M20 5 L34 21 H25 V35 H15 V21 H6 Z" fill={color} />
  </svg>
);

export const CheckIcon: React.FC<{size?: number; p?: number}> = ({size = 64, p = 1}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="30" fill={C.blue} />
    <path
      d="M18 33 L28 43 L47 22"
      fill="none"
      stroke="#fff"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="48"
      strokeDashoffset={48 * (1 - p)}
    />
  </svg>
);

/** classical bank / institution icon (big money) */
export const BankIcon: React.FC<{size?: number; color?: string; p?: number}> = ({size = 120, color = C.black, p = 1}) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <g fill="none" stroke={color} strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="520" strokeDashoffset={520 * (1 - p)}>
      <path d="M12 44 L60 14 L108 44 Z" />
      <path d="M24 54 V92 M48 54 V92 M72 54 V92 M96 54 V92" />
      <path d="M12 104 H108" />
    </g>
    <circle cx="60" cy="33" r="6" fill={C.blue} opacity={p} />
  </svg>
);

export const GiftIcon: React.FC<{size?: number; color?: string}> = ({size = 56, color = '#fff'}) => (
  <svg width={size} height={size} viewBox="0 0 56 56">
    <g fill="none" stroke={color} strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round">
      <rect x="7" y="22" width="42" height="28" rx="3" />
      <rect x="4" y="14" width="48" height="10" rx="2" />
      <path d="M28 14 V50" />
      <path d="M28 14 C 22 4, 12 6, 16 13 M28 14 C 34 4, 44 6, 40 13" />
    </g>
  </svg>
);

export const LockIcon: React.FC<{size?: number; color?: string}> = ({size = 34, color = C.blue}) => (
  <svg width={size} height={size} viewBox="0 0 34 34">
    <rect x="6" y="15" width="22" height="16" rx="3" fill={color} />
    <path d="M11 15 V10 a6 6 0 0 1 12 0 V15" fill="none" stroke={color} strokeWidth="3.5" />
  </svg>
);

export const PointerIcon: React.FC<{size?: number}> = ({size = 90}) => (
  <svg width={size} height={size} viewBox="0 0 90 90">
    <path
      d="M30 8 c5 0 8 4 8 8 v26 l4 -1 c4 -1 8 1 9 5 l1 1 c4 -1 8 1 9 5 l1 1 c4 -1 9 2 9 7 v14 c0 10 -8 18 -18 18 h-12 c-6 0 -11 -3 -15 -8 l-15 -20 c-3 -4 -2 -9 2 -11 c3 -2 8 -1 10 2 l4 5 V16 c0 -4 3 -8 8 -8 z"
      fill="#fff"
      stroke={C.black}
      strokeWidth="5"
      strokeLinejoin="round"
    />
  </svg>
);
