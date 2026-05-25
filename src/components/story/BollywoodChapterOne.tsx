"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CUTOUT_PHOTOS,
  GALLERY_PHOTOS,
  REEL_PHOTOS,
} from "@/lib/bollywood-photos";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { STORY_CHAPTERS } from "@/lib/story-chapters";
import { FilmPhotoSlot } from "./FilmPhotoSlot";
import { FilmReelStrip } from "./FilmReelStrip";
import "./bollywood-film.css";

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.12);
  const delayClass = delay > 0 ? `bfilm-reveal--delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`bfilm-reveal ${visible ? "bfilm-reveal--visible" : ""} ${delayClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function BollywoodChapterOne() {
  const next = STORY_CHAPTERS[1];
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div className="bfilm">
      <div className="bfilm__grain" aria-hidden="true" />
      <div className="bfilm__progress" aria-hidden="true">
        <div
          className="bfilm__progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className="bfilm__nav-dots" aria-label="Story chapters">
        {STORY_CHAPTERS.map((c, i) => (
          <Link
            key={c.id}
            href={c.path}
            className={`bfilm__nav-dot ${i === 0 ? "bfilm__nav-dot--on" : ""}`}
            aria-label={`Chapter ${c.id}`}
            aria-current={i === 0 ? "step" : undefined}
          />
        ))}
      </nav>

      <header className="bfilm-hero">
        <div className="bfilm-hero__bg" aria-hidden="true" />
        <div className="bfilm-hero__ornament" aria-hidden="true" />
        <div className="bfilm-hero__content">
          <p className="bfilm-hero__studio">Dharma Productions presents</p>
          <h1 className="bfilm-hero__title">BLOCKBUSTER</h1>
          <p className="bfilm-hero__hindi">जन्मदिन की शुरुआत</p>
          <p className="bfilm-hero__sub">
            So just in case you have told that you like bollywood only,  swap in your
            own photos in a bollywood way only.
          </p>
          <div className="bfilm-scroll-hint" aria-hidden="true">
            <span>Scroll the story</span>
            <span className="bfilm-scroll-hint__line" />
          </div>
        </div>
      </header>

      <div className="bfilm-light">
      <div className="bfilm-marquee-wrap" aria-hidden="true">
        <div className="bfilm-marquee">
          <span>
            ★ PICTURE ABHI BAAKI HAI ★ INTERVAL ★ BIRTHDAY BLOCKBUSTER ★ FILMY CHAPTER ONE ★
          </span>
          <span>
            ★ PICTURE ABHI BAAKI HAI ★ INTERVAL ★ BIRTHDAY BLOCKBUSTER ★ FILMY CHAPTER ONE ★
          </span>
        </div>
      </div>

      <section className="bfilm-section bfilm-section--intro">
        <RevealBlock>
          <div className="bfilm-section__intro-grid">
            <div>
              <p className="bfilm-section__label">Act I — The cutouts</p>
              <h2 className="bfilm-section__heading">
                Frames torn from your story
              </h2>
              
              
            </div>
            <div className="bfilm-sprocket-deco" aria-hidden="true">
              <span /><span /><span /><span /><span /><span />
            </div>
          </div>
        </RevealBlock>
      </section>

      <section className="bfilm-cutout-stage" aria-label="Photo cutout collage">
        <div className="bfilm-cutout-stage__reel-edge bfilm-cutout-stage__reel-edge--left" aria-hidden="true" />
        <div className="bfilm-cutout-stage__reel-edge bfilm-cutout-stage__reel-edge--right" aria-hidden="true" />

        <RevealBlock className="bfilm-cutout-stage__inner">
          {CUTOUT_PHOTOS.map((cutout) => (
            <figure
              key={cutout.id}
              className={`bfilm-cutout bfilm-cutout--${cutout.pos}`}
            >
              <div
                className={`bfilm-cutout__img-wrap bfilm-cutout__img-wrap--${cutout.torn}`}
                style={{ aspectRatio: cutout.aspect }}
              >
                <FilmPhotoSlot
                  src={cutout.src}
                  alt={cutout.alt}
                  label={cutout.tag}
                  hint="Your photo here"
                />
              </div>
              <figcaption className="bfilm-cutout__tag">{cutout.tag}</figcaption>
            </figure>
          ))}
        </RevealBlock>
      </section>

      <section className="bfilm-section bfilm-section--reel-header">
        <RevealBlock delay={1}>
          <p className="bfilm-section__label">Act II — The film reel</p>
          <h2 className="bfilm-section__heading bfilm-section__heading--center">
            Scrolling through the premiere
          </h2>
         
        </RevealBlock>
      </section>

      <FilmReelStrip photos={REEL_PHOTOS} />

      <section className="bfilm-gallery">
        <RevealBlock>
          <p className="bfilm-section__label">Act III — Memory wall</p>
          <h2 className="bfilm-section__heading bfilm-section__heading--center">
            Upcoming Movies
          </h2>
        </RevealBlock>
        <RevealBlock delay={1}>
          <div className="bfilm-gallery__grid">
            {GALLERY_PHOTOS.map((photo) => (
              <figure key={photo.id} className="bfilm-gallery__card">
                <div className="bfilm-gallery__frame">
                  <span className="bfilm-gallery__frame-no">{photo.frameNo}</span>
                  <FilmPhotoSlot
                    src={photo.src}
                    alt={photo.alt}
                    label={photo.caption}
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </RevealBlock>
      </section>

 

      <footer className="bfilm-finale">
        <RevealBlock>
          <div className="bfilm-finale__reel-icon" aria-hidden="true">
            <span className="bfilm-finale__reel-spool" />
          </div>
          <p className="bfilm-section__label">End of Act I</p>
          <h2 className="bfilm-finale__title">The story continues…</h2>
          <p className="bfilm-section__text bfilm-section__text--center">
            Four chapters. One birthday. Add your photos, then roll into chapter two.
          </p>
          <div className="bfilm-finale__actions">
            <Link href="/" className="bfilm-btn bfilm-btn--ghost">
              ← Back to inspo board
            </Link>
            <Link href={next.path} className="bfilm-btn bfilm-btn--primary">
              Chapter 2 →
            </Link>
          </div>
          <p className="bfilm-counter">1 / {STORY_CHAPTERS.length}</p>
        </RevealBlock>
      </footer>
      </div>
    </div>
  );
}
