import { Code as CodeTheme } from "bright";
import { dm_mono } from "../../utils/fonts/fonts";
import { ReactNode } from "react";

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
  if (lang) {
    return (
      <CodeTheme title={title} lang={lang} {...props}>
        {children}
      </CodeTheme>
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
