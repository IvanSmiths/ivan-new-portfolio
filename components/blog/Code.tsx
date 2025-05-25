import { Code as CodeTheme } from "bright";

CodeTheme.theme = {
  dark: "nord",
  light: "github-light",
};

export const Code = (props: any) => {
  return (
    <code className="bg-background rounded-lg px-2 py-1 font-bold" {...props}>
      {props.children}
    </code>
  );
};

export default Code;
