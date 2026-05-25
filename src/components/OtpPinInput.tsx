"use client";

import { useCallback, useRef, useState } from "react";

const PIN_LENGTH = 6;

type OtpPinInputProps = {
  correctPin: string;
  onSuccess?: () => void;
};

function normalizePin(raw: string) {
  return raw.replace(/\D/g, "").slice(0, PIN_LENGTH);
}

export function OtpPinInput({ correctPin, onSuccess }: OtpPinInputProps) {
  const [digits, setDigits] = useState<string[]>(() =>
    Array(PIN_LENGTH).fill("")
  );
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusAt = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const resetInputs = useCallback(() => {
    setDigits(Array(PIN_LENGTH).fill(""));
    focusAt(0);
  }, []);

  const fillDigits = useCallback((raw: string) => {
    const cleaned = normalizePin(raw);
    const updated = Array(PIN_LENGTH).fill("");
    cleaned.split("").forEach((char, i) => {
      updated[i] = char;
    });
    setDigits(updated);
    return cleaned;
  }, []);

  const handleComplete = useCallback(
    (pin: string) => {
      const normalized = normalizePin(pin);
      if (normalized.length !== PIN_LENGTH) return;

      if (normalized === normalizePin(correctPin)) {
        setStatus("success");
        setTimeout(() => onSuccess?.(), 700);
        return;
      }

      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        resetInputs();
      }, 1600);
    },
    [correctPin, onSuccess, resetInputs]
  );

  const applyInput = useCallback(
    (index: number, value: string) => {
      if (status === "success") return;

      const cleaned = normalizePin(value);

      if (cleaned.length > 1) {
        const filled = fillDigits(cleaned);
        if (status === "error") setStatus("idle");
        if (filled.length === PIN_LENGTH) {
          handleComplete(filled);
        } else {
          focusAt(Math.min(filled.length, PIN_LENGTH - 1));
        }
        return;
      }

      const next = cleaned.slice(-1);

      setDigits((prev) => {
        const updated = [...prev];
        updated[index] = next;
        const pin = updated.join("");
        if (pin.length === PIN_LENGTH && updated.every((d) => d !== "")) {
          queueMicrotask(() => handleComplete(pin));
        }
        return updated;
      });

      if (status === "error") setStatus("idle");

      if (next && index < PIN_LENGTH - 1) {
        focusAt(index + 1);
      }
    },
    [fillDigits, handleComplete, status]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      if (status === "success") return;

      const pasted = normalizePin(e.clipboardData.getData("text"));
      if (!pasted) return;

      e.preventDefault();
      const filled = fillDigits(pasted);
      if (status === "error") setStatus("idle");
      focusAt(Math.min(filled.length, PIN_LENGTH - 1));

      if (filled.length === PIN_LENGTH) {
        handleComplete(filled);
      }
    },
    [fillDigits, handleComplete, status]
  );

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (status === "success") return;

    if (e.key === "Backspace") {
      if (digits[index]) {
        const updated = [...digits];
        updated[index] = "";
        setDigits(updated);
        e.preventDefault();
        return;
      }
      if (index > 0) {
        const updated = [...digits];
        updated[index - 1] = "";
        setDigits(updated);
        focusAt(index - 1);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleComplete(digits.join(""));
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) focusAt(index - 1);
    if (e.key === "ArrowRight" && index < PIN_LENGTH - 1) focusAt(index + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "success") return;
    handleComplete(digits.join(""));
  };

  const canSubmit =
    digits.join("").length === PIN_LENGTH && digits.every((d) => d !== "");

  return (
    <form
      className={`otp-vault ${status === "success" ? "otp-vault--celebrate" : ""} ${status === "error" ? "otp-vault--error" : ""}`}
      onSubmit={handleSubmit}
      aria-label="Six digit birthday pin"
    >
      <p className="otp-vault__eyebrow">✦ secret surprise ✦</p>
      <h2 className="otp-vault__title">Enter the birthday code</h2>
      <p className="otp-vault__hint">Six digits — check your invite</p>

      <div className="otp-vault__inputs" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={PIN_LENGTH}
            value={digit}
            disabled={status === "success"}
            aria-label={`Digit ${i + 1} of ${PIN_LENGTH}`}
            className="otp-vault__digit"
            onChange={(e) => applyInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>

      <button
        type="submit"
        className="otp-vault__submit"
        disabled={!canSubmit || status === "success"}
      >
        Unlock surprise
      </button>

      {status === "success" && (
        <p className="otp-vault__success" role="status">
          🎉 That&apos;s the one — unlocking the surprise!
        </p>
      )}

      {status === "error" && (
        <p className="otp-vault__error" role="alert">
          Not quite — try again!
        </p>
      )}
    </form>
  );
}
