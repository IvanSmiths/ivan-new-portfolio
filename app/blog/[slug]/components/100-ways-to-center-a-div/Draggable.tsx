"use client";

import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import Resize from "./Resize";

type DraggableProps = {
  parent?: "flexbox" | "css-grid";
  child?: "margin-auto";
};

const Draggable: FC<DraggableProps> = ({ parent, child }) => {
  const [width, setWidth] = useState<number>(400);
  const [height, setHeight] = useState<number>(200);
  const isResizing = useRef<boolean>(false);
  const prevMouseY = useRef<number | null>(null);
  const prevMouseX = useRef<number | null>(null);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e): void => {
    isResizing.current = true;
    prevMouseY.current = e.clientY;
    prevMouseX.current = e.clientX;
  };

  const handleMouseUp = (): void => {
    isResizing.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!isResizing.current) return;

      if (prevMouseX.current && prevMouseY.current) {
        const newWidth: number = width + (e.clientX - prevMouseX.current);
        const newHeight: number = height + (e.clientY - prevMouseY.current);
        const constrainedWidth: number = Math.min(Math.max(newWidth, 200), 600);
        const constrainedHeight: number = Math.min(
          Math.max(newHeight, 200),
          400,
        );

        setWidth(constrainedWidth);
        setHeight(constrainedHeight);
        prevMouseY.current = e.clientY;
        prevMouseX.current = e.clientX;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [height, width]);

  let parentClassNames: string = "bg-primary rounded-md relative";
  let childClassNames: string = `${child ? child : ""} py-4 px-6 text-primary rounded-md w-fit bg-secondary`;
  let childText: string = "";

  switch (parent) {
    case "flexbox":
      parentClassNames += " flex items-center justify-center";
      childText = "Centered";
      break;
    default:
      break;
  }

  switch (child) {
    case "margin-auto":
      childClassNames += " m-auto";
      childText = "Still centered";
      break;
    default:
      break;
  }

  return (
    <div
      onMouseUp={handleMouseUp}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={parentClassNames}
    >
      <div className={childClassNames}>{childText}</div>
      <Resize handleMouseDown={handleMouseDown} />
    </div>
  );
};

export default Draggable;
