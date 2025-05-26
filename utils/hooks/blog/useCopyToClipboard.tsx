import { useState } from "react";

export const useCopyToClipboard = (timeout = 1500) => {
  const [copied, setCopied] = useState(false);

  const copy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  return { copied, copy };
};
