import Image from "next/image";
import type { CSSProperties } from "react";
import type { HeroCornerDrink as HeroCornerDrinkType } from "@/lib/coke-photos";

type HeroCornerDrinkProps = {
  drink: HeroCornerDrinkType;
  index: number;
  priority?: boolean;
};

export function HeroCornerDrink({ drink, index, priority = false }: HeroCornerDrinkProps) {
  const hasImage = Boolean(drink.src && drink.src.trim().length > 0);

  return (
    <figure
      className={`dc-hero__corner dc-hero__corner--${drink.corner}`}
      style={{ "--corner-i": index } as CSSProperties}
    >
      <div className="dc-hero__corner-media">
        {hasImage ? (
          <Image
            src={drink.src!}
            alt={drink.alt}
            width={200}
            height={240}
            sizes="(max-width: 768px) 28vw, 180px"
            priority={priority}
            className="dc-hero__corner-img"
          />
        ) : (
          <div className="dc-hero__corner-placeholder">
            <span className="dc-hero__corner-icon" aria-hidden="true">
              🥤
            </span>
            <span className="dc-hero__corner-label">{drink.label}</span>
            <span className="dc-hero__corner-hint">
              /photos/{drink.fileHint}
            </span>
          </div>
        )}
      </div>
      <figcaption>{drink.label}</figcaption>
    </figure>
  );
}
