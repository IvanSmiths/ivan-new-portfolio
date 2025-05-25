import { ReactNode } from "react";

type PageTemplateProps<T> = {
  entry: T;
  schema: Record<string, any>;
  renderContent: (entry: T) => ReactNode;
};

function PageTemplate<T>({
  entry,
  schema,
  renderContent,
}: PageTemplateProps<T>) {
  return (
    <section className="pr-sm md:pt-xl pt-sm max-lg:pl-sm gap-sm flex flex-col lg:flex-row">
      {renderContent(entry)}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </section>
  );
}

export default PageTemplate;
