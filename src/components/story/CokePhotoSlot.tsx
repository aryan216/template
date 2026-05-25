import Image from "next/image";

type CokePhotoSlotProps = {
  src?: string;
  alt: string;
  label: string;
  hint?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function CokePhotoSlot({
  src,
  alt,
  label,
  hint = "Add src in coke-photos.ts",
  className = "",
  sizes = "(max-width: 640px) 90vw, 320px",
  priority = false,
}: CokePhotoSlotProps) {
  const hasImage = Boolean(src && src.trim().length > 0);

  if (hasImage) {
    return (
      <Image
        src={src!}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`dc-photo-slot__img ${className}`.trim()}
      />
    );
  }

  return (
    <div className={`dc-photo-placeholder ${className}`.trim()}>
      <span className="dc-photo-placeholder__fizz" aria-hidden="true">
        🫧
      </span>
      <span className="dc-photo-placeholder__icon" aria-hidden="true">
        🥤
      </span>
      <span className="dc-photo-placeholder__label">{label}</span>
      <span className="dc-photo-placeholder__hint">{hint}</span>
    </div>
  );
}
