import { ReactNode } from "react";
import { notFound } from "next/navigation";

type PageTemplateProps<T> = {
  slug: string;
  data: T[];
  schemaFn: (entry: T) => Record<string, any>;
  renderContent: (entry: T) => ReactNode;
};

function PageTemplate<T extends { slug: string }>({
  slug,
  data,
  schemaFn,
  renderContent,
}: PageTemplateProps<T>) {
  const entry = data.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <>
      {renderContent(entry)}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaFn(entry)),
        }}
      />
    </>
  );
}

export default PageTemplate;
