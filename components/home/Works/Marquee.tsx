import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { MarqueeRefs } from "../../../utils/hooks/animations/useMarquee";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  textClassName?: string;
}

export interface MarqueeHandle extends MarqueeRefs {}

export const Marquee = forwardRef<MarqueeHandle, MarqueeProps>(
  ({ children, className = "", textClassName = "" }, ref) => {
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
        className={`pointer-events-none absolute inset-0 flex items-center overflow-hidden opacity-0 ${className}`}
      >
        <div
          ref={textRef}
          className={`flex whitespace-nowrap ${textClassName}`}
        >
          {children}
        </div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
