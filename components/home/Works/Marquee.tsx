import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { MarqueeRefs } from "../../../utils/hooks/animations/useMarquee";

interface MarqueeProps {
  children: ReactNode;
}

export interface MarqueeHandle extends MarqueeRefs {}

export const Marquee = forwardRef<MarqueeHandle, MarqueeProps>(
  ({ children }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

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
        <div ref={textRef} className="flex whitespace-nowrap">
          {children}
        </div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
