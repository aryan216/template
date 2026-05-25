"use client";

import { useId, type CSSProperties } from "react";

type CakeKnifeProps = {
  leftPercent: number;
  topPercent: number;
  angleDeg?: number;
};

/** Offset cake knife — scalloped blade, bolster, riveted handle */
export function CakeKnife({
  leftPercent,
  topPercent,
  angleDeg = 90,
}: CakeKnifeProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      className="ck-knife"
      style={
        {
          left: `${leftPercent}%`,
          top: `${topPercent}%`,
          "--ck-knife-angle": `${angleDeg}deg`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <svg
        className="ck-knife__svg"
        viewBox="0 0 80 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${uid}-blade`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9aa8b5" />
            <stop offset="28%" stopColor="#f8fafc" />
            <stop offset="52%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#7a8a9a" />
          </linearGradient>
          <linearGradient id={`${uid}-edge`} x1="40" y1="8" x2="40" y2="128">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#a8b4c0" />
          </linearGradient>
          <linearGradient id={`${uid}-bolster`} x1="40" y1="126" x2="40" y2="142">
            <stop stopColor="#e8c878" />
            <stop offset="0.45" stopColor="#c9a050" />
            <stop offset="1" stopColor="#7a6020" />
          </linearGradient>
          <linearGradient id={`${uid}-handle`} x1="22" y1="142" x2="58" y2="210">
            <stop stopColor="#6b4a32" />
            <stop offset="0.45" stopColor="#3d2818" />
            <stop offset="1" stopColor="#1e1008" />
          </linearGradient>
          <filter
            id={`${uid}-shadow`}
            x="-25%"
            y="-5%"
            width="150%"
            height="115%"
          >
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.5" />
          </filter>
        </defs>

        <g filter={`url(#${uid}-shadow)`}>
          {/* Blade — offset profile with scalloped cutting edge */}
          <path
            d="M40 6 C46 6 50 10 50 18 L52 118 C52 124 48 128 40 128 C32 128 28 124 28 118 L30 18 C30 10 34 6 40 6 Z"
            fill={`url(#${uid}-blade)`}
          />
          <path
            d="M28 118 L52 118 L54 128 L26 128 Z"
            fill={`url(#${uid}-edge)`}
          />
          {/* Scalloped serration along edge */}
          <path
            d="M27 118 Q29 114 31 118 Q33 122 35 118 Q37 114 39 118 Q41 122 43 118 Q45 114 47 118 Q49 122 51 118"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M29 108 L51 108"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Bolster */}
          <path
            d="M20 128 L60 128 L56 142 L24 142 Z"
            fill={`url(#${uid}-bolster)`}
          />
          <path
            d="M26 134 L54 134"
            stroke="rgba(255,235,190,0.55)"
            strokeWidth="1"
          />
          {/* Handle */}
          <rect
            x="22"
            y="142"
            width="36"
            height="62"
            rx="9"
            fill={`url(#${uid}-handle)`}
          />
          <rect
            x="24"
            y="144"
            width="32"
            height="58"
            rx="8"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M26 150 C40 148 54 150 58 152"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
            fill="none"
          />
          {/* Rivets */}
          {[158, 174, 190].map((cy) => (
            <g key={cy}>
              <circle cx="40" cy={cy} r="2.2" fill="#6a5438" />
              <circle cx="40" cy={cy} r="1" fill="#d4b878" />
            </g>
          ))}
          <ellipse cx="40" cy="206" rx="16" ry="6" fill="#1e1008" />
          <ellipse
            cx="40"
            cy="204"
            rx="12"
            ry="3"
            fill="rgba(255,255,255,0.06)"
          />
        </g>
      </svg>
    </div>
  );
}
