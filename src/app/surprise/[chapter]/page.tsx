import { notFound } from "next/navigation";
import { DietCokeChapterTwo } from "@/components/story/DietCokeChapterTwo";
import { FashionMagazineChapterThree } from "@/components/story/FashionMagazineChapterThree";
import { CakeCuttingChapterFive } from "@/components/story/CakeCuttingChapterFive";
import { StoryChapterView } from "@/components/story/StoryChapterView";
import { getChapterBySlug, getChapterIndex } from "@/lib/story-chapters";

type PageProps = {
  params: Promise<{ chapter: string }>;
};

/** Numbered surprise chapters (2, 3, 5 — chapter 4 removed). */
export function generateStaticParams() {
  return [{ chapter: "2" }, { chapter: "3" }, { chapter: "5" }];
}

export default async function StoryChapterPage({ params }: PageProps) {
  const { chapter: slug } = await params;

  if (slug === "2") {
    return <DietCokeChapterTwo />;
  }

  if (slug === "3") {
    return <FashionMagazineChapterThree />;
  }

  if (slug === "5") {
    return <CakeCuttingChapterFive />;
  }

  const chapter = getChapterBySlug(slug);

  if (!chapter || chapter.slug === "") {
    notFound();
  }

  return (
    <StoryChapterView
      chapter={chapter}
      chapterIndex={getChapterIndex(slug)}
    />
  );
}
