"use client";

import { useState } from "react";
import Check from "../global/Icons/Check";
import Copy from "../global/Icons/Copy";

interface CopyButtonProps {
  content: string;
}

export const CopyButton = ({ content }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-muted-foreground absolute top-8 right-4 z-10 cursor-pointer p-2 transition`}
      aria-label="Copy code"
    >
      {copied ? (
        <div className="flex flex-row items-center gap-2">
          <Check />
          <span className="text-xs">Copied!</span>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <Copy />
          <span className="text-xs">Copy</span>
        </div>
      )}
    </button>
  );
};
