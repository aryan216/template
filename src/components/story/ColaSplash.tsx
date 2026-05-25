"use client";

import Image from "next/image";
import { COKE_SPLASH_ASSETS } from "@/lib/coke-photos";

type ColaSplashProps = {
  variant?: "hero" | "section" | "spill" | "corner";
  className?: string;
  animate?: boolean;
};

/** CSS cola splash + optional image asset from /public/photos */
export function ColaSplash({
  variant = "section",
  className = "",
  animate = true,
}: ColaSplashProps) {
  const asset =
    variant === "spill" ? COKE_SPLASH_ASSETS.spill : COKE_SPLASH_ASSETS.splash;

  const hasAsset = Boolean(asset?.trim().length);
  const sizes =
    variant === "spill"
      ? "100vw"
      : variant === "hero"
        ? "(max-width: 768px) 90vw, 520px"
        : variant === "corner"
          ? "200px"
          : "(max-width: 768px) 80vw, 600px";

  return (
    <div
      className={`dc-cola-splash dc-cola-splash--${variant} ${hasAsset ? "dc-cola-splash--image" : ""} ${animate ? "dc-cola-splash--animate" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      {hasAsset ? (
        <Image
          src={asset}
          alt=""
          fill
          className="dc-cola-splash__asset"
          sizes={sizes}
          priority={variant === "hero"}
        />
      ) : (
        <>
          <span className="dc-cola-splash__blob dc-cola-splash__blob--1" />
          <span className="dc-cola-splash__blob dc-cola-splash__blob--2" />
          <span className="dc-cola-splash__blob dc-cola-splash__blob--3" />
          <span className="dc-cola-splash__droplet dc-cola-splash__droplet--1" />
          <span className="dc-cola-splash__droplet dc-cola-splash__droplet--2" />
          <span className="dc-cola-splash__droplet dc-cola-splash__droplet--3" />
          <span className="dc-cola-splash__droplet dc-cola-splash__droplet--4" />
        </>
      )}
    </div>
  );
}
