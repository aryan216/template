/**
 * Add your photos here. Leave `src` empty to show a placeholder.
 * Put image files in /public/photos/ then set src e.g. "/photos/cutout-1.jpg"
 */

export type CutoutPhoto = {
  id: string;
  src?: string;
  alt: string;
  tag: string;
  torn: "torn-1" | "torn-2" | "torn-3" | "torn-4";
  pos: "1" | "2" | "3" | "4" | "5";
  aspect: string;
};

export type ReelPhoto = {
  id: string;
  src?: string;
  alt: string;
  caption: string;
  frameNo: string;
};

export const CUTOUT_PHOTOS: CutoutPhoto[] = [
  {
    id: "cutout-1",
    src: "/photos/IMG-20241117-WA0008.jpg",
    alt: "Your photo — opening shot",
    tag: "Opening shot",
    torn: "torn-1",
    pos: "1",
    aspect: "4/5",
  },
  {
    id: "cutout-2",
    src: "/photos/IMG-20250204-WA0242.jpg",
    alt: "Your photo — dance sequence",
    tag: "Dance sequence",
    torn: "torn-2",
    pos: "2",
    aspect: "3/4",
  },
  {
    id: "cutout-3",
    src: "/photos/IMG-20250525-WA0176.jpg",
    alt: "Your photo — colour moment",
    tag: "Colour moment",
    torn: "torn-3",
    pos: "3",
    aspect: "4/5",
  },
  {
    id: "cutout-4",
    src: "/photos/Screenshot_2025-05-26-14-55-46-89_965bbf4d18d205f782c6b8409c5773a4.jpg",
    alt: "Your photo — celebration",
    tag: "Celebration",
    torn: "torn-4",
    pos: "4",
    aspect: "1/1",
  },
  {
    id: "cutout-5",
    src: "",
    alt: "Your photo — finale",
    tag: "Finale",
    torn: "torn-2",
    pos: "5",
    aspect: "4/5",
  },
];

export const REEL_PHOTOS: ReelPhoto[] = [
  {
    id: "reel-1",
    src: "/photos/one.jpeg",
    alt: "Your photo — scene I",
    caption: "Scene I — The arrival",
    frameNo: "001",
  },
  {
    id: "reel-2",
    src: "/photos/two.jpeg",
    alt: "Your photo — scene II",
    caption: "Scene II — Golden hour",
    frameNo: "002",
  },
  {
    id: "reel-3",
    src: "/photos/three.jpeg",
    alt: "Your photo — scene III",
    caption: "Scene III — Showtime",
    frameNo: "003",
  },
  {
    id: "reel-4",
    src: "/photos/four.jpeg",
    alt: "Your photo — scene IV",
    caption: "Scene IV — The soundtrack",
    frameNo: "004",
  },
  {
    id: "reel-5",
    src: "/photos/five.jpeg",
    alt: "Your photo — scene V",
    caption: "Scene V — Encore",
    frameNo: "005",
  },
  {
    id: "reel-6",
    src: "/photos/six.jpeg",
    alt: "Your photo — scene VI",
    caption: "Scene VI — Credits roll",
    frameNo: "006",
  },
];

export const GALLERY_PHOTOS: ReelPhoto[] = [
  {
    id: "gallery-1",
    src: "/photos/poster1.png",
    alt: "Your photo — memory 1",
    caption: "Memory I",
    frameNo: "A",
  },
  {
    id: "gallery-2",
    src: "/photos/poster2.jpeg",
    alt: "Your photo — memory 2",
    caption: "Memory II",
    frameNo: "B",
  },
  {
    id: "gallery-3",
    src: "/photos/poster3.png",
    alt: "Your photo — memory 3",
    caption: "Memory III",
    frameNo: "C",
  },
];
