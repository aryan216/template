/**
 * Vogue flipbook — page copy (10 pages).
 * Photo src + captions: magazine-photos.ts (`photoKey` per page).
 */

export type MagazineBookPageDef = {
  id: string;
  variant:
    | "cover"
    | "contents"
    | "spread"
    | "mirror"
    | "portrait"
    | "travel"
    | "quote"
    | "letter"
    | "back";
  label?: string;
  title?: string;
  /** Subhead under the headline — Vogue deck line */
  deck?: string;
  body?: string;
  /** Extra editorial copy (does not replace `body`) */
  bodyExtra?: string;
  byline?: string;
  bullets?: string[];
  /** Contents TOC page number */
  tocPage?: number;
  quote?: string;
  cite?: string;
  photoKey?: string;
  pageNo?: number;
};

export const MAGAZINE_BOOK_PAGES: MagazineBookPageDef[] = [
  { id: "p1", variant: "cover" },
  {
    id: "p2",
    variant: "contents",
    label: "Inside this issue",
    title: "The Edit",
    pageNo: 2,
    bullets: [
      "Mirror selfie mood",
      "Portrait study",
      "मुंबई → ऋषिकेश",
      "Weekend uniform",
      "Editor's letter",
    ],
    tocPage: 2,
  },
  {
    id: "p3",
    variant: "mirror",
    label: "Feature",
    title: "Mirror, mirror",
    deck: "The mirror in the room and wherever the light is honest.",
    body: "The light hits different. Elevator doors become a runway. Every reflection is a mood board.",
    bodyExtra:
      ".",
    byline: "Words by The Beauty Desk · Photography as captured",
    photoKey: "mirror",
    pageNo: 3,
  },
  {
    id: "p4",
    variant: "spread",
    label: "Fashion diary",
    title: "Dressed like the main character",
    deck: "Soft tones, silver jewelry, oversized layers — the formula never fails.",
    body: "Style isn’t about wearing the loudest outfit in the room. It’s about looking effortless while every little detail quietly works together.",
    bodyExtra:
      "An oversized shirt over a fitted crop top. Light-wash denim that falls perfectly at the ankle. Minimal makeup, glossy lips, and confidence that does more than any accessory ever could.",
    byline: "Girlhood Journal · May 2026",
    pageNo: 4,
  },
  {
    id: "p5",
    variant: "portrait",
    label: "Editorial",
    title: "Portrait study",
    deck: "A single frame, maximum presence.",
    body: "Not posed for the camera — caught in the in-between. Soft focus, sharp presence.",
    bodyExtra:
      "The best portraits happen when nobody says “smile.” Hair moves, eyes drift, the frame feels borrowed from a film still. This is that chapter: intimate, unhurried, unmistakably hers.",
    byline: "Portrait series · Chapter 05",
    photoKey: "portrait",
    pageNo: 5,
  },
  {
    id: "p6",
    variant: "quote",
    quote: "Every mirror selfie is a love letter to yourself.",
    cite: "— torn from a fashion clipping",
    pageNo: 6,
  },
  {
    id: "p7",
    variant: "travel",
    label: "Travel diary",
    title: "Passport pages",
    deck: "From platform to prayer flags — the journey in three acts.",
    body: "Window seats, unfamiliar streets, golden hours in cities that feel like they were waiting for her.",
    bodyExtra:
      "Act I: departure in linen and noise. Act II: the train hum between stations. Act III: mountain air, slower steps, the same person — wider horizon.",
    byline: "Travel desk · Special birthday route",
    photoKey: "travel",
    pageNo: 7,
  },
  {
    id: "p8",
    variant: "spread",
    label: "Style file",
    title: "Weekend uniform",
    deck: "Off-duty, on record.",
    body: "Soft knit · denim · sunnies. The outfit that feels like home on a Sunday.",
    bodyExtra:
      "The uniform that survives brunch, bookstore detours, and golden-hour walks without a wardrobe change. Consider it the soft epilogue to a very dressed-up week.",
    photoKey: "spreadWeekend",
    pageNo: 8,
  },
  {
    id: "p9",
    variant: "letter",
    label: "Editor's note",
    title: "A letter, folded in",
    body: "If these pages were a magazine, you would be on every cover , because of the way you carry yourself easy, chill and a little cinematic. Happy birthday.",
    bodyExtra:
      "P.S. — Turn the page, take the strip, make the wish. This issue was always about you.",
    photoKey: "letterEditor",
    pageNo: 9,
  },
  { id: "p10", variant: "back" },
];

export const MAG_BOOK_PAGE_COUNT = MAGAZINE_BOOK_PAGES.length;

/** Contents list with spread page numbers */
export const MAG_TOC_ENTRIES = [
  { page: 3, label: "Mirror selfie mood" },
  { page: 5, label: "Portrait study" },
  { page: 7, label: "मुंबई → ऋषिकेश" },
  { page: 8, label: "Weekend uniform" },
  { page: 9, label: "Editor's letter" },
] as const;
