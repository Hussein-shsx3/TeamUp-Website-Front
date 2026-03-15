"use client";

import Link from "next/link";

interface AuthSwitchPromptProps {
  promptText: string;
  actionText: string;
  onAction?: () => void;
  href?: string;
  className?: string;
}

const AuthSwitchPrompt = ({
  promptText,
  actionText,
  onAction,
  href = "/auth",
  className = "mt-6",
}: AuthSwitchPromptProps) => {
  return (
    <p className={`font-primary text-xs md:text-sm text-content ${className}`.trim()}>
      {promptText}{" "}
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="text-primary font-medium hover:underline"
        >
          {actionText}
        </button>
      ) : (
        <Link href={href} className="text-primary font-medium hover:underline">
          {actionText}
        </Link>
      )}
    </p>
  );
};

export default AuthSwitchPrompt;
