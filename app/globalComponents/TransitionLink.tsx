"use client";

import { useRouter } from "next/navigation";
import { animatePageOut } from "../../utils/animations";

export default function TransitionLink({
  href,
  label,
}: {
  href: string;
  label?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
  };

  return (
    <span className="mono" onClick={handleClick}>
      {label}
    </span>
  );
}
