"use client";

const CONFETTI = [
  "#ff6b9d", "#ffd93d", "#6bcb77", "#4d96ff", "#ff8fab", "#c77dff",
];

export function FloatingDecor() {
  return (
    <div className="floating-decor" aria-hidden="true">
      <div className="balloon balloon--1">{"\u{1F388}"}</div>
      <div className="balloon balloon--2">{"\u{1F388}"}</div>
      <div className="balloon balloon--3">{"\u{1F382}"}</div>
      <div className="balloon balloon--4">{"\u{1F380}"}</div>
      <div className="balloon balloon--5">{"\u{2728}"}</div>
      <div className="streamer streamer--1" />
      <div className="streamer streamer--2" />
      <div className="streamer streamer--3" />

      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="confetti-bit"
          style={{
            left: `${(i * 17 + 3) % 100}%`,
            animationDelay: `${(i * 0.35) % 5}s`,
            animationDuration: `${4 + (i % 5)}s`,
            backgroundColor: CONFETTI[i % CONFETTI.length],
            width: `${6 + (i % 4) * 2}px`,
            height: `${8 + (i % 3) * 3}px`,
          }}
        />
      ))}
    </div>
  );
}
