export type StoryVariant =
  | "bollywood"
  | "dietcoke"
  | "magazine"
  | "gate"
  | "newspaper"
  | "letter"
  | "collage"
  | "finale"
  | "cake";

export type StoryChapter = {
  id: number;
  slug: string;
  variant: StoryVariant;
  eyebrow: string;
  title: string;
  titleEm?: string;
  body: string;
  extras?: string[];
  cutoutWords?: string[];
  path: string;
};

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    slug: "",
    variant: "bollywood",
    eyebrow: "chapter one · lights, camera, birthday",
    title: "Welcome to the Bollywood Surprise",
    titleEm: "Picture abhi baaki hai.",
    body: "You cracked the code — the dance floor is open and the filmy birthday saga begins.",
    path: "/surprise",
  },
  {
    id: 2,
    slug: "2",
    variant: "dietcoke",
    eyebrow: "chapter two · ice cold & fizzy",
    title: "Pop the top on your year",
    titleEm: "Stay refreshed. Stay you.",
    body: "Some birthdays need cake. Yours also needs something ice-cold, crackling with bubbles, and shared with the people who make ordinary days feel like a celebration. This chapter is the chill one — silver cans, red labels, condensation on the glass, and memories that fizz long after the last sip.",
    extras: [
      "Classic cola moment: that one perfect sunset",
      "Diet fizz moment: laughing until it hurt",
      "On the rocks: the day everything clicked",
      "Extra chill: late-night talks & small victories",
    ],
    path: "/surprise/2",
  },
  {
    id: 3,
    slug: "3",
    variant: "magazine",
    eyebrow: "chapter three · the edit",
    title: "THE EDIT",
    titleEm: "Mirror selfies · travel · style file.",
    body: "A personal fashion issue — mirror selfies, editorial portraits, passport pages, and the weekend uniform that feels most like her.",
    extras: [
      "Mirror, mirror — fit checks & golden hour reflections",
      "Portrait study — soft focus, sharp presence",
      "Passport pages — cities, window seats, golden hours",
      "Weekend uniform — soft knit, denim, sunnies",
    ],
    path: "/surprise/3",
  },
  {
    id: 5,
    slug: "5",
    variant: "cake",
    eyebrow: "chapter five · the cake",
    title: "Make the first cut",
    titleEm: "Happy Birthday.",
    body: "Drag the knife across the cake — the sweetest way to end the story.",
    path: "/surprise/5",
  },
];

export function getChapterBySlug(slug?: string): StoryChapter | undefined {
  if (!slug) return STORY_CHAPTERS[0];
  return STORY_CHAPTERS.find((c) => c.slug === slug);
}

export function getChapterIndex(slug?: string): number {
  if (!slug) return 0;
  const idx = STORY_CHAPTERS.findIndex((c) => c.slug === slug);
  return idx === -1 ? 0 : idx;
}
