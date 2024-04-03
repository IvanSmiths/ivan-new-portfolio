type Headings = { children: string };

export const MDXComponents = {
  h1: (props: Headings) => (
    <h1 {...props} className="text-red-500 text-5xl">
      {props.children}
    </h1>
  ),
  h2: (props: Headings) => (
    <h2 {...props} className="text-red-500 text-3xl">
      {props.children}
    </h2>
  ),
};
