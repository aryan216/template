"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollRevealStagger } from "@/hooks/useScrollSection";
import { STORY_CHAPTERS } from "@/lib/story-chapters";
import {
  COKE_CAN_IMAGE,
  HERO_BIRTHDAY_QUOTE,
  COKE_LETTER,
  HERO_CORNER_DRINKS,
} from "@/lib/coke-photos";
import { ColaSplash } from "./ColaSplash";
import { HeroCornerDrink } from "./HeroCornerDrink";
import "./diet-coke.css";

const BIRTHDAY_LABEL = "26 May 2026";

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.1);
  const delayClass = delay > 0 ? `dc-reveal--delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`dc-reveal ${visible ? "dc-reveal--visible" : ""} ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function FloatingBubbles() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${(i * 13 + 5) % 100}%`,
        size: `${0.35 + (i % 6) * 0.22}rem`,
        duration: `${10 + (i % 9) * 2.5}s`,
        delay: `${(i % 7) * 0.9}s`,
      })),
    []
  );

  return (
    <div className="dc__bubbles" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="dc__bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}

function PresentHero({ ready }: { ready: boolean }) {
  return (
    <div className={`dc-hero__present ${ready ? "dc-hero__present--ready" : ""}`}>
      <div className="dc-hero__corners" aria-label="Drinks in each corner">
        {HERO_CORNER_DRINKS.map((drink, i) => (
          <HeroCornerDrink
            key={drink.id}
            drink={drink}
            index={i}
            priority={i < 2}
          />
        ))}
      </div>

      <div className="dc-hero__gift">
        <span className="dc-hero__sparkle dc-hero__sparkle--1" aria-hidden="true">
          ✨
        </span>
        <span className="dc-hero__sparkle dc-hero__sparkle--2" aria-hidden="true">
          ✨
        </span>
        <span className="dc-hero__sparkle dc-hero__sparkle--3" aria-hidden="true">
          🫧
        </span>

        <div className="dc-hero__gift-lid" aria-hidden="true">
          <span className="dc-hero__bow">🎀</span>
        </div>

        <div className="dc-hero__headline">
          <p className="dc-hero__eyebrow">Happy Birthday</p>
          <blockquote className="dc-hero__quote">
            {HERO_BIRTHDAY_QUOTE}
          </blockquote>
          <p className="dc-hero__gift-tag">{BIRTHDAY_LABEL}</p>
        </div>

        <div className="dc-hero__gift-box">
          <div className="dc-hero__gift-can">
            <Image
              src={COKE_CAN_IMAGE}
              alt="Main birthday drink"
              width={360}
              height={720}
              className="dc-hero__can-img"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ColdDrinkStory() {
  const { ref, visible } = useScrollRevealStagger<HTMLDivElement>(0.1);

  return (
    <section className="dc-section dc-section--wide dc-serve">
      <RevealBlock>
        <p className="dc-section__label dc-section__heading--center">
          The setup
        </p>
        <h2 className="dc-section__heading dc-section__heading--center">
          So grab your seat i have tried to set up a table for you.
        </h2>
        <p className="dc-section__text dc-section__text--center">
         Ah this is just a kidish setup of making a try of cold drinks for you to enjoy 
         pta nhi tried too much but i know thoda ajeeb sa bna hai mai aur acha kar skta tha but goshh deadline but yeah you can choose you need a bottle paper cup or can
         any ways Happy Birthday Khushi.
        </p>
      </RevealBlock>

      <div
        ref={ref}
        className={`dc-serve__tray ${visible ? "dc-serve__tray--live" : ""}`}
      >
        <div className="dc-serve__light" aria-hidden="true" />
        <div className="dc-serve__table" aria-hidden="true" />

        <div className="dc-drink dc-drink--bottle" aria-hidden="true">
          <span className="dc-bottle__neck" />
          <span className="dc-bottle__body">
            <span className="dc-bottle__label">Birthday<br />Reserve</span>
            <span className="dc-bottle__bubbles" />
          </span>
          <span className="dc-drink__shadow" />
        </div>

        <div className="dc-drink dc-drink--theatre-cup" aria-hidden="true">
          <span className="dc-cup__straw" />
          <span className="dc-cup__lid" />
          <span className="dc-cup__body">
            <span className="dc-cup__stripe" />
            <span className="dc-cup__text">Sip<br />Slow</span>
          </span>
          <span className="dc-drink__shadow" />
        </div>

        <div className="dc-drink dc-drink--cafe-glass" aria-hidden="true">
          <span className="dc-glass__ice dc-glass__ice--1" />
          <span className="dc-glass__ice dc-glass__ice--2" />
          <span className="dc-glass__ice dc-glass__ice--3" />
          <span className="dc-glass__liquid" />
          <span className="dc-glass__foam" />
          <span className="dc-drink__shadow" />
        </div>

        <div className="dc-drink dc-drink--mini-can" aria-hidden="true">
          <Image
            src={COKE_CAN_IMAGE}
            alt=""
            width={120}
            height={240}
            className="dc-mini-can__img"
          />
          <span className="dc-drink__shadow" />
        </div>
      </div>
    </section>
  );
}

function BirthdayLetter() {
  const { ref, visible } = useScrollRevealStagger<HTMLDivElement>(0.12);
  const [sipCount, setSipCount] = useState(0);
  const unlocked = sipCount >= 3;

  const takeSip = () => setSipCount((count) => Math.min(count + 1, 3));

  return (
    <section className="dc-letter-section" aria-label="Birthday letter">
      <RevealBlock>
        <p className="dc-section__label dc-section__heading--center">
          {COKE_LETTER.label}
        </p>
        <h2 className="dc-section__heading dc-section__heading--center">
          Sit. Hold the drink. Then open it.
        </h2>
      </RevealBlock>

      <div className={`dc-sip-ritual ${unlocked ? "dc-sip-ritual--done" : ""}`}>
        <div className="dc-sip-ritual__glass" aria-hidden="true">
          <span className="dc-sip-ritual__straw" />
          <span className="dc-sip-ritual__ice dc-sip-ritual__ice--1" />
          <span className="dc-sip-ritual__ice dc-sip-ritual__ice--2" />
          <span className="dc-sip-ritual__drink" />
          <span className="dc-sip-ritual__bubbles" />
        </div>
        <div className="dc-sip-ritual__copy">
          <p className="dc-sip-ritual__kicker">Before the letter</p>
          <p>
            Yaar kya hai ki , before opening that letter you have t take three sips from this jar then only the letter will open so please go ahead ma'am.
          </p>
          <button
            type="button"
            className="dc-sip-ritual__button"
            onClick={takeSip}
            disabled={unlocked}
            aria-label={unlocked ? "Letter is unlocked" : "Take a sip"}
          >
            {unlocked ? "Letter unlocked" : `Take sip ${sipCount + 1}/3`}
          </button>
          <div className="dc-sip-ritual__dots" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className={dot < sipCount ? "dc-sip-ritual__dot--full" : ""}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className={`dc-letter ${visible && unlocked ? "dc-letter--open" : ""} ${unlocked ? "dc-letter--unlocked" : ""}`}
      >
        <div className="dc-letter__condense" aria-hidden="true" />
        <span className="dc-letter__seal" aria-hidden="true">
          🥤
        </span>

        {!unlocked ? (
          <div className="dc-letter__locked" aria-hidden="true">
            <span>Waiting under the coaster</span>
          </div>
        ) : null}

        <header className="dc-letter__head">
          <time className="dc-letter__date" dateTime="2026-05-26">
            {COKE_LETTER.date}
          </time>
          <p className="dc-letter__salutation">{COKE_LETTER.salutation}</p>
        </header>

        <div className="dc-letter__body">
          {COKE_LETTER.paragraphs.map((para, i) => (
            <p
              key={i}
              className="dc-letter__para"
              style={{ "--i": i } as CSSProperties}
            >
              {para}
            </p>
          ))}
        </div>

        <footer className="dc-letter__foot">
          <p className="dc-letter__closing">{COKE_LETTER.closing}</p>
          <p className="dc-letter__signature">{COKE_LETTER.signature}</p>
          {/* <p className="dc-letter__ps">{COKE_LETTER.postscript}</p> */}
        </footer>
      </div>
    </section>
  );
}

export function DietCokeChapterTwo() {
  const prev = STORY_CHAPTERS[0];
  const next = STORY_CHAPTERS[2];
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = requestAnimationFrame(() => setHeroLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="dc">
      <FloatingBubbles />

      <div className="dc__progress" aria-hidden="true">
        <div
          className="dc__progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="dc__nav-dots" aria-label="Story chapters">
        {STORY_CHAPTERS.map((c, i) => (
          <Link
            key={c.id}
            href={c.path}
            className={`dc__nav-dot ${i <= 1 ? "dc__nav-dot--on" : ""}`}
            aria-label={`Chapter ${c.id}`}
            aria-current={i === 1 ? "step" : undefined}
          />
        ))}
      </nav>

      <header
        className={`dc-hero dc-hero--present ${heroLoaded ? "dc-hero--in" : ""}`}
      >
        <div className="dc-hero__frost" aria-hidden="true" />
        <div className="dc-hero__glow" aria-hidden="true" />

        <PresentHero ready={heroLoaded} />

      </header>

      <div className="dc-light">
        <div className="dc-marquee-wrap" aria-hidden="true">
          <div className="dc-marquee">
            <span>
              ★ RESERVED TABLE · 26 MAY 2026 ★ ICE IN THE GLASS ★ LETTER UNDER THE COASTER ★ BIRTHDAY SIP ★
            </span>
            <span>
              ★ RESERVED TABLE · 26 MAY 2026 ★ ICE IN THE GLASS ★ LETTER UNDER THE COASTER ★ BIRTHDAY SIP ★
            </span>
          </div>
        </div>

        <section className="dc-date-stamp">
          <RevealBlock>
            <div className="dc-date-stamp__inner">
              <p className="dc-date-stamp__label">Official pour date</p>
              <time dateTime="2026-05-26" className="dc-date-stamp__time">
                26<span>May</span>2026
              </time>
              <p className="dc-date-stamp__wish">
                Today i'm celebrating her with something simple and personal: a
                cold drink, and words meant only for her.
              </p>
            </div>
          </RevealBlock>
        </section>

        <ColdDrinkStory />

        <BirthdayLetter />

        <section className="dc-cheers-band" aria-label="Birthday toast">
          <div className="dc-cheers-band__inner">
            <ColaSplash variant="section" />
            <RevealBlock>
              <p className="dc-cheers-band__pre">Raise the can</p>
              <h2 className="dc-cheers-band__title">
                To Khushi  on {BIRTHDAY_LABEL}
              </h2>
              <p className="dc-cheers-band__body">
                May every sip of this year taste like permission to rest, to
                laugh, to dream bigger, and to keep being exactly who you are .
              </p>
            </RevealBlock>
          </div>
        </section>

        <footer className="dc-finale">
          <RevealBlock>
            <div className="dc-finale__burst" aria-hidden="true">
              <span>🥤</span>
              <span>🧊</span>
              <span>🎂</span>
              <span>✨</span>
              <span>❤️</span>
            </div>
            <p className="dc-section__label">End of chapter two</p>
            <h2 className="dc-finale__title">Still fizzing?</h2>
            
            <div className="dc-finale__actions">
              <Link href={prev.path} className="dc-btn dc-btn--ghost">
                ← Chapter 1
              </Link>
              <Link href={next.path} className="dc-btn dc-btn--primary">
                Chapter 3 →
              </Link>
            </div>
            <p className="dc-counter">2 / {STORY_CHAPTERS.length}</p>
          </RevealBlock>
        </footer>
      </div>
    </div>
  );
}
