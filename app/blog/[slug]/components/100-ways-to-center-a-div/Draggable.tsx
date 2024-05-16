"use client";

import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import Resize from "./Resize";

type DraggableProps = {
  parent: "flexbox" | "css-grid";
  child?: "margin-auto";
};

const Draggable: FC<DraggableProps> = ({ parent, child }) => {
  const [width, setWidth] = useState<number>(400);
  const [height, setHeight] = useState<number>(200);
  const isResizing = useRef<boolean>(false);
  const prevMouseY = useRef<number | null>(null);
  const prevMouseX = useRef<number | null>(null);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    isResizing.current = true;
    prevMouseY.current = e.clientY;
    prevMouseX.current = e.clientX;
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      if (prevMouseX.current && prevMouseY.current) {
        const newWidth = width + (e.clientX - prevMouseX.current);
        const newHeight = height + (e.clientY - prevMouseY.current);
        const constrainedWidth = Math.min(Math.max(newWidth, 200), 600);
        const constrainedHeight = Math.min(Math.max(newHeight, 200), 400);

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

  let parentClassNames = "bg-primary rounded-md relative";
  let childClassNames = `${child ? child : ""} py-4 px-6 text-primary rounded-md w-fit bg-secondary`;
  let childText = "";

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
      <Resize handleMouseDown={handleMouseDown} />
      <div className={childClassNames}>{childText}</div>
    </div>
  );
};

export default Draggable;
