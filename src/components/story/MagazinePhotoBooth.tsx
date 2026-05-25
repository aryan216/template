"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MAG_STRIP_FRAME_CAPTIONS } from "@/lib/magazine-photos";
import "./photo-booth.css";

const SHOT_COUNT = 3;

type BoothMode = "camera" | "upload" | null;
type BoothPhase = "idle" | "live" | "flashing" | "strip" | "upload-pick";

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawSprocketRail(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.fillStyle = "#0c0c0c";
  ctx.fillRect(x, y, w, h);

  const holeW = w * 0.5;
  const holeH = 11;
  const holeX = x + (w - holeW) / 2;
  const step = 24;

  for (let hy = y + 16; hy < y + h - 20; hy += step) {
    ctx.fillStyle = "#020202";
    roundRect(ctx, holeX, hy, holeW, holeH, 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    roundRect(ctx, holeX, hy, holeW, holeH, 2);
    ctx.stroke();
  }
}

function drawPhotoStrip(
  photos: string[],
  frameCaptions: readonly string[],
  footerLine: string,
  subLine: string
): Promise<Blob> {
  const railW = 42;
  const stripW = 480;
  const padY = 22;
  const frameGap = 8;
  const inset = 10;
  const photoW = stripW - railW * 2 - inset * 2;
  const photoH = Math.round(photoW * 1.22);
  const headerH = 52;
  const footerH = 44;
  const framesH = SHOT_COUNT * photoH + (SHOT_COUNT - 1) * frameGap;
  const stripH = padY + headerH + framesH + footerH + padY;

  const canvas = document.createElement("canvas");
  canvas.width = stripW;
  canvas.height = stripH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.fillStyle = "#101010";
  ctx.fillRect(0, 0, stripW, stripH);

  drawSprocketRail(ctx, 0, 0, railW, stripH);
  drawSprocketRail(ctx, stripW - railW, 0, railW, stripH);

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  return Promise.all(photos.map(loadImage)).then((images) => {
    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.font = "600 15px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("THE EDIT · FILM STRIP", stripW / 2, padY + 20);
    ctx.font = "400 10px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.42)";
    ctx.fillText("26 · MAY · 2026", stripW / 2, padY + 38);

    let y = padY + headerH;
    const frameX = railW + inset;

    images.forEach((img, index) => {
      ctx.fillStyle = "#080808";
      ctx.fillRect(frameX - 2, y - 2, photoW + 4, photoH + 4);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.lineWidth = 1;
      ctx.strokeRect(frameX - 2, y - 2, photoW + 4, photoH + 4);

      const scale = Math.max(photoW / img.width, photoH / img.height);
      const sw = img.width * scale;
      const sh = img.height * scale;
      const sx = frameX + (photoW - sw) / 2;
      const sy = y + (photoH - sh) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(frameX, y, photoW, photoH);
      ctx.clip();
      ctx.drawImage(img, sx, sy, sw, sh);
      ctx.restore();

      const caption =
        frameCaptions[index] ??
        `Frame ${String(index + 1).padStart(2, "0")}`;
      const captionLines =
        caption.length > 34
          ? [caption.slice(0, 34), caption.slice(34, 68).trim()]
          : [caption];

      ctx.fillStyle = "rgba(0, 0, 0, 0.62)";
      ctx.fillRect(
        frameX,
        y + photoH - (captionLines.length > 1 ? 34 : 26),
        photoW,
        captionLines.length > 1 ? 34 : 26
      );
      ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
      ctx.font = "600 8px Georgia, serif";
      ctx.textAlign = "left";
      captionLines.forEach((line, lineIdx) => {
        ctx.fillText(line, frameX + 6, y + photoH - 18 + lineIdx * 11);
      });
      ctx.font = "500 7px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.fillText(
        `FRAME ${String(index + 1).padStart(2, "0")}`,
        frameX + photoW - 52,
        y + photoH - 6
      );

      y += photoH + frameGap;
    });

    const footY = stripH - padY - footerH + 8;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.moveTo(railW + inset, footY);
    ctx.lineTo(stripW - railW - inset, footY);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.font = "italic 11px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(footerLine, stripW / 2, footY + 20);
    ctx.font = "400 9px system-ui, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fillText(subLine, stripW / 2, footY + 34);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Export failed"))),
        "image/png",
        0.95
      );
    });
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function readBlobAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent);
}

function openMobileSaveView(dataUrl: string) {
  const tab = window.open("", "_blank");
  if (!tab) return false;

  tab.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Save film strip</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 20px;
      box-sizing: border-box;
      background: #0a0a0a;
      color: #fff;
      font-family: system-ui, sans-serif;
    }
    p { margin: 0; text-align: center; line-height: 1.5; font-size: 15px; }
    img { max-width: 100%; height: auto; border-radius: 4px; }
  </style>
</head>
<body>
  <p>Press and hold the film strip, then tap <strong>Save image</strong>.</p>
  <img src="${dataUrl}" alt="THE EDIT film strip" />
</body>
</html>`);
  tab.document.close();
  return true;
}

export function MagazinePhotoBooth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stripBlobRef = useRef<Blob | null>(null);

  const [mode, setMode] = useState<BoothMode>(null);
  const [phase, setPhase] = useState<BoothPhase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [shots, setShots] = useState<string[]>([]);
  const [stripUrl, setStripUrl] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [saveHint, setSaveHint] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const resetStrip = useCallback(() => {
    stripBlobRef.current = null;
    setStripUrl(null);
    setShots([]);
    setSaveHint(null);
  }, []);

  const buildStripFromPhotos = useCallback(async (photos: string[]) => {
    if (photos.length !== SHOT_COUNT) return;

    setBuilding(true);
    setError(null);

    try {
      const blob = await drawPhotoStrip(
        photos,
        MAG_STRIP_FRAME_CAPTIONS,
        "Mirror selfie mood · birthday edition",
        "THE EDIT · Chapter 3 film strip"
      );
      stripBlobRef.current = blob;
      const dataUrl = await readBlobAsDataUrl(blob);
      setStripUrl(dataUrl);
      setShots(photos);
      setPhase("strip");
      setSaveHint(null);
    } catch {
      setError("Could not build your photo strip. Please try again.");
    } finally {
      setBuilding(false);
    }
  }, []);

  const startCamera = async () => {
    resetStrip();
    setError(null);
    setMode("camera");
    setShots([]);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setPhase("live");
    } catch {
      setMode(null);
      setPhase("idle");
      setError(
        "Camera access is needed for the photo booth. Allow camera permission in your browser settings and try again."
      );
    }
  };

  const startUpload = () => {
    stopCamera();
    resetStrip();
    setError(null);
    setMode("upload");
    setPhase("upload-pick");
    setShots([]);
  };

  const captureFrame = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return null;

    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) return null;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, w, h);

    return canvas.toDataURL("image/jpeg", 0.92);
  }, []);

  const captureShot = async () => {
    if (building || shots.length >= SHOT_COUNT) return;

    setPhase("flashing");
    await new Promise((r) => setTimeout(r, 120));

    const frame = captureFrame();
    if (!frame) {
      setError("Could not capture this photo. Try again.");
      setPhase("live");
      return;
    }

    const nextShots = [...shots, frame];
    setShots(nextShots);
    setPhase("live");

    if (nextShots.length === SHOT_COUNT) {
      stopCamera();
      await buildStripFromPhotos(nextShots);
    }
  };

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || building) return;

    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));

    if (files.length !== SHOT_COUNT) {
      setError(`Pick exactly ${SHOT_COUNT} photos at once.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setError(null);
    setBuilding(true);

    try {
      const photos = await Promise.all(files.map(readFileAsDataUrl));
      await buildStripFromPhotos(photos);
    } catch {
      setError("Could not read those photos. Try again with JPG or PNG files.");
      setPhase("upload-pick");
    } finally {
      setBuilding(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const downloadStrip = async () => {
    const dataUrl =
      stripUrl ??
      (stripBlobRef.current ? await readBlobAsDataUrl(stripBlobRef.current) : null);
    if (!dataUrl) return;

    setDownloading(true);
    setSaveHint(null);

    try {
      if (isMobileDevice()) {
        const opened = openMobileSaveView(dataUrl);
        if (opened) {
          setSaveHint("Press and hold the image in the new tab, then tap Save image.");
          return;
        }
      }

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "the-edit-film-strip.png";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (isMobileDevice()) {
        setSaveHint("If nothing saved, press and hold the strip above, then tap Save image.");
      }
    } finally {
      setDownloading(false);
    }
  };

  const retake = () => {
    stopCamera();
    resetStrip();
    setMode(null);
    setPhase("idle");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const captureLabel =
    shots.length === 0
      ? `Capture photo 1 of ${SHOT_COUNT}`
      : shots.length < SHOT_COUNT - 1
        ? `Capture photo ${shots.length + 1} of ${SHOT_COUNT}`
        : `Capture final photo (${SHOT_COUNT} of ${SHOT_COUNT})`;

  const showVideo = mode === "camera" && (phase === "live" || phase === "flashing");

  return (
    <section className="mag-booth" aria-labelledby="mag-booth-title">
      <header className="mag-booth__header">
        {/* <p className="mag-booth__eyebrow">After the magazine</p> */}
        <h2 id="mag-booth-title" className="mag-booth__title">
          The photo booth
        </h2>
        <p className="mag-booth__sub">
          Here i tried to set up a photo booth for you to capture youself i hope you enjoy it
        </p>
      </header>

      <div className="mag-booth__stage">
        <div className="mag-booth__curtain mag-booth__curtain--left" aria-hidden="true" />
        <div className="mag-booth__curtain mag-booth__curtain--right" aria-hidden="true" />
        <div className="mag-booth__box">
          {phase === "strip" && stripUrl ? (
            <div className="mag-booth__strip-view">
              <div className="mag-booth__strip-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={stripUrl} alt="Your film strip" className="mag-booth__strip-img" />
              </div>
              <p className="mag-booth__save-hint">
                Press and hold the strip to save it to your photos.
              </p>
              <BoothThumbs shots={shots} />
            </div>
          ) : phase === "upload-pick" ? (
            <div className="mag-booth__upload">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="mag-booth__file-input"
                aria-label={`Choose ${SHOT_COUNT} photos`}
                onChange={(e) => handleUpload(e.target.files)}
              />
              <span className="mag-booth__upload-icon" aria-hidden="true">
                🖼
              </span>
              <p className="mag-booth__upload-title">Upload your strip</p>
              <p className="mag-booth__upload-hint">
                Select exactly {SHOT_COUNT} photos in one go — your camera roll works perfectly.
              </p>
              <button
                type="button"
                className="mag-booth__upload-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={building}
              >
                {building ? "Building strip…" : `Choose ${SHOT_COUNT} photos`}
              </button>
            </div>
          ) : (
            <div className="mag-booth__viewport">
              {phase === "idle" && !error && (
                <div className="mag-booth__placeholder">
                  <span className="mag-booth__placeholder-icon" aria-hidden="true">
                    📸
                  </span>
                  <p>Camera or upload — three photos, one strip</p>
                </div>
              )}

              {error && (
                <div className="mag-booth__placeholder mag-booth__placeholder--error">
                  <p>{error}</p>
                </div>
              )}

              <video
                ref={videoRef}
                className={`mag-booth__video ${showVideo ? "" : "mag-booth__video--hidden"}`}
                playsInline
                muted
                autoPlay
              />

              {phase === "flashing" && (
                <div className="mag-booth__overlay" aria-live="polite">
                  <span className="mag-booth__flash" aria-hidden="true" />
                </div>
              )}

              {phase === "live" && showVideo && (
                <>
                  <BoothLiveHint shots={shots} />
                  {shots.length > 0 && <BoothCaptured shots={shots} />}
                </>
              )}
            </div>
          )}

          <div className="mag-booth__lights" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="mag-booth__actions">
        {phase === "idle" && (
          <>
            <button type="button" className="mag-booth__btn mag-booth__btn--primary" onClick={startCamera}>
              Use camera
            </button>
            <button type="button" className="mag-booth__btn mag-booth__btn--ghost" onClick={startUpload}>
              Upload {SHOT_COUNT} photos
            </button>
          </>
        )}

        {phase === "live" && mode === "camera" && (
          <button
            type="button"
            className="mag-booth__btn mag-booth__btn--primary"
            onClick={captureShot}
            disabled={building || shots.length >= SHOT_COUNT}
          >
            {captureLabel}
          </button>
        )}

        {phase === "upload-pick" && (
          <>
            <button
              type="button"
              className="mag-booth__btn mag-booth__btn--primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={building}
            >
              {building ? "Building strip…" : `Choose ${SHOT_COUNT} photos`}
            </button>
            <button type="button" className="mag-booth__btn mag-booth__btn--ghost" onClick={retake}>
              Back
            </button>
          </>
        )}

        {phase === "flashing" && mode === "camera" && (
          <p className="mag-booth__status">Got it…</p>
        )}

        {phase === "strip" && (
          <>
            <button
              type="button"
              className="mag-booth__btn mag-booth__btn--primary"
              onClick={downloadStrip}
              disabled={downloading}
            >
              {downloading
                ? "Preparing…"
                : isMobileDevice()
                  ? "Save film strip"
                  : "Download film strip"}
            </button>
            {saveHint && <p className="mag-booth__save-hint mag-booth__save-hint--action">{saveHint}</p>}
            <button type="button" className="mag-booth__btn mag-booth__btn--ghost" onClick={retake}>
              Start over
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function BoothThumbs({ shots }: { shots: string[] }) {
  return (
    <div className="mag-booth__strip-thumbs">
      {shots.map((src, i) => (
        <figure key={i} className="mag-booth__thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={MAG_STRIP_FRAME_CAPTIONS[i] ?? `Photo ${i + 1}`} />
          <figcaption>{MAG_STRIP_FRAME_CAPTIONS[i] ?? `Frame ${i + 1}`}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function BoothLiveHint({ shots }: { shots: string[] }) {
  return (
    <div className="mag-booth__live-hint">
      <span>
        {shots.length}/{SHOT_COUNT} captured · tap when ready
      </span>
    </div>
  );
}

function BoothCaptured({ shots }: { shots: string[] }) {
  return (
    <div className="mag-booth__captured">
      {shots.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={src} alt={`Captured ${i + 1}`} />
      ))}
      {Array.from({ length: SHOT_COUNT - shots.length }).map((_, i) => (
        <span key={`empty-${i}`} className="mag-booth__captured-empty" aria-hidden="true" />
      ))}
    </div>
  );
}