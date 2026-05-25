import { FilmPhotoSlot } from "./FilmPhotoSlot";
import type { ReelPhoto } from "@/lib/bollywood-photos";

type FilmReelStripProps = {
  photos: ReelPhoto[];
  speed?: "slow" | "normal";
};

export function FilmReelStrip({ photos, speed = "normal" }: FilmReelStripProps) {
  const track = [...photos, ...photos];

  return (
    <div className="bfilm-reel" data-speed={speed}>
      <div className="bfilm-reel__can bfilm-reel__can--left" aria-hidden="true">
        <span className="bfilm-reel__can-inner" />
      </div>
      <div className="bfilm-reel__can bfilm-reel__can--right" aria-hidden="true">
        <span className="bfilm-reel__can-inner" />
      </div>

      <div className="bfilm-reel__track-wrap">
        <div className="bfilm-reel__holes bfilm-reel__holes--top" aria-hidden="true" />
        <div className="bfilm-reel__scroll">
          <div className="bfilm-reel__film" aria-label="Film reel frames">
            {track.map((photo, i) => (
              <figure key={`${photo.id}-${i}`} className="bfilm-reel__frame">
                <span className="bfilm-reel__frame-no">{photo.frameNo}</span>
                <div className="bfilm-reel__frame-window">
                  <FilmPhotoSlot
                    src={photo.src}
                    alt={photo.alt}
                    label={photo.caption}
                    hint="/public/photos/"
                    sizes="240px"
                  />
                </div>
                <figcaption className="bfilm-reel__caption">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="bfilm-reel__holes bfilm-reel__holes--bottom" aria-hidden="true" />
      </div>
    </div>
  );
}
