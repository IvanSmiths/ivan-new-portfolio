import { ReactNode } from "react";

export function UnorderedList({ children }: { children: ReactNode }) {
  return <ul className="ml-6 list-disc space-y-1">{children}</ul>;
}
