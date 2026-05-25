"use client";

const CONFETTI = [
  "#ff6b9d", "#ffd93d", "#6bcb77", "#4d96ff", "#ff8fab", "#c77dff",
];

const Tag = "div" as keyof JSX.IntrinsicElements;

export function FloatingDecor() {
  const Wrapper = Tag;
  const Box = Tag;

  return (
    <Wrapper className="floating-decor" aria-hidden="true">
      <Box className="balloon balloon--1">{"\u{1F388}"}</Box>
      <Box className="balloon balloon--2">{"\u{1F388}"}</Box>
      <Box className="balloon balloon--3">{"\u{1F382}"}</Box>
      <Box className="balloon balloon--4">{"\u{1F380}"}</Box>
      <Box className="balloon balloon--5">{"\u{2728}"}</Box>
      <Box className="streamer streamer--1" />
      <Box className="streamer streamer--2" />
      <Box className="streamer streamer--3" />

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
    </Wrapper>
  );
}
