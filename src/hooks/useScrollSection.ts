"use client";

import { useEffect, useRef, useState } from "react";

/** 0→1 while the element travels through the viewport (for pour / splash fills). */
export function useScrollSection<T extends HTMLElement>(offset = 0.15) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * (1 - offset);
      const end = vh * offset;
      const raw = (start - rect.top) / (start - end + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [offset]);

  return { ref, progress };
}

export function useScrollRevealStagger<T extends HTMLElement>(
  threshold = 0.12,
  rootMargin = "0px 0px -6% 0px"
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
