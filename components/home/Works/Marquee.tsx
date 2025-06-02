import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { MarqueeRefs } from "../../../utils/hooks/animations/useMarquee";

interface MarqueeProps {
  children: ReactNode;
}

export interface MarqueeHandle extends MarqueeRefs {}

export const Marquee = forwardRef<MarqueeHandle, MarqueeProps>(
  ({ children }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        container: containerRef.current,
        text: textRef.current,
      }),
      [],
    );

    return (
      <div
        ref={containerRef}
        className="bg-foreground pointer-events-none absolute inset-0 flex h-full items-center overflow-hidden opacity-0"
      >
        <h3 ref={textRef} className="gap-3xl flex font-black whitespace-nowrap">
          {children}
        </h3>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
