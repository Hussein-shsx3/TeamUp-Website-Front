"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ScanFace, ChevronLeft } from "lucide-react";
import { Heading } from "@/components/ui/typography";

interface VerifyCodeStepProps {
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
  isLoading?: boolean;
  resendCooldown?: number;
}

const DIGITS = 4;

const VerifyCodeStep = ({
  email,
  onVerify,
  onResend,
  onBack,
  isLoading = false,
  resendCooldown = 60,
}: VerifyCodeStepProps) => {
  const [digits, setDigits] = useState<string[]>(Array(DIGITS).fill(""));
  const [timer, setTimer] = useState(resendCooldown);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const formatTime = (s: number) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleChange = useCallback(
    (index: number, value: string) => {
      const char = value.replace(/\D/g, "").slice(-1);
      const next = [...digits];
      next[index] = char;
      setDigits(next);
      if (char && index < DIGITS - 1) inputRefs.current[index + 1]?.focus();
    },
    [digits],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, DIGITS);
      const next = [...digits];
      pasted.split("").forEach((char, i) => {
        next[i] = char;
      });
      setDigits(next);
      const focusIdx = Math.min(pasted.length, DIGITS - 1);
      inputRefs.current[focusIdx]?.focus();
    },
    [digits],
  );

  const code = digits.join("");
  const isComplete = code.length === DIGITS;

  const handleVerify = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onVerify(code);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setDigits(Array(DIGITS).fill(""));
    setTimer(resendCooldown);
    inputRefs.current[0]?.focus();
    onResend();
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-14 h-14">
        <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
          <ScanFace size={28} className="text-primary" aria-hidden="true" />
        </div>
        <span
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow"
          aria-hidden="true"
        />
      </div>

      <Heading level="h4" className="text-primary text-center font-semibold">
        Verify Code
      </Heading>

      <p className="font-primary text-sm text-content text-center leading-relaxed">
        We sent a code to{" "}
        <span className="font-semibold text-primary">{email}</span>. Enter it
        below
      </p>

      <div className="flex items-center gap-3" role="group" aria-label="OTP code">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            aria-label={`Digit ${i + 1}`}
            className={`w-12 h-12 text-center text-lg font-semibold font-primary
              rounded-xl border transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              ${
                digit
                  ? "border-primary bg-primary-light text-primary"
                  : "border-gray-200 bg-white text-content"
              }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-1 font-primary text-xs text-content-light">
        <span>Resend code in</span>
        {timer > 0 ? (
          <span className="font-semibold text-primary">{formatTime(timer)}</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-primary hover:underline transition-colors duration-150"
          >
            Resend now
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={isLoading || !isComplete}
        className="w-full h-11 bg-gray-200 text-content-light text-sm font-semibold
          font-primary rounded-xl transition-all duration-200
          enabled:bg-primary enabled:text-white enabled:shadow-[0_2px_12px_rgba(37,99,235,0.3)]
          enabled:hover:bg-primary-dark
          disabled:cursor-not-allowed"
      >
        {isLoading ? "Verifying..." : "Verify Code"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 font-primary text-xs text-content-light
          hover:text-primary transition-colors duration-150 self-start"
        aria-label="Back"
      >
        <ChevronLeft size={14} aria-hidden="true" className="text-content-light" />
        <span>Back</span>
      </button>
    </div>
  );
};

export default VerifyCodeStep;
