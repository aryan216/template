"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import {
  BHARATIYA_RAIL_TICKET,
  MAG_COVER,
  MAG_EDITORIAL_PHOTOS,
  type MagEditorialPhoto,
  type MagPhotoKey,
} from "@/lib/magazine-photos";
import {
  MAGAZINE_BOOK_PAGES,
  MAG_BOOK_PAGE_COUNT,
  MAG_TOC_ENTRIES,
  type MagazineBookPageDef,
} from "@/lib/magazine-book-pages";
import { MagazineBookPage } from "./MagazineBookPage";
import { MagazinePhotoSlot } from "./MagazinePhotoSlot";
import { VogueMasthead } from "./VogueMasthead";
import "page-flip/src/Style/stPageFlip.css";
import "./vogue-flipbook.css";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

type FlipBookRef = {
  pageFlip: () => {
    flipNext: (corner?: string) => void;
    flipPrev: (corner?: string) => void;
    getPageCount: () => number;
    getCurrentPageIndex: () => number;
  };
};

function BookCoverPage() {
  return (
    <div className="mag-book-cover">
      <div className="mag-book-cover__bg" aria-hidden="true" />
      <p className="mag-book-cover__edition">{MAG_COVER.edition}</p>
      <VogueMasthead />
      <div className="mag-book-cover__photo">
        <MagazinePhotoSlot
          src={MAG_COVER.coverSrc}
          alt={MAG_COVER.coverAlt}
          label="Cover portrait"
          hint={`/photos/${MAG_COVER.coverHint}`}
          kicker="Cover story"
          caption="Her birthday edit — the issue that reads like a love letter in gloss."
          credit="May 2026 · Special edition"
        />
      </div>
      <div className="mag-book-cover__feature">
        <p className="mag-book-cover__headline">{MAG_COVER.mainHeadline}</p>
        <p className="mag-book-cover__sub">{MAG_COVER.mainSubhead}</p>
      </div>
    </div>
  );
}

function BookBackPage() {
  return (
    <div className="mag-book-back">
      <p className="mag-book-back__masthead">VOGUE</p>
      <p className="mag-book-back__wish">Happy Birthday · 26 May 2026</p>
      <p className="mag-book-back__line">
        Mirror selfies · portraits · travel · style file
      </p>
    </div>
  );
}

function RailTicketMini() {
  const t = BHARATIYA_RAIL_TICKET;
  return (
    <div className="mag-book-rail">
      <p className="mag-book-rail__title">{t.railway}</p>
      <p className="mag-book-rail__train">
        {t.train} · {t.trainNo}
      </p>
      <p className="mag-book-rail__route">
        {t.from} → {t.to}
      </p>
      <p className="mag-book-rail__meta">
        {t.travelClass} · {t.seat}
      </p>
      <p className="mag-book-rail__date">{t.date}</p>
    </div>
  );
}

function BookFolio({ pageNo }: { pageNo?: number }) {
  if (!pageNo) return null;
  return (
    <footer className="mag-book-page__folio">
      <span className="mag-book-page__folio-no">{pageNo}</span>
      <span className="mag-book-page__folio-brand">Vogue · May 2026</span>
    </footer>
  );
}

function BookEditorialPhoto({
  photoKey,
  captionPlacement = "overlay",
}: {
  photoKey: MagPhotoKey;
  captionPlacement?: "overlay" | "below";
}) {
  const photo: MagEditorialPhoto = MAG_EDITORIAL_PHOTOS[photoKey];
  return (
    <div className="mag-book-editorial-photo">
      <MagazinePhotoSlot
        src={photo.src}
        alt={photo.alt}
        label={photo.caption}
        fileHint={photo.fileHint}
        hint={`Set src to "${photo.fileHint}" in magazine-photos.ts`}
        kicker={photo.kicker}
        caption={photo.caption}
        credit={photo.credit}
        captionPlacement={captionPlacement}
      />
    </div>
  );
}

function BookEditorialCopy({
  page,
  compact = false,
  showExtra = false,
}: {
  page: MagazineBookPageDef;
  compact?: boolean;
  /** Show bodyExtra even in compact mode (e.g. editor's letter P.S.) */
  showExtra?: boolean;
}) {
  return (
    <div className={compact ? "mag-book-copy mag-book-copy--compact" : "mag-book-copy"}>
      {page.label && <p className="mag-book-page__label">{page.label}</p>}
      {page.title && <h2 className="mag-book-page__title">{page.title}</h2>}
      {!compact && page.deck && <p className="mag-book-page__deck">{page.deck}</p>}
      {page.body && (
        <p
          className={`mag-book-page__body ${compact ? "mag-book-page__body--letter" : "mag-book-page__body--lead"}`.trim()}
        >
          {page.body}
        </p>
      )}
      {(showExtra || !compact) && page.bodyExtra && (
        <p className="mag-book-page__body mag-book-page__body--extra">{page.bodyExtra}</p>
      )}
      {!compact && page.byline && <p className="mag-book-page__byline">{page.byline}</p>}
    </div>
  );
}

function PageContent({ page }: { page: MagazineBookPageDef }) {
  switch (page.variant) {
    case "cover":
      return <BookCoverPage />;
    case "back":
      return <BookBackPage />;
    case "contents":
      return (
        <>
          <p className="mag-book-page__label">{page.label}</p>
          <h2 className="mag-book-page__title">{page.title ?? "The Edit"}</h2>
          <p className="mag-book-page__contents-intro">
            In this issue — mirror moods, portrait studies, the rail route north, and
            the fits that feel most like her.
          </p>
          <ol className="mag-book-page__toc">
            {MAG_TOC_ENTRIES.map((entry) => (
              <li key={entry.page}>
                <span className="mag-book-page__toc-label">{entry.label}</span>
                <span className="mag-book-page__toc-dots" aria-hidden="true" />
                <span className="mag-book-page__toc-page">{entry.page}</span>
              </li>
            ))}
          </ol>
          <BookFolio pageNo={page.pageNo} />
        </>
      );
    case "mirror":
      return (
        <>
          <BookEditorialCopy page={page} />
          {page.photoKey && (
            <BookEditorialPhoto photoKey={page.photoKey as MagPhotoKey} />
          )}
          <div className="mag-book-page__stickers" aria-hidden="true">
            <span>🪞</span>
            <span>📸</span>
            <span>✨</span>
          </div>
          <BookFolio pageNo={page.pageNo} />
        </>
      );
    case "travel":
      return (
        <>
          <BookEditorialCopy page={page} />
          {page.photoKey && (
            <BookEditorialPhoto photoKey={page.photoKey as MagPhotoKey} />
          )}
          <RailTicketMini />
          <BookFolio pageNo={page.pageNo} />
        </>
      );
    case "quote":
      return (
        <>
          <blockquote className="mag-book-quote">
            <span className="mag-book-quote__mark">&ldquo;</span>
            <p>{page.quote}</p>
            <cite>{page.cite}</cite>
          </blockquote>
          <p className="mag-book-quote__folio">Beauty · Self-portrait</p>
          <BookFolio pageNo={page.pageNo} />
        </>
      );
    case "letter":
      return (
        <div className="mag-book-letter">
          <BookEditorialCopy page={page} compact showExtra />
          {page.photoKey && (
            <BookEditorialPhoto
              photoKey={page.photoKey as MagPhotoKey}
              captionPlacement="below"
            />
          )}
          <p className="mag-book-page__sign">With love always ×</p>
          <BookFolio pageNo={page.pageNo} />
        </div>
      );
    case "spread":
      return (
        <>
          <BookEditorialCopy page={page} />
          {page.photoKey ? (
            <BookEditorialPhoto
              photoKey={page.photoKey as MagPhotoKey}
              captionPlacement="below"
            />
          ) : (
            <aside className="mag-book-sidebar" aria-label="Editorial notes">
  <p className="mag-book-sidebar__rule" />
  <p className="mag-book-sidebar__item">
    <strong>Staples</strong> — oversized layers, clean denim, and effortless basics.
  </p>
  <p className="mag-book-sidebar__item">
    <strong>Accessories</strong> — silver jewelry, slick hair, and confidence first.
  </p>
  <p className="mag-book-sidebar__item">
    <strong>Energy</strong> — dress like the city is secretly watching you.
  </p>
</aside>
          )}
          <BookFolio pageNo={page.pageNo} />
        </>
      );
    case "portrait":
      return (
        <>
          <BookEditorialCopy page={page} />
          {page.photoKey && (
            <BookEditorialPhoto photoKey={page.photoKey as MagPhotoKey} />
          )}
          <BookFolio pageNo={page.pageNo} />
        </>
      );
    default:
      return (
        <>
          <BookEditorialCopy page={page} />
          <BookFolio pageNo={page.pageNo} />
        </>
      );
  }
}

export function VogueFlipbook() {
  const bookRef = useRef<FlipBookRef>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const onFlip = useCallback((e: { data: number }) => {
    setPageIndex(e.data);
  }, []);

  const onInit = useCallback(() => {
    setReady(true);
  }, []);

  const flipNext = () => {
    bookRef.current?.pageFlip()?.flipNext("top");
  };

  const flipPrev = () => {
    bookRef.current?.pageFlip()?.flipPrev("top");
  };

  const isFirst = pageIndex <= 0;
  const isLast = pageIndex >= MAG_BOOK_PAGE_COUNT - 1;

  return (
    <div className="vogue-book-wrap">
      <p className="vogue-book-hint">
        <span className="vogue-book-hint__corner" aria-hidden="true" />
        Drag the curled corner or click edges to turn pages
      </p>

      <div className={`vogue-book-stage ${ready ? "vogue-book-stage--ready" : ""}`}>
        <HTMLFlipBook
          ref={bookRef}
          className="vogue-book"
          style={{}}
          width={340}
          height={510}
          size="stretch"
          minWidth={260}
          maxWidth={380}
          minHeight={390}
          maxHeight={560}
          startPage={0}
          startZIndex={0}
          autoSize
          disableFlipByClick={false}
          showCover
          showPageCorners
          drawShadow
          maxShadowOpacity={0.6}
          flippingTime={850}
          usePortrait
          useMouseEvents
          mobileScrollSupport
          swipeDistance={28}
          clickEventForward={false}
          onFlip={onFlip}
          onInit={onInit}
        >
          {MAGAZINE_BOOK_PAGES.map((page, i) => {
            const isHard = i === 0 || i === MAGAZINE_BOOK_PAGES.length - 1;
            return (
              <MagazineBookPage
                key={page.id}
                hard={isHard}
                className={`mag-book-page--${page.variant}`}
              >
                <PageContent page={page} />
              </MagazineBookPage>
            );
          })}
        </HTMLFlipBook>
      </div>

      <div className="vogue-book-controls">
        <button
          type="button"
          className="vogue-book-controls__btn"
          onClick={flipPrev}
          disabled={isFirst}
          aria-label="Previous page"
        >
          ← Prev
        </button>
        <span className="vogue-book-controls__count">
          {pageIndex + 1} / {MAG_BOOK_PAGE_COUNT}
        </span>
        <button
          type="button"
          className="vogue-book-controls__btn vogue-book-controls__btn--next"
          onClick={flipNext}
          disabled={isLast}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
