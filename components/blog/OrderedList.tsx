import { ReactNode } from "react";

export function OrderedList({ children }: { children: ReactNode }) {
  return <ol className="ml-6 list-decimal space-y-1">{children}</ol>;
}
