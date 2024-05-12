"use client";
import { FC, useEffect, useRef, useState } from 'react'

type DraggableProps = {
    type: 'div' | 'span' | 'p'
}

const Draggable: FC<DraggableProps> = ({ type }) => {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(100);
    const isResizing = useRef(false);
    const prevMouseY = useRef(null);
    const prevMouseX = useRef(null);

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;

        const newWidth = width + (e.clientX - prevMouseX.current);
        const newHeight = height + (e.clientY - prevMouseY.current);
        const constrainedWidth = Math.min(Math.max(newWidth, 200), 600);
        const constrainedHeight = Math.min(Math.max(newHeight, 100), 400);

        setWidth(constrainedWidth);
        setHeight(constrainedHeight);
        prevMouseY.current = e.clientY;
        prevMouseX.current = e.clientX;
    };

    const handleMouseDown = (e) => {
        isResizing.current = true;
        prevMouseY.current = e.clientY;
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
    }, [width, height]);

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
        <div style={{ width: width, height: height }}>
            <div onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={{ width: `${width}px`, height: `${height}px`, cursor: 'ew-resize', border: '1px solid black' }} className={classNames}>
                <span>Centered</span>
            </div>
        </div>
    )
}

export default Draggable
