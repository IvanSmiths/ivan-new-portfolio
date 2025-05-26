import { Code as CodeTheme } from "bright";
import { dm_mono } from "../../utils/fonts/fonts";

CodeTheme.theme = {
  dark: "slack-dark",
  light: "github-light",
};

CodeTheme.lineNumbers = true;
CodeTheme.style = {
  fontSize: "14px",
};

export const Code = (props: any) => {
  return (
    <code
      className={`bg-background-muted px-2 py-1 text-sm ${dm_mono.className}`}
      {...props}
    >
      {props.children}
    </code>
  );
};

export default Code;
