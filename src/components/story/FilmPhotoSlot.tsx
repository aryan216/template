import Image from "next/image";

type FilmPhotoSlotProps = {
  src?: string;
  alt: string;
  label: string;
  hint?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function FilmPhotoSlot({
  src,
  alt,
  label,
  hint = "Add src in bollywood-photos.ts",
  className = "",
  sizes = "(max-width: 640px) 50vw, 280px",
  priority = false,
}: FilmPhotoSlotProps) {
  const hasImage = Boolean(src && src.trim().length > 0);

  if (hasImage) {
    return (
      <Image
        src={src!}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`bfilm-photo-slot__img ${className}`.trim()}
      />
    );
  }

  return (
    <div className={`bfilm-photo-placeholder ${className}`.trim()}>
      <span className="bfilm-photo-placeholder__frame-no" aria-hidden="true">
        +
      </span>
      <span className="bfilm-photo-placeholder__icon" aria-hidden="true">
        {"\u{1F3AC}"}
      </span>
      <span className="bfilm-photo-placeholder__label">{label}</span>
      <span className="bfilm-photo-placeholder__hint">{hint}</span>
    </div>
  );
}
