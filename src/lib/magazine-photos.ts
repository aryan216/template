/**
 * Chapter 3 — Vogue cover, editorial photos, film-strip captions.
 * Put files in /public/photos/ and set matching `src` below.
 */

export type VogueCoverLine = {
  kicker?: string;
  text: string;
  size?: "sm" | "md" | "lg";
};

export const MAG_COVER = {
  masthead: "VOGUE",
  edition: "MAY 2026",
  coverSrc: "/photos/two.jpeg" as string | undefined,
  coverAlt: "Vogue cover portrait",
  coverHint: "cover.jpg",
  leftLines: [
    { kicker: "Cover", text: "Her birthday edit", size: "lg" },
    { text: "Mirror selfie mood", size: "md" },
    { text: "Portrait study", size: "sm" },
    { text: "The travel diary", size: "sm" },
  ] satisfies VogueCoverLine[],
  rightLines: [
    { text: "Weekend uniform", size: "md" },
    { text: "Outfit rotation", size: "sm" },
    { text: "Golden hour · window seat", size: "sm" },
    { kicker: "Plus", text: "26 looks to love", size: "md" },
  ] satisfies VogueCoverLine[],
  mainHeadline: "WHEN STYLE MET CELEBRATION",
  mainSubhead:
    "Mirror selfies, passport pages, and the fits that feel most like her.",
};

export type MagEditorialPhoto = {
  /** Set when file exists under /public — leave unset to show placeholder */
  src?: string;
  alt: string;
  caption: string;
  credit?: string;
  kicker?: string;
  /** Placeholder shows this path (under public/) */
  fileHint: string;
};

/** Flipbook & spread photos — keyed by page `photoKey` */
export const MAG_EDITORIAL_PHOTOS = {
  mirror: {
    src: "/photos/mirror.png" as string | undefined,
    alt: "Mirror selfie in warm bathroom light",
    kicker: "Beauty",
    caption: "The mirror ritual: one glance, one frame, full conviction.",
    credit: "Photographed in the wild · Issue 05",
    fileHint: "/photos/mirror.png",
  },
  portrait: {
    src: "/photos/three.jpeg" as string | undefined,
    alt: "Portrait in soft natural light",
    kicker: "Close-up",
    caption: "Not posed for the lens — caught between laughter and stillness.",
    credit: "Portrait study · Natural light only",
    fileHint: "/photos/three.jpeg",
  },
  travel: {
    src: "/photos/four.jpeg" as string | undefined,
    alt: "Travel moment at golden hour",
    kicker: "Travel diary",
    caption: "Window seat, unfamiliar streets, and a carry-on that never misses.",
    credit: "On the move · Weekend dispatch",
    fileHint: "/photos/four.jpeg",
  },
  spreadWeekend: {
    src: "/photos/five.jpeg" as string | undefined,
    alt: "Weekend soft-knit outfit",
    kicker: "Style file",
    caption: "Soft knit · denim · sunnies — the outfit that feels like Sunday.",
    credit: "Off-duty editorial",
    fileHint: "/photos/five.jpeg",
  },
  letterEditor: {
    src: "/photos/editor.jpeg" as string | undefined,
    alt: "Photo with the editor",
    kicker: "Editor's note",
    caption: "Photo with the editor",
    credit: "Behind the issue · May 2026",
    fileHint: "/photos/six.jpeg",
  },
} as const satisfies Record<string, MagEditorialPhoto>;

export type MagPhotoKey = keyof typeof MAG_EDITORIAL_PHOTOS;

/** Film-strip frame captions (photo booth export) */
export const MAG_STRIP_FRAME_CAPTIONS = [
  "Soft neon · sharper intent",
  "The in-between look",
  "Main character energy",
] as const;

/** भारतीय रेल — Hindi train ticket (chapter 3 travel clip) */
export const BHARATIYA_RAIL_TICKET = {
  label: "यात्रा डायरी",
  railway: "भारतीय रेल",
  train: "राजधानी एक्सप्रेस",
  trainNo: "१२९५१",
  pnr: "२८४७ ५१९२०३",
  from: "मुंबई",
  to: "ऋषिकेश",
  travelClass: "एसी २ टियर",
  seat: "खिड़की · सीट B4 ४२",
  date: "२६ मई २०२६",
  note: "सुनहरी घड़ी · नई मंज़िल · यात्रा की याद",
};
