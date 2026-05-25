type DesignPanelProps = {
  variant: "palette" | "tablescape" | "festive";
};

export function DesignPanel({ variant }: DesignPanelProps) {
  if (variant === "palette") {
    return (
      <div className="design-panel design-panel--palette" aria-hidden="true">
        <span className="design-panel__tape design-panel__tape--tl" />
        <span className="design-panel__tape design-panel__tape--br" />
        <div className="design-panel__swatches">
          <span style={{ background: "#fce8ec" }} />
          <span style={{ background: "#f5d0c5" }} />
          <span style={{ background: "#d4a853" }} />
          <span style={{ background: "#fff5eb" }} />
          <span style={{ background: "#e85d8a" }} />
        </div>
        <div className="design-panel__doodles">
          <span className="design-panel__spark">✦</span>
          <span className="design-panel__spark design-panel__spark--2">✧</span>
          <span className="design-panel__ring" />
          <span className="design-panel__dot-grid" />
        </div>
        <p className="design-panel__caption">blush · cream · gold</p>
      </div>
    );
  }

  if (variant === "tablescape") {
    return (
      <div className="design-panel design-panel--tablescape" aria-hidden="true">
        <span className="design-panel__tape design-panel__tape--tr" />
        <div className="tablescape">
          <div className="tablescape__runner" />
          <span className="tablescape__plate tablescape__plate--1" />
          <span className="tablescape__plate tablescape__plate--2" />
          <span className="tablescape__jar tablescape__jar--1">
            <span className="tablescape__flower" />
          </span>
          <span className="tablescape__jar tablescape__jar--2">
            <span className="tablescape__flower tablescape__flower--pink" />
          </span>
          <span className="tablescape__candle" />
          <span className="tablescape__card">Khushi</span>
          <span className="tablescape__bunting">
            <i /><i /><i /><i /><i />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="design-panel design-panel--festive" aria-hidden="true">
      <span className="design-panel__tape design-panel__tape--center" />
      <div className="festive-pattern">
        {["🎀", "⭐", "🕯️", "🌸", "🎊", "💫", "🎈", "✨"].map((emoji, i) => (
          <span key={`${emoji}-${i}`} className="festive-pattern__item">
            {emoji}
          </span>
        ))}
      </div>
      <p className="design-panel__caption design-panel__caption--light">
        pin everything
      </p>
    </div>
  );
}
