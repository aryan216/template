"use client";

import Link from "next/link";
import { FloatingDecor } from "@/components/FloatingDecor";
import type { StoryChapter } from "@/lib/story-chapters";
import { STORY_CHAPTERS } from "@/lib/story-chapters";

const Box = "div" as keyof JSX.IntrinsicElements;

type StoryChapterViewProps = {
  chapter: StoryChapter;
  chapterIndex: number;
};

export function StoryChapterView({ chapter, chapterIndex }: StoryChapterViewProps) {
  const Wrapper = Box;
  const prev = chapterIndex > 0 ? STORY_CHAPTERS[chapterIndex - 1] : null;
  const next =
    chapterIndex < STORY_CHAPTERS.length - 1
      ? STORY_CHAPTERS[chapterIndex + 1]
      : null;

  return (
    <Wrapper className="story-page">
      <FloatingDecor />

      <Wrapper className="story-progress" aria-label="Story progress">
        {STORY_CHAPTERS.map((c, i) => (
          <Link
            key={c.id}
            href={c.path}
            className={`story-progress__dot ${i <= chapterIndex ? "story-progress__dot--active" : ""} ${i === chapterIndex ? "story-progress__dot--current" : ""}`}
            aria-label={`Chapter ${c.id}`}
            aria-current={i === chapterIndex ? "step" : undefined}
          />
        ))}
      </Wrapper>

      <article className={`story-chapter story-chapter--${chapter.variant}`}>
        <span className="story-chapter__tape" aria-hidden="true" />

        <p className="story-chapter__eyebrow">{chapter.eyebrow}</p>

        {chapter.variant === "newspaper" ? (
          <p className="story-chapter__paper-date">May 26, 2026</p>
        ) : null}

        {chapter.variant === "finale" && chapter.cutoutWords ? (
          <Wrapper className="story-chapter__cutouts" aria-hidden="true">
            {chapter.cutoutWords.map((word) => (
              <span key={word} className="story-chapter__cutout-word">
                {word}
              </span>
            ))}
          </Wrapper>
        ) : null}

        <h1 className="story-chapter__title">
          {chapter.title}
          {chapter.titleEm ? <em>{chapter.titleEm}</em> : null}
        </h1>

        {chapter.variant === "newspaper" ? (
          <div className="story-chapter__rule" />
        ) : null}

        <p className="story-chapter__body">{chapter.body}</p>

        {chapter.variant === "gate" && chapter.extras ? (
          <Wrapper className="story-chapter__stamps" aria-hidden="true">
            {chapter.extras.map((icon, i) => (
              <span key={i} className="story-chapter__stamp">
                {icon}
              </span>
            ))}
          </Wrapper>
        ) : null}

        {chapter.extras && chapter.variant !== "gate" ? (
          <ul className={`story-chapter__extras story-chapter__extras--${chapter.variant}`}>
            {chapter.extras.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {chapter.variant === "finale" ? (
          <Wrapper className="story-chapter__finale-burst" aria-hidden="true">
            <span>{"\u{1F382}"}</span>
            <span>{"\u{1F388}"}</span>
            <span>{"\u{1F38A}"}</span>
            <span>{"\u{2728}"}</span>
            <span>{"\u{1F973}"}</span>
          </Wrapper>
        ) : null}
      </article>

      <nav className="story-nav">
        {prev ? (
          <Link href={prev.path} className="story-nav__btn story-nav__btn--prev">
            {"\u2190"} {prev.id === 1 ? "Start" : `Ch. ${prev.id}`}
          </Link>
        ) : (
          <Link href="/" className="story-nav__btn story-nav__btn--prev">
            {"\u2190"} Inspo board
          </Link>
        )}

        {next ? (
          <Link href={next.path} className="story-nav__btn story-nav__btn--next">
            Continue {"\u2192"}
          </Link>
        ) : (
          <Link href="/" className="story-nav__btn story-nav__btn--next">
            Back to start {"\u2192"}
          </Link>
        )}
      </nav>

      <p className="story-chapter__counter">
        {chapterIndex + 1} / {STORY_CHAPTERS.length}
      </p>
    </Wrapper>
  );
}
