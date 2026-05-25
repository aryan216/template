import { FilmPhotoSlot } from "./FilmPhotoSlot";
import type { ReelPhoto } from "@/lib/bollywood-photos";

const Box = "div" as keyof JSX.IntrinsicElements;

type FilmReelStripProps = {
  photos: ReelPhoto[];
  speed?: "slow" | "normal";
};

export function FilmReelStrip({ photos, speed = "normal" }: FilmReelStripProps) {
  const Tag = Box;
  const track = [...photos, ...photos];

  return (
    <Tag className="bfilm-reel" data-speed={speed}>
      <Tag className="bfilm-reel__can bfilm-reel__can--left" aria-hidden="true">
        <span className="bfilm-reel__can-inner" />
      </Tag>
      <Tag className="bfilm-reel__can bfilm-reel__can--right" aria-hidden="true">
        <span className="bfilm-reel__can-inner" />
      </Tag>

      <Tag className="bfilm-reel__track-wrap">
        <Tag className="bfilm-reel__holes bfilm-reel__holes--top" aria-hidden="true" />
        <Tag className="bfilm-reel__scroll">
          <Tag className="bfilm-reel__film" aria-label="Film reel frames">
            {track.map((photo, i) => (
              <figure key={`${photo.id}-${i}`} className="bfilm-reel__frame">
                <span className="bfilm-reel__frame-no">{photo.frameNo}</span>
                <Tag className="bfilm-reel__frame-window">
                  <FilmPhotoSlot
                    src={photo.src}
                    alt={photo.alt}
                    label={photo.caption}
                    hint="/public/photos/"
                    sizes="240px"
                  />
                </Tag>
                <figcaption className="bfilm-reel__caption">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </Tag>
        </Tag>
        <Tag className="bfilm-reel__holes bfilm-reel__holes--bottom" aria-hidden="true" />
      </Tag>
    </Tag>
  );
}
