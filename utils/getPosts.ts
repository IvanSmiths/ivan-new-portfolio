import fs from "fs";
import path from "path";

export type Posts = {
  metadata: Metadata;
  slug: string;
  content: string;
};

export type Metadata = {
  title: string;
  publishedAt: string;
  image: string;
  category: string;
  date: string;
  time: string;
  description: string;
  cover: string;
  coverAlt: string;
  coverWidth: string;
  coverHeight: string;
  excerpt: string;
  tags: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex: RegExp = /---\s*([\s\S]*?)\s*---/;
  let match: RegExpExecArray | null = frontmatterRegex.exec(fileContent);
  let frontMatterBlock: string = match![1];
  let content: string = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines: string[] = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line): void => {
    let [key, ...valueArr] = line.split(": ");
    metadata[key.trim() as keyof Metadata] = valueArr.join(": ").trim();
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file: string) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  let rawContent: string = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "blogposts"));
}
