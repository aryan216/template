/**
 * Chapter 2 — cold drink birthday assets & copy.
 * Put images in /public/photos/ and set `src` paths below.
 */

export const COKE_CAN_IMAGE = "/photos/coke.png";
export const PEPSI_CUP_IMAGE = "/photos/pepsi-cup.png";

/** Hero birthday line — edit freely */
export const HERO_BIRTHDAY_QUOTE =
  "Happy Birthday to the girl who finds joy in the crack of a can, fizz of an opening bottle, and every cold sip that makes life feel a little more sparkling.";
export const COKE_BOTTLE = "/photos/bottle.png";
export const THUMBS_UP = "/photos/thumbs-up.png";
export const SPRITE = "/photos/sprite.png";

export const COKE_SPLASH_ASSETS = {
  splash: "/photos/splash.png",
  spill: "/photos/spill.png",
};

/** Hero — one drink photo in each corner (upload your own PNGs/JPGs) */
export type HeroCornerDrink = {
  id: string;
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  src?: string;
  alt: string;
  label: string;
  /** Suggested filename when adding files */
  fileHint: string;
};

export const HERO_CORNER_DRINKS: HeroCornerDrink[] = [
  {
    id: "hero-tl",
    corner: "top-left",
    src: PEPSI_CUP_IMAGE,
    alt: "Pepsi cup",
    label: "Pepsi cup",
    fileHint: "pepsi-cup.png",
  },
  {
    id: "hero-tr",
    corner: "top-right",
    src: THUMBS_UP,
    alt: "Pepsi cup",
    label: "Pepsi cup",
    fileHint: "pepsi-cup.png",
  },
  {
    id: "hero-bl",
    corner: "bottom-left",
    src: COKE_BOTTLE,
    alt: "Pepsi cup",
    label: "Pepsi cup",
    fileHint: "pepsi-cup.png",
  },
  {
    id: "hero-br",
    corner: "bottom-right",
    src: SPRITE,
    alt: "Pepsi cup",
    label: "Pepsi cup",
    fileHint: "pepsi-cup.png",
  },
];

/** Extra drinks on the page — optional photos on a cafe shelf */
export type PageDrinkSlot = {
  id: string;
  src?: string;
  alt: string;
  caption: string;
  kind: "can" | "bottle" | "cup" | "glass";
};

export const PAGE_DRINK_SLOTS: PageDrinkSlot[] = [
  {
    id: "drink-1",
    alt: "Drink 1",
    caption: "Opening pour",
    kind: "can",
  },
  {
    id: "drink-2",
    alt: "Drink 2",
    caption: "Shared sip",
    kind: "cup",
  },
  {
    id: "drink-3",
    alt: "Drink 3",
    caption: "On the rocks",
    kind: "glass",
  },
  {
    id: "drink-4",
    alt: "Drink 4",
    caption: "Late show",
    kind: "bottle",
  },
  {
    id: "drink-5",
    alt: "Drink 5",
    caption: "Birthday fizz",
    kind: "can",
  },
  {
    id: "drink-6",
    alt: "Drink 6",
    caption: "Last call",
    kind: "cup",
  },
];

export const COKE_LETTER = {
  label: "A letter for you",
  date: "26 May 2026",
  salutation: "Dear Khushi,",
  paragraphs: [
    "Hello hello hello this AI thing has made lives difficult man as i'm writing this letter currently its difficult to write anything but i'm trying my best to write something for you.",
    "First ans foremost Happy Birthday i hope you are happy afterall its your birthday and you're travelling and celebrating your birthday in mountains with your friends and family and enjoying your birthday in the best way possible.",
    "you are cool yaar just like this cold drinks and like always har baar ki tarah mai yhi kehna chahunga ki aap khud par dhyan dete rahiye and i feel you kept worring everytime so plese be chill like your cold drinks and make sure to enjoy the life ongoing around you and live it the best way possible dont give yourself tonnes of cortisol",
    "Baaki do Garlic naan with paneer do pyaaza chahiye mujhe party me to wo khila dena mujhe to thoda aur maza aa jaega and enjoyyyyyyyy",
    "Once again Happy Birthday Khushi and enjoy your birthday in the best way possible and i hope you have a great time in Rishikesh", 
  ],
  closing: "With all my heart,",
  signature: "Someone who is always cheering for you 🥤",
 
};

export const COKE_TRAITS = [
  {
    icon: "🧊",
    title: "Quietly steady",
    text: "She has a way of making loud days feel a little easier to hold.",
  },
  {
    icon: "✨",
    title: "A tiny spark",
    text: "Not flashy for attention — just bright in the way real warmth is bright.",
  },
  {
    icon: "💖",
    title: "Soft where it counts",
    text: "She notices people. She cares in the small ways that stay with you.",
  },
  {
    icon: "🎀",
    title: "Unapologetically her",
    text: "Her own style, her own timing, her own way of making things memorable.",
  },
];
