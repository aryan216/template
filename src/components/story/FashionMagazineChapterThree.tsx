"use client";

import Link from "next/link";
import { BHARATIYA_RAIL_TICKET } from "@/lib/magazine-photos";
import { STORY_CHAPTERS } from "@/lib/story-chapters";
import { VogueFlipbook } from "./VogueFlipbook";
import { MagazinePhotoBooth } from "./MagazinePhotoBooth";
import "./fashion-magazine.css";

type ClipCard =
  | { type: "note"; rotate: string; body: string; theme: "mirror" }
  | { type: "stickers"; rotate: string; items: string[]; theme: "mirror" }
  | { type: "quote"; rotate: string; text: string; author: string; theme: "portrait" }
  | {
      type: "article";
      rotate: string;
      title: string;
      body: string;
      theme: "portrait";
    }
  | {
      type: "ticket";
      rotate: string;
      theme: "travel";
    }
  | {
      type: "newspaper";
      rotate: string;
      headline: string;
      sub: string;
      body: string;
      theme: "travel";
    }
  | {
      type: "checklist";
      rotate: string;
      title: string;
      items: string[];
      theme: "fits";
    }
  | { type: "cutout"; rotate: string; words: string[]; theme: "fits" };

const CLIPS: ClipCard[] = [
  {
    type: "note",
    theme: "mirror",
    rotate: "-2deg",
    body: " good light > good filter. Mirrors, elevator doors, golden hour windows 🪞",
  },
  {
    type: "stickers",
    theme: "mirror",
    rotate: "2deg",
    items: ["🪞", "📸", "✨", "💄", "👗", "🧳", "☕", "🌅"],
  },
  {
    type: "quote",
    theme: "portrait",
    rotate: "1deg",
    text: "Every mirror selfie is a love letter to yourself.",
    author: "— The Beauty Memo, clipped",
  },
  {
    type: "article",
    theme: "portrait",
    rotate: "-1.5deg",
    title: "Portrait mood: soft focus",
    body: "Candid laugh · quiet stillness · the in-between moments that look like editorials. Shot on instinct, graded by memory.",
  },
  {
    type: "ticket",
    theme: "travel",
    rotate: "-2deg",
  },
  {
    type: "newspaper",
    theme: "travel",
    rotate: "1.5deg",
    headline: "WANDERLUST DISPATCH",
    sub: "The Travel Edit · Weekend Edition · Vol. 05",
    body: "LOCAL STYLE ICON SPOTTED CHASING SUNSETS — café corners, unfamiliar streets, and carry-on outfits that never miss. Continued on page 7: मुंबई → ऋषिकेश, window seat confirmed.",
  },
  {
    type: "checklist",
    theme: "fits",
    rotate: "2deg",
    title: "Outfit rotation",
    items: [
      "Weekend uniform · soft knit",
      "Fashion diary · main character",
      "Travel carry-on chic",
      "Evening minimal · one gold detail",
    ],
  },
  {
    type: "cutout",
    theme: "fits",
    rotate: "-1deg",
    words: ["MAIN", "CHARACTER"],
  },
];

function clipStyle(rotate: string, index: number) {
  return {
    "--clip-rotate": rotate,
    animationDelay: `${index * 0.07}s`,
  } as React.CSSProperties;
}

function EditorialClip({ card, index }: { card: ClipCard; index: number }) {
  const style = clipStyle(card.rotate, index);

  if (card.type === "note") {
    return (
      <article
        className={`mag-clip mag-clip--mirror mag-clip--note`}
        style={style}
      >
        <span className="mag-clip__label">Mirror notes</span>
        <p className="mag-clip__hand">{card.body}</p>
      </article>
    );
  }

  if (card.type === "stickers") {
    return (
      <article
        className={`mag-clip mag-clip--mirror mag-clip--stickers`}
        style={style}
      >
        <span className="mag-clip__label">Mood sheet</span>
        <div className="mag-clip__sticker-row">
          {card.items.map((item, i) => (
            <span key={`${item}-${i}`} className="mag-clip__sticker">
              {item}
            </span>
          ))}
        </div>
      </article>
    );
  }

  if (card.type === "quote") {
    return (
      <article
        className={`mag-clip mag-clip--portrait mag-clip--quote`}
        style={style}
      >
        <span className="mag-clip__pull-mark" aria-hidden="true">
          &ldquo;
        </span>
        <p className="mag-clip__quote">{card.text}</p>
        <p className="mag-clip__cite">{card.author}</p>
      </article>
    );
  }

  if (card.type === "article") {
    return (
      <article
        className={`mag-clip mag-clip--portrait mag-clip--article`}
        style={style}
      >
        <span className="mag-clip__label">Editorial</span>
        <h3 className="mag-clip__title">{card.title}</h3>
        <p className="mag-clip__body">{card.body}</p>
      </article>
    );
  }

  if (card.type === "ticket") {
    const t = BHARATIYA_RAIL_TICKET;
    return (
      <article
        className={`mag-clip mag-clip--travel mag-clip--ticket mag-clip--ir`}
        style={style}
      >
        <div className="mag-clip__perforation" aria-hidden="true" />
        <div className="mag-clip__ir-stripe" aria-hidden="true">
          <span>🚆</span>
        </div>
        <p className="mag-clip__label mag-clip__label--hindi">{t.label}</p>
        <h3 className="mag-clip__ticket-head mag-clip__ticket-head--hindi">
          {t.railway}
        </h3>
        <p className="mag-clip__ir-train">
          {t.train} · {t.trainNo}
        </p>
        <p className="mag-clip__ir-pnr">
          <span>PNR</span> {t.pnr}
        </p>
        <div className="mag-clip__ir-route">
          <span>{t.from}</span>
          <span className="mag-clip__ir-arrow" aria-hidden="true">
            →
          </span>
          <span>{t.to}</span>
        </div>
        <p className="mag-clip__ir-meta">
          {t.travelClass} · {t.seat}
        </p>
        <p className="mag-clip__ir-date">{t.date}</p>
        <p className="mag-clip__body mag-clip__body--small mag-clip__body--hindi">
          {t.note}
        </p>
        <div className="mag-clip__barcode" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} style={{ height: `${10 + (i % 4) * 5}px` }} />
          ))}
        </div>
      </article>
    );
  }

  if (card.type === "newspaper") {
    return (
      <article
        className={`mag-clip mag-clip--travel mag-clip--paper`}
        style={style}
      >
        <p className="mag-clip__dateline">May 26, 2026</p>
        <h3 className="mag-clip__headline">{card.headline}</h3>
        <p className="mag-clip__subhead">{card.sub}</p>
        <div className="mag-clip__rule" />
        <p className="mag-clip__body mag-clip__body--serif">{card.body}</p>
      </article>
    );
  }

  if (card.type === "cutout") {
    return (
      <article
        className={`mag-clip mag-clip--fits mag-clip--cutout`}
        style={style}
      >
        {card.words.map((word) => (
          <span key={word} className="mag-clip__cutout-word">
            {word}
          </span>
        ))}
      </article>
    );
  }

  return (
    <article
      className={`mag-clip mag-clip--fits mag-clip--checklist`}
      style={style}
    >
      <span className="mag-clip__label">Lookbook</span>
      <h3 className="mag-clip__title">{card.title}</h3>
      <ul className="mag-clip__list">
        {card.items.map((item) => (
          <li key={item}>
            <span className="mag-clip__tick" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function FashionMagazineChapterThree() {
  const prev = STORY_CHAPTERS[1];
  const next = STORY_CHAPTERS[3];
  const beforeVogue = CLIPS.slice(0, 4);
  const afterVogue = CLIPS.slice(4);

  return (
    <div className="mag-spread">
      <div className="mag-spread__grain" aria-hidden="true" />
      <div className="mag-spread__glow mag-spread__glow--left" aria-hidden="true" />
      <div className="mag-spread__glow mag-spread__glow--right" aria-hidden="true" />

      <nav className="mag-spread__chapters" aria-label="Story chapters">
        {STORY_CHAPTERS.map((c, i) => (
          <Link
            key={c.id}
            href={c.path}
            className={`mag-spread__chapter-dot ${i <= 2 ? "mag-spread__chapter-dot--on" : ""}`}
            aria-label={`Chapter ${c.id}`}
            aria-current={i === 2 ? "step" : undefined}
          />
        ))}
      </nav>

      <header className="mag-spread__header">
        <p className="mag-spread__chapter">Chapter three</p>
        <h1 className="mag-spread__title">
          Her aesthetic
          <span>spread</span>
        </h1>
        
      </header>

      <div className="mag-spread__desk">
        <div className="mag-spread__col mag-spread__col--left">
          {beforeVogue.map((card, i) => (
            <EditorialClip key={`clip-${i}`} card={card} index={i} />
          ))}
        </div>

        <section className="mag-spread__center" aria-label="Vogue magazine book">
          <VogueFlipbook />
        </section>

        <div className="mag-spread__col mag-spread__col--right">
          {afterVogue.map((card, i) => (
            <EditorialClip
              key={`clip-${i + 4}`}
              card={card}
              index={i + 4}
            />
          ))}
        </div>
      </div>

      <MagazinePhotoBooth />

      <footer className="mag-spread__footer">
        <p className="mag-spread__footer-line">
          Mirror selfies · portraits · travel · style file
        </p>
        <div className="mag-spread__nav">
          <Link href={prev.path} className="mag-spread__nav-btn mag-spread__nav-btn--ghost">
            ← Chapter 2
          </Link>
          <span className="mag-spread__nav-count">
            3 / {STORY_CHAPTERS.length}
          </span>
          <Link href={next.path} className="mag-spread__nav-btn mag-spread__nav-btn--solid">
            Chapter 5 →
          </Link>
        </div>
      </footer>
    </div>
  );
}
