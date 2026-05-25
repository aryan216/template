import { forwardRef, type ReactNode } from "react";

type MagazineBookPageProps = {
  children: ReactNode;
  className?: string;
  hard?: boolean;
};

/** Wrapper required by react-pageflip — one ref per page */
export const MagazineBookPage = forwardRef<HTMLDivElement, MagazineBookPageProps>(
  function MagazineBookPage({ children, className = "", hard = false }, ref) {
    return (
      <div
        ref={ref}
        className={`mag-book-page ${hard ? "mag-book-page--hard" : ""} ${className}`.trim()}
        data-density={hard ? "hard" : "soft"}
      >
        <div className="mag-book-page__inner">{children}</div>
      </div>
    );
  }
);
