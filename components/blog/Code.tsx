import type { ReactNode } from "react";
import { dm_mono } from "../../utils/style/fonts/fonts";
import { CopyButton } from "./CopyButton";

interface CodeProps {
  children: ReactNode;
  className?: string;
}

export default function Code({ children, className }: CodeProps) {
  const isBlock = className?.includes("language-");

  const codeString = typeof children === "string" ? children.trim() : "";
  console.log("MDX code className:", className);

  if (!isBlock) {
    return (
      <code
        className={`rounded bg-muted px-1.5 py-0.5 text-sm ${dm_mono.className}`}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-6">
      <CopyButton content={codeString} />
      <pre className="overflow-x-auto rounded-xl bg-code p-4">
				<code className={`${className} ${dm_mono.className}`}>{children}</code>
			</pre>
    </div>
  );
}
