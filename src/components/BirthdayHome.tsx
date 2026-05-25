"use client";

import { useRouter } from "next/navigation";
import { DesignPanel } from "./DesignPanel";
import { FloatingDecor } from "./FloatingDecor";
import { OtpPinInput } from "./OtpPinInput";
import { BIRTHDAY_OTP } from "@/lib/birthday-code";

type InspoCardData =
  | {
      type: "board";
      rotate: string;
      tag: string;
      title: string;
      body: string;
      variant: "palette" | "tablescape" | "festive";
    }
  | {
      type: "newspaper";
      rotate: string;
      headline: string;
      sub: string;
      body: string;
    }
  | { type: "note"; rotate: string; body: string }
  | { type: "article"; rotate: string; title: string; body: string }
  | { type: "cutout"; rotate: string; words: string[] }
  | { type: "ticket"; rotate: string; event: string; detail: string }
  | { type: "stickers"; rotate: string; items: string[] }
  | { type: "quote"; rotate: string; text: string; author: string }
  | { type: "checklist"; rotate: string; title: string; items: string[] };

const INSPO_CARDS: InspoCardData[] = [
  {
    type: "board",
    rotate: "-2deg",
    tag: "mood board",
    title: "Blush & gold palette",
    body: "Cream tablecloths, dried roses, taper candles — soft light only.",
    variant: "palette",
  },
  {
    type: "stickers",
    rotate: "2deg",
    items: ["🎂", "🥳", "💌", "🕯️", "🎀", "✨", "🍰", "🎁"],
  },
  {
    type: "newspaper",
    rotate: "1.5deg",
    headline: "EXTRA! EXTRA!",
    sub: "The Daily Celebration · Vol. XXVI",
    body: "LOCAL HERO TURNS ANOTHER YEAR BOLDER — town gathers for cake, confetti, and questionable karaoke until midnight.",
  },
  {
    type: "note",
    rotate: "-3deg",
    body: "Reminder: balloons by the door, playlist on shuffle, polaroids in the guest book 📸",
  },
  {
    type: "quote",
    rotate: "1deg",
    text: "Age is merely the number of years the world has been enjoying you.",
    author: "— pinned from the inspo board",
  },
  {
    type: "article",
    rotate: "2deg",
    title: "5 cake trends worth pinning",
    body: "Naked sponge with fresh berries · vintage buttercream rosettes · surprise filling layers.",
  },
  {
    type: "ticket",
    rotate: "-2deg",
    event: "ADMIT ONE",
    detail: "Birthday Bash · Rooftop · 8 PM · Dress code: sparkle optional",
  },
  {
    type: "cutout",
    rotate: "-1deg",
    words: ["HAPPY", "BIRTHDAY", "DEAR"],
  },
  {
    type: "checklist",
    rotate: "1.5deg",
    title: "Party prep",
    items: [
      "Order cake",
      "Hang bunting",
      "Charge camera",
      "Hide the gift",
      "Cue the playlist",
    ],
  },
  {
    type: "board",
    rotate: "3deg",
    tag: "tablescape",
    title: "Garden party inspo",
    body: "Linen runners, mason jars with wildflowers, handwritten place cards.",
    variant: "tablescape",
  },
  {
    type: "newspaper",
    rotate: "-2.5deg",
    headline: "BREAKING: WISHES GRANTED",
    sub: "Birthday Gazette · Late Edition",
    body: "Scientists confirm: one slice of cake equals three compliments and unlimited group hugs.",
  },
  {
    type: "stickers",
    rotate: "-1deg",
    items: ["🎈", "🎊", "🌟", "🧁", "💐", "🪩", "🍾", "🎵"],
  },
  {
    type: "article",
    rotate: "-1.5deg",
    title: "Decor checklist",
    body: "✓ Bunting · ✓ Fairy lights · ✓ Photo wall · ✓ Sparkler exit · ✓ Secret pin box",
  },
  {
    type: "board",
    rotate: "2deg",
    tag: "pin board",
    title: "Festive favs",
    body: "Stickers, ribbons, and all the little details that make it feel magical.",
    variant: "festive",
  },
  {
    type: "note",
    rotate: "2.5deg",
    body: "Playlist order: 90s throwbacks → slow dance → birthday song → chaos 🎶",
  },
  {
    type: "ticket",
    rotate: "1deg",
    event: "VIP WRISTBAND",
    detail: "All-access to cake table · photobooth · and the surprise room",
  },
  {
    type: "quote",
    rotate: "-2deg",
    text: "Another year older, another reason to celebrate louder.",
    author: "— torn from a magazine clipping",
  },
  {
    type: "cutout",
    rotate: "1deg",
    words: ["MAKE", "A", "WISH"],
  },
];

const OTP_INDEX = 9;

export function BirthdayHome() {
  const router = useRouter();
  const beforeOtp = INSPO_CARDS.slice(0, OTP_INDEX);
  const afterOtp = INSPO_CARDS.slice(OTP_INDEX);

  return (
    <div className="birthday-page">
      <FloatingDecor />

      <div className="page-pin page-pin--tl" aria-hidden="true">📌</div>
      <div className="page-pin page-pin--tr" aria-hidden="true">📌</div>
      <div className="page-scrap page-scrap--left" aria-hidden="true">party!</div>
      <div className="page-scrap page-scrap--right" aria-hidden="true">24</div>

      <header className="birthday-hero">
        <span className="birthday-hero__tape birthday-hero__tape--left" />
        <span className="birthday-hero__tape birthday-hero__tape--right" />
        <p className="birthday-hero__scrap">★ Happy birthday ★</p>
        <h1 className="birthday-hero__title">
          A Year Older,
          <em> A Lot More Fabulous</em>
        </h1>
        
        
      </header>

      <div className="masonry">
        {beforeOtp.map((card, i) => (
          <InspoCard key={`card-${i}`} card={card} index={i} />
        ))}

        <section className="masonry__otp masonry__item">
          <div className="otp-frame">
            <span className="otp-frame__tape" />
            <span className="otp-frame__sticker">🎁</span>
            <OtpPinInput
              correctPin={BIRTHDAY_OTP}
              onSuccess={() => {
                router.push("/surprise");
              }}
            />
          </div>
        </section>

        {afterOtp.map((card, i) => (
          <InspoCard key={`card-${i + OTP_INDEX}`} card={card} index={i + OTP_INDEX} />
        ))}
      </div>

      <footer className="birthday-footer">
        <div className="birthday-footer__strip" aria-hidden="true">
          <span>🎂</span><span>✨</span><span>🎈</span><span>🎊</span><span>🧁</span><span>💫</span><span>🎀</span><span>🥳</span>
        </div>
        <p>Made with confetti, washi tape & too much frosting 🧁</p>
      </footer>
    </div>
  );
}

type CardData = InspoCardData;

function InspoCard({ card, index }: { card: CardData; index: number }) {
  const style = {
    "--card-rotate": card.rotate,
    animationDelay: `${index * 0.06}s`,
  } as React.CSSProperties;

  if (card.type === "newspaper") {
    return (
      <article className="masonry__item card card--newspaper" style={style}>
        <p className="card__paper-date">May 26, 2026</p>
        <h3 className="card__headline">{card.headline}</h3>
        <p className="card__subhead">{card.sub}</p>
        <div className="card__rule" />
        <p className="card__body card__body--serif">{card.body}</p>
        <span className="card__cut-corner" aria-hidden="true" />
      </article>
    );
  }

  if (card.type === "cutout") {
    return (
      <article className="masonry__item card card--cutout" style={style}>
        {card.words.map((word) => (
          <span key={word} className="card__cutout-word">
            {word}
          </span>
        ))}
      </article>
    );
  }

  if (card.type === "note") {
    return (
      <article className="masonry__item card card--note" style={style}>
        <span className="card__pushpin" aria-hidden="true">📌</span>
        <p className="card__handwritten">{card.body}</p>
      </article>
    );
  }

  if (card.type === "article") {
    return (
      <article className="masonry__item card card--article" style={style}>
        <span className="card__clip">📎</span>
        <h3 className="card__article-title">{card.title}</h3>
        <p className="card__body">{card.body}</p>
      </article>
    );
  }

  if (card.type === "ticket") {
    return (
      <article className="masonry__item card card--ticket" style={style}>
        <div className="ticket__stub" aria-hidden="true" />
        <p className="ticket__label">Official entry</p>
        <h3 className="ticket__event">{card.event}</h3>
        <p className="ticket__detail">{card.detail}</p>
        <div className="ticket__barcode" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} style={{ height: `${12 + (i % 4) * 6}px` }} />
          ))}
        </div>
      </article>
    );
  }

  if (card.type === "stickers") {
    return (
      <article className="masonry__item card card--stickers" style={style}>
        <p className="card__tag">sticker sheet</p>
        <div className="sticker-grid">
          {card.items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="sticker-grid__item"
              style={{ transform: `rotate(${(i % 5) - 2}deg)` }}
            >
              {item}
            </span>
          ))}
        </div>
      </article>
    );
  }

  if (card.type === "quote") {
    return (
      <article className="masonry__item card card--quote" style={style}>
        <span className="card__quote-mark" aria-hidden="true">&ldquo;</span>
        <p className="card__quote-text">{card.text}</p>
        <p className="card__quote-author">{card.author}</p>
      </article>
    );
  }

  if (card.type === "checklist") {
    return (
      <article className="masonry__item card card--checklist" style={style}>
        <h3 className="card__checklist-title">{card.title}</h3>
        <ul className="card__checklist">
          {card.items.map((item) => (
            <li key={item}>
              <span className="card__checkbox" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article className="masonry__item card card--board" style={style}>
      <DesignPanel variant={card.variant} />
      <p className="card__tag">{card.tag}</p>
      <h3 className="card__board-title">{card.title}</h3>
      <p className="card__body card__body--small">{card.body}</p>
    </article>
  );
}
