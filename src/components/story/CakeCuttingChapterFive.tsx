"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  BIRTHDAY_NAME,
  CAKE_BALLOONS,
  CAKE_WISH_LINES,
} from "@/lib/cake-chapter";
import { STORY_CHAPTERS } from "@/lib/story-chapters";
import { CakeKnife } from "./CakeKnife";
import "./cake-cutting.css";

const CUT_THRESHOLD_DESKTOP = 0.3;
const CUT_THRESHOLD_TOUCH = 0.24;
const CANDLE_COUNT = 5;
const MAX_CRUMBS = 28;

type Crumb = { id: number; x: number; y: number; size: number };

type KnifePose = { x: number; y: number; angle: number };

type CutGroove = { min: number; max: number; center: number };

function getCutThreshold() {
  if (typeof window === "undefined") return CUT_THRESHOLD_DESKTOP;
  return window.matchMedia("(pointer: coarse)").matches
    ? CUT_THRESHOLD_TOUCH
    : CUT_THRESHOLD_DESKTOP;
}

function AmbientBackdrop() {
  return (
    <div className="ck-ambient" aria-hidden="true">
      <div className="ck-ambient__glow ck-ambient__glow--warm" />
      <div className="ck-ambient__glow ck-ambient__glow--rose" />
      <div className="ck-ambient__glow ck-ambient__glow--gold" />
      <div className="ck-ambient__grain" />
      <div className="ck-ambient__vignette" />
    </div>
  );
}

function BirthdayBanner() {
  return (
    <div className="ck-banner" aria-hidden="true">
      <div className="ck-banner__ribbon ck-banner__ribbon--l" />
      <div className="ck-banner__ribbon ck-banner__ribbon--r" />
      <div className="ck-banner__panel">
        <span className="ck-banner__star">✦</span>
        <span className="ck-banner__text">Happy Birthday</span>
        <span className="ck-banner__star">✦</span>
      </div>
    </div>
  );
}

function FairyLights() {
  const bulbs = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);
  return (
    <div className="ck-lights" aria-hidden="true">
      <div className="ck-lights__wire" />
      {bulbs.map((i) => (
        <span
          key={i}
          className="ck-lights__bulb"
          style={{ "--ck-li": i } as CSSProperties}
        />
      ))}
    </div>
  );
}

function HangingRibbons() {
  return (
    <div className="ck-ribbons" aria-hidden="true">
      <span className="ck-ribbons__drape ck-ribbons__drape--l" />
      <span className="ck-ribbons__drape ck-ribbons__drape--r" />
    </div>
  );
}

function FloralAccents() {
  return (
    <div className="ck-florals" aria-hidden="true">
      <span className="ck-florals__sprig ck-florals__sprig--tl" />
      <span className="ck-florals__sprig ck-florals__sprig--tr" />
      <span className="ck-florals__sprig ck-florals__sprig--bl" />
      <span className="ck-florals__sprig ck-florals__sprig--br" />
    </div>
  );
}

function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 13 + 4) % 100}%`,
        delay: `${(i % 8) * 1.2}s`,
        dur: `${14 + (i % 5) * 2}s`,
      })),
    []
  );
  return (
    <div className="ck-petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="ck-petals__bit"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
}

function Sparkles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${(i * 23 + 9) % 100}%`,
        top: `${(i * 17 + 11) % 100}%`,
        delay: `${(i % 6) * 0.5}s`,
      })),
    []
  );
  return (
    <div className="ck-sparkles-field" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="ck-sparkles-field__dot"
          style={{
            left: d.left,
            top: d.top,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

function FloatingBalloons() {
  return (
    <div className="ck-balloons" aria-hidden="true">
      {CAKE_BALLOONS.map((b) => (
        <div
          key={b.id}
          className={`ck-balloon ${"back" in b && b.back ? "ck-balloon--back" : ""} ck-balloon--${b.hue}`}
          style={
            {
              left: b.left,
              "--ck-balloon-size": `${b.size}rem`,
              "--ck-balloon-delay": `${b.delay}s`,
              "--ck-balloon-duration": `${b.duration}s`,
              "--ck-balloon-drift": `${b.drift}px`,
            } as CSSProperties
          }
        >
          <span className="ck-balloon__orb">
            <span className="ck-balloon__shine" />
          </span>
          <span className="ck-balloon__string" />
        </div>
      ))}
    </div>
  );
}

function CakeStack() {
  return (
    <div className="ck-cake__stack">
      <div className="ck-cake__tier ck-cake__tier--1">
        <div className="ck-cake__gold-band" />
        <div className="ck-cake__side-shade" />
      </div>
      <div className="ck-cake__tier ck-cake__tier--2">
        <div className="ck-cake__gold-band" />
        <div className="ck-cake__pearls" />
        <div className="ck-cake__side-shade" />
      </div>
      <div className="ck-cake__tier ck-cake__tier--3">
        <div className="ck-cake__drip" />
        <div className="ck-cake__gold-band" />
        <div className="ck-cake__top-shine" />
        <div className="ck-cake__topper">
          <span />
          <span />
          <span />
        </div>
        <div className="ck-cake__side-shade" />
      </div>
    </div>
  );
}

function CakeCandles() {
  return (
    <div className="ck-cake__candles" aria-hidden="true">
      {Array.from({ length: CANDLE_COUNT }, (_, i) => (
        <span
          key={i}
          className="ck-cake__candle"
          style={{ "--ck-i": i } as CSSProperties}
        >
          <span className="ck-cake__flame" />
          <span className="ck-cake__wick" />
          <span className="ck-cake__body" />
        </span>
      ))}
    </div>
  );
}

function CelebrationOverlay({ active }: { active: boolean }) {
  const fireworks = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 5) % 100}%`,
        delay: `${(i % 12) * 0.08}s`,
        hue: i % 4,
      })),
    []
  );

  if (!active) return null;

  return (
    <div className="ck-celebration" role="status" aria-live="polite">
      <div className="ck-celebration__wash" aria-hidden="true" />
      {fireworks.map((i) => (
        <span
          key={i}
          className="ck-celebration__firework"
          style={{ "--ck-fw": i } as CSSProperties}
        />
      ))}
      <div className="ck-celebration__particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`ck-celebration__particle ck-celebration__particle--${p.hue}`}
            style={{ left: p.left, animationDelay: p.delay }}
          />
        ))}
      </div>
      <div className="ck-celebration__confetti" aria-hidden="true">
        {Array.from({ length: 56 }, (_, i) => (
          <span
            key={i}
            className="ck-celebration__confetti-bit"
            style={
              {
                left: `${(i * 19 + 3) % 100}%`,
                animationDelay: `${(i % 14) * 0.06}s`,
                "--ck-cr": `${(i % 9) * 40}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <h2 className="ck-celebration__headline">
        <span className="ck-celebration__line">Happy Birthday</span>
        <span className="ck-celebration__name">{BIRTHDAY_NAME}</span>
      </h2>
      <p className="ck-celebration__sub">26 May 2026 · make your wish</p>
    </div>
  );
}

export function CakeCuttingChapterFive() {
  const prev = STORY_CHAPTERS[2];
  const zoneRef = useRef<HTMLDivElement>(null);
  const crumbId = useRef(0);
  const lastCrumbAt = useRef(0);

  const [cut, setCut] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [knife, setKnife] = useState<KnifePose | null>(null);
  const [cutGroove, setCutGroove] = useState<CutGroove | null>(null);
  const [cutProgress, setCutProgress] = useState(0);
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    min: 1,
    max: 0,
    lastX: 50,
    lastY: 55,
  });
  const knifeAngleRef = useRef(90);

  const addCrumb = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastCrumbAt.current < 45) return;
    lastCrumbAt.current = now;
    crumbId.current += 1;
    setCrumbs((prev) => {
      const next = [
        ...prev,
        {
          id: crumbId.current,
          x,
          y,
          size: 0.25 + Math.random() * 0.35,
        },
      ];
      return next.length > MAX_CRUMBS ? next.slice(-MAX_CRUMBS) : next;
    });
  }, []);

  const pointerToPercent = useCallback((clientX: number, clientY: number) => {
    const el = zoneRef.current;
    if (!el) return { x: 50, y: 55 };
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return {
      x: Math.min(94, Math.max(6, x)),
      y: Math.min(88, Math.max(18, y)),
    };
  }, []);

  const syncGroove = useCallback((minFrac: number, maxFrac: number) => {
    const min = minFrac * 100;
    const max = maxFrac * 100;
    const center = (min + max) / 2;
    setCutGroove({ min, max, center });
    return center;
  }, []);

  const finishCut = useCallback(
    (minFrac: number, maxFrac: number) => {
      syncGroove(minFrac, maxFrac);
      setCut(true);
      setCutProgress(1);
      setDragging(false);
      setKnife(null);
      dragRef.current.active = false;
      dragRef.current.pointerId = -1;
    },
    [syncGroove]
  );

  const resetDrag = useCallback(() => {
    setDragging(false);
    setKnife(null);
    setCutGroove(null);
    setCutProgress(0);
    dragRef.current.active = false;
    dragRef.current.pointerId = -1;
  }, []);

  const applyPointer = useCallback(
    (clientX: number, clientY: number) => {
      const { x, y } = pointerToPercent(clientX, clientY);
      const frac = x / 100;
      const d = dragRef.current;

      const dx = x - d.lastX;
      const dy = y - d.lastY;
      const angle =
        Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4
          ? (Math.atan2(dy, dx) * 180) / Math.PI + 90
          : knifeAngleRef.current;
      knifeAngleRef.current = angle;

      d.min = Math.min(d.min, frac);
      d.max = Math.max(d.max, frac);
      d.lastX = x;
      d.lastY = y;

      const span = d.max - d.min;
      const threshold = getCutThreshold();
      syncGroove(d.min, d.max);
      setCutProgress(Math.min(1, span / threshold));
      setKnife({ x, y, angle });
      addCrumb(x, y);

      if (span >= threshold) {
        finishCut(d.min, d.max);
      }
    },
    [addCrumb, finishCut, pointerToPercent, syncGroove]
  );

  const endDrag = useCallback(
    (successThreshold = 0.78) => {
      if (cut || !dragRef.current.active) return;
      const span = dragRef.current.max - dragRef.current.min;
      const threshold = getCutThreshold();
      if (span >= threshold * successThreshold) {
        finishCut(dragRef.current.min, dragRef.current.max);
      } else {
        resetDrag();
      }
    },
    [cut, finishCut, resetDrag]
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (cut) return;
    e.preventDefault();
    e.stopPropagation();

    const { x, y } = pointerToPercent(e.clientX, e.clientY);
    const frac = x / 100;

    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      min: frac,
      max: frac,
      lastX: x,
      lastY: y,
    };

    setDragging(true);
    setCrumbs([]);
    applyPointer(e.clientX, e.clientY);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture unsupported */
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (cut || !dragRef.current.active) return;
    if (
      dragRef.current.pointerId !== -1 &&
      e.pointerId !== dragRef.current.pointerId
    ) {
      return;
    }
    e.preventDefault();
    applyPointer(e.clientX, e.clientY);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (
      dragRef.current.pointerId !== -1 &&
      e.pointerId !== dragRef.current.pointerId
    ) {
      return;
    }
    endDrag();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* released */
    }
  };

  /* Window-level tracking — reliable on mobile when finger leaves the cake zone */
  useEffect(() => {
    if (!dragging || cut) return;

    const onWindowMove = (e: globalThis.PointerEvent) => {
      if (e.pointerId !== dragRef.current.pointerId) return;
      e.preventDefault();
      applyPointer(e.clientX, e.clientY);
    };

    const onWindowEnd = (e: globalThis.PointerEvent) => {
      if (e.pointerId !== dragRef.current.pointerId) return;
      endDrag();
    };

    window.addEventListener("pointermove", onWindowMove, { passive: false });
    window.addEventListener("pointerup", onWindowEnd);
    window.addEventListener("pointercancel", onWindowEnd);

    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowEnd);
      window.removeEventListener("pointercancel", onWindowEnd);
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [applyPointer, cut, dragging, endDrag]);

  const zoneStyle = {
    "--ck-cut-progress": cutProgress,
    ...(cutGroove
      ? {
          "--ck-cut": `${cutGroove.center}%`,
          "--ck-cut-min": `${cutGroove.min}%`,
          "--ck-cut-max": `${cutGroove.max}%`,
          "--ck-cut-width": `${Math.max(cutGroove.max - cutGroove.min, 0.5)}%`,
        }
      : {}),
  } as CSSProperties;

  return (
    <div
      className={`ck ${cut ? "ck--cut" : ""} ${dragging ? "ck--dragging" : ""} ${cut ? "ck--celebrate" : ""}`}
    >
      <AmbientBackdrop />
      <Sparkles />
      <FloatingPetals />
      <FloatingBalloons />
      <FairyLights />
      <HangingRibbons />
      <FloralAccents />

      <CelebrationOverlay active={cut} />

      <BirthdayBanner />

      <nav className="ck__chapters" aria-label="Story chapters">
        {STORY_CHAPTERS.map((c, i) => (
          <Link
            key={c.id}
            href={c.path}
            className={`ck__chapter-dot ${i <= 3 ? "ck__chapter-dot--on" : ""} ${i === 3 ? "ck__chapter-dot--current" : ""}`}
            aria-label={`Chapter ${c.id}`}
            aria-current={i === 3 ? "step" : undefined}
          />
        ))}
      </nav>

      <main className="ck__main">
        <header className={`ck__hero ${cut ? "ck__hero--hidden" : ""}`}>
          <p className="ck__eyebrow">
            <span className="ck__eyebrow-line" />
            Chapter five · the grand finale
            <span className="ck__eyebrow-line" />
          </p>
          <h1 className="ck__title">
            The final
            <em>slice</em>
          </h1>
          <p className="ck__hint">
            <span className="ck__hint-mouse">Drag the knife across the cake</span>
            <span className="ck__hint-touch">Swipe the knife across the cake</span>
          </p>
        </header>

        <section className="ck__stage" aria-label="Birthday cake ceremony">
          <div className="ck-table" aria-hidden="true">
            <div className="ck-table__surface" />
            <div className="ck-table__spotlight" />
            <div className="ck-table__reflection" />
          </div>

          <div
            ref={zoneRef}
            className="ck-cake-zone"
            style={zoneStyle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role={cut ? undefined : "button"}
            aria-label={cut ? "Cake sliced" : "Drag across the cake to cut"}
            tabIndex={cut ? -1 : 0}
            onKeyDown={(e) => {
              if (!cut && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                finishCut(0.38, 0.62);
              }
            }}
          >
            <div
              className={`ck-slice-meter ${dragging ? "ck-slice-meter--on" : ""}`}
              aria-hidden="true"
            >
              <div
                className="ck-slice-meter__fill"
                style={{ transform: `scaleX(${cutProgress})` }}
              />
            </div>
            <div className="ck-cake__assembly">
              <div className="ck-cake__pedestal">
                <div className="ck-cake__plate" aria-hidden="true" />

                <div className="ck-cake">
                  <div className="ck-cake__half ck-cake__half--left">
                    <CakeStack />
                    <div className="ck-cake__slice-face" />
                    <div className="ck-cake__cream-fill" />
                  </div>
                  <div className="ck-cake__half ck-cake__half--right">
                    <CakeStack />
                    <div className="ck-cake__slice-face ck-cake__slice-face--right" />
                    <div className="ck-cake__cream-fill" />
                  </div>

                  <div className="ck-cake__candles-bridge" aria-hidden="true">
                    <CakeCandles />
                  </div>

                  {cutGroove && (dragging || cut) && (
                    <>
                      <div className="ck-cake__cut-groove" aria-hidden="true" />
                      <div className="ck-cake__cream-smear" aria-hidden="true" />
                      <div className="ck-cake__cut-shine" aria-hidden="true" />
                    </>
                  )}

                  <div className="ck-cake__glow" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="ck-crumbs" aria-hidden="true">
              {crumbs.map((c) => (
                <span
                  key={c.id}
                  className="ck-crumbs__bit"
                  style={{
                    left: `${c.x}%`,
                    top: `${c.y}%`,
                    width: `${c.size}rem`,
                    height: `${c.size * 0.7}rem`,
                  }}
                />
              ))}
            </div>

            {!cut && !dragging && (
              <p className="ck-cake__tap-hint" aria-hidden="true">
                <span className="ck-cake__tap-icon">↔</span>
                slice through the frosting
              </p>
            )}

            {knife && !cut && (
              <CakeKnife
                leftPercent={knife.x}
                topPercent={knife.y}
                angleDeg={knife.angle}
              />
            )}
          </div>
        </section>

        <div className={`ck-finale ${cut ? "ck-finale--visible" : ""}`}>
          <div className="ck-finale__card">
            {CAKE_WISH_LINES.map((line) => (
              <p key={line} className="ck-finale__line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </main>

      <footer className={`ck__footer ${cut ? "ck__footer--dim" : ""}`}>
        <div className="ck__nav">
          <Link href={prev.path} className="ck__nav-btn ck__nav-btn--ghost">
            ← Chapter 3
          </Link>
          <span className="ck__nav-count">5 / {STORY_CHAPTERS.length}</span>
          <Link href="/" className="ck__nav-btn ck__nav-btn--solid">
            Back to start →
          </Link>
        </div>
      </footer>
    </div>
  );
}
