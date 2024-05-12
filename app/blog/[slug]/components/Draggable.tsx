"use client";
import { gsap } from "gsap";

import { FC, useEffect, useRef, useState } from 'react'

type DraggableProps = {
    type: 'div' | 'span' | 'p'
}

const Draggable: FC<DraggableProps> = ({ type }) => {
    const [width, setWidth] = useState(200);
    const isResizing = useRef(false);
    const prevMouseX = useRef(null);

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;

        const newWidth = width + (e.clientX - prevMouseX.current);
        const constrainedWidth = Math.min(Math.max(newWidth, 200), 600);

        setWidth(constrainedWidth);
        prevMouseX.current = e.clientX;

    };

    const handleMouseDown = (e) => {
        isResizing.current = true;
        prevMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
        isResizing.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [width]);
    let classNames = 'w-8 h-8 bg-gray-100 p-4';

    switch (type) {
        case 'div':
            classNames += ' div';
            break;
        case 'span':
            classNames += ' span';
            break;
        case 'p':
            classNames += ' p';
            break;
        default:
            break;
    }

    return (
        <div style={{ width: width }}>
            <div onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={{ width: `${width}px`, height: '100px', cursor: 'ew-resize', border: '1px solid black' }} className={classNames}>
                <span>Centered</span>
            </div>
        </div>
    )
}
export default Draggable
