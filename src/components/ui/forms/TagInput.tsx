"use client";

import { useCallback, useState } from "react";
import { X } from "lucide-react";

export interface TagInputProps {
  id: string;
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  /**
   * `bordered` — self-contained field (border + focus ring), e.g. project team skills.
   * `minimal` — chips + input only; parent supplies the outer card/border.
   */
  variant?: "bordered" | "minimal";
}

const TagInput = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Add…",
  variant = "bordered",
}: TagInputProps) => {
  const [draft, setDraft] = useState("");

  const addTag = useCallback(() => {
    const next = draft.trim();
    if (!next) return;
    if (value.some((s) => s.toLowerCase() === next.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, next]);
    setDraft("");
  }, [draft, value, onChange]);

  const removeTag = useCallback(
    (tag: string) => {
      onChange(value.filter((s) => s !== tag));
    },
    [value, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const shell =
    variant === "bordered"
      ? `min-h-[48px] w-full rounded-lg border border-gray-200 px-3 py-2
         flex flex-wrap gap-2 items-center
         focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10
         transition-all duration-200`
      : `flex min-h-[44px] flex-wrap items-center gap-2`;

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label
          htmlFor={id}
          className="font-primary text-sm text-content-light"
        >
          {label}
        </label>
      ) : null}
      <div className={shell}>
        {value.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex max-w-full items-center gap-1 rounded-md bg-primary-light
              py-1 pl-2.5 pr-1 font-primary text-xs font-medium text-primary"
          >
            <span className="break-words">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="flex shrink-0 rounded-full p-0.5 text-primary hover:bg-primary/10"
              aria-label={`Remove ${tag}`}
            >
              <X size={14} aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (draft.trim()) addTag();
          }}
          placeholder={placeholder}
          className="min-w-[8rem] flex-1 border-0 bg-transparent font-primary text-sm text-content
            outline-none placeholder:text-content-muted focus:ring-0"
        />
      </div>
    </div>
  );
};

export default TagInput;
