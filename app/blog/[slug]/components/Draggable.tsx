"use client";
import { FC, useEffect, useRef, useState, MouseEventHandler } from 'react'

type DraggableProps = {
    type: 'div' | 'span' | 'p'
}

const Draggable: FC<DraggableProps> = ({ type }) => {
    const [width, setWidth] = useState<number>(200);
    const [height, setHeight] = useState<number>(100);
    const isResizing = useRef<boolean>(false);
    const prevMouseY = useRef<number | null>(null);
    const prevMouseX = useRef<number | null>(null);

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;

        if (prevMouseX.current && prevMouseY.current) {
            const newWidth = width + (e.clientX - prevMouseX.current);
            const newHeight = height + (e.clientY - prevMouseY.current);
            const constrainedWidth = Math.min(Math.max(newWidth, 200), 600);
            const constrainedHeight = Math.min(Math.max(newHeight, 100), 400);

            setWidth(constrainedWidth);
            setHeight(constrainedHeight);
            prevMouseY.current = e.clientY;
            prevMouseX.current = e.clientX;
        }
    };

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
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

    let classNames = 'bg-primary rounded-md';

    switch (type) {
        case 'div':
            classNames += ' flex items-center justify-center';
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
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ width: `${width}px`, height: `${height}px`, cursor: 'ew-resize' }}
            className={classNames}>
            <div className='py-4 px-6 text-primary rounded-md w-fit bg-secondary'>Centered</div>
        </div>
    )
}

export default Draggable
