"use client";

import Check from "../global/Icons/Check";
import Copy from "../global/Icons/Copy";
import { useCopyToClipboard } from "../../utils/hooks/blog/useCopyToClipboard";
import { ReactNode } from "react";

type CopyButtonProps = {
  content: string;
};

type Label = "Copied!" | "Copy";

export const CopyButton = ({ content }: CopyButtonProps) => {
  const { copied, copy } = useCopyToClipboard();

  const icon: ReactNode = copied ? <Check /> : <Copy />;
  const label: Label = copied ? "Copied!" : "Copy";

  return (
    <button
      onClick={() => copy(content)}
      className={`text-muted-foreground absolute top-8 right-4 z-10 cursor-pointer p-2 transition`}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
      title={copied ? "Copied!" : "Copy"}
      aria-live="polite"
    >
      <div className="flex flex-row items-center gap-2">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
    </button>
  );
};
