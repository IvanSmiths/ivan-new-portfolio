import { Bebas_Neue } from "next/font/google";

type Text = { children: string };

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas_neue",
  display: "swap",
});

export const MDXComponents = {
  h1: (props: Text) => (
    <h1 {...props} className={`${bebas_neue.className} font-bold text-7xl`}>
      {props.children}
    </h1>
  ),
  h2: (props: Text) => (
    <h2 {...props} className={`${bebas_neue.className} font-bold text-6xl`}>
      {props.children}
    </h2>
  ),
  h3: (props: Text) => (
    <h3 {...props} className={`${bebas_neue.className} font-bold text-5xl`}>
      {props.children}
    </h3>
  ),
  h4: (props: Text) => (
    <h4 {...props} className={`${bebas_neue.className} font-bold text-4xl`}>
      {props.children}
    </h4>
  ),
  h5: (props: Text) => (
    <h5 {...props} className={`${bebas_neue.className} font-bold text-4xl`}>
      {props.children}
    </h5>
  ),
  h6: (props: Text) => (
    <h6 {...props} className={`${bebas_neue.className} font-bold text-4xl`}>
      {props.children}
    </h6>
  ),
  p: (props: Text) => (
    <p {...props} className="text-lg">
      {props.children}
    </p>
  ),
  strong: (props: Text) => (
    <strong {...props} className="text-lg font-bold">
      {props.children}
    </strong>
  ),
  a: (props: Text) => (
    <a
      {...props}
      target="_blank"
      rel="noopener"
      className="text-lg underline font-bold"
    >
      {props.children}
    </a>
  ),
  li: (props: Text) => (
    <li {...props} className="text-lg list-disc">
      {props.children}
    </li>
  ),
};
