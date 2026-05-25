"use client";

import { useState } from "react";

type MagazinePhotoSlotProps = {
  src?: string;
  alt: string;
  label: string;
  hint?: string;
  fileHint?: string;
  kicker?: string;
  caption?: string;
  credit?: string;
  className?: string;
  captionPlacement?: "overlay" | "below";
};

function PlaceholderContent({
  label,
  hint,
  fileHint,
}: {
  label: string;
  hint: string;
  fileHint?: string;
}) {
  return (
    <>
      <span className="mag-photo-placeholder__icon" aria-hidden="true">
        📸
      </span>
      <span className="mag-photo-placeholder__label">{label}</span>
      {fileHint && (
        <code className="mag-photo-placeholder__path">public{fileHint}</code>
      )}
      <span className="mag-photo-placeholder__hint">{hint}</span>
    </>
  );
}

/** Native img — reliable inside react-pageflip (Next/Image often fails there). */
export function MagazinePhotoSlot({
  src,
  alt,
  label,
  hint = "Then set src in magazine-photos.ts",
  fileHint,
  kicker,
  caption,
  credit,
  className = "",
  captionPlacement = "overlay",
}: MagazinePhotoSlotProps) {
  const [failed, setFailed] = useState(false);
  const hasSrc = Boolean(src && src.trim().length > 0);
  const showImage = hasSrc && !failed;
  const showCaption = Boolean(caption || credit || kicker);

  return (
    <figure
      className={`mag-photo-figure mag-photo-figure--${captionPlacement} ${className}`.trim()}
    >
      <div className="mag-photo-figure__frame">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="mag-photo-slot__img"
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="mag-photo-placeholder">
            <PlaceholderContent label={label} hint={hint} fileHint={fileHint} />
          </div>
        )}

        {showCaption && captionPlacement === "overlay" && showImage && (
          <div className="mag-photo-figure__overlay-caption" aria-hidden="true">
            {kicker && <span className="mag-photo-figure__kicker">{kicker}</span>}
            {caption && <span className="mag-photo-figure__line">{caption}</span>}
            {credit && <span className="mag-photo-figure__credit">{credit}</span>}
          </div>
        )}
      </div>

      {showCaption && captionPlacement === "below" && (
        <figcaption
          className={`mag-photo-figure__caption ${!showImage ? "mag-photo-figure__caption--muted" : ""}`}
        >
          {kicker && <span className="mag-photo-figure__kicker">{kicker}</span>}
          {caption && <span className="mag-photo-figure__line">{caption}</span>}
          {credit && <span className="mag-photo-figure__credit">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
