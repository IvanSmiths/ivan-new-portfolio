import { Code as CodeTheme } from "bright";
import { dm_mono } from "../../utils/style/fonts/fonts";
import { ReactNode } from "react";
import { CopyButton } from "./CopyButton";

CodeTheme.theme = {
  dark: "slack-dark",
  light: "github-light",
};

CodeTheme.lineNumbers = true;
CodeTheme.style = {
  fontSize: "14px",
};

interface CodeProps {
  lang?: string;
  children: ReactNode;
  title?: string;

  [key: string]: any;
}

export const Code = ({ lang, title, children, ...props }: CodeProps) => {
  const codeString =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : "";

  if (lang) {
    return (
      <div className="relative -my-3">
        <CopyButton content={codeString} />
        <CodeTheme title={title} lang={lang} {...props}>
          {children}
        </CodeTheme>
      </div>
    );
  }

  return (
    <code
      className={`bg-background-muted px-2 py-1 text-sm ${dm_mono.className}`}
      {...props}
    >
      {children}
    </code>
  );
};

export default Code;
