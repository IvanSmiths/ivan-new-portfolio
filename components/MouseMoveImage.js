import { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

import React from 'react';
import Title from './ProjectsIndex/Title';
import Media from './ProjectsIndex/Media';
import sampleData from '../utils/sampleData';

function MouseMoveImage() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { x, y } = useMousePosition();
  return (
    <div className="page-wrapper">
      <div className="project-list">
        {sampleData.map(({ title }, index) => (
          <Title
            index={index}
            key={title}
            title={title}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
      <div className="project-media">
        {sampleData.map(({ mediaUrl }, index) => {
          const isActive = index === activeIndex;
          const xPos = isActive ? x : 0;
          const yPos = isActive ? y : 0;
          return (
            <Media
              x={xPos}
              y={yPos}
              key={mediaUrl}
              url={mediaUrl}
              active={isActive}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MouseMoveImage;
