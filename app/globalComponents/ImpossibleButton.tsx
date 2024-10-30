import React, { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

const ImpossibleButton = () => {
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });
  const [attempts, setAttempts] = useState<number>(() => {
    const saved = localStorage.getItem("buttonAttempts");
    return saved ? parseInt(saved, 0) : 0;
  });
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect((): void => {
    localStorage.setItem("buttonAttempts", attempts.toString());
  }, [attempts]);

  const getRandomPosition = (): Position => {
    const buttonWidth: number = 150;
    const buttonHeight: number = 50;
    const padding: number = 16;

    const maxX: number = Math.max(
      0,
      window.innerWidth - buttonWidth - padding * 2,
    );
    const maxY: number = Math.max(
      0,
      window.innerHeight - buttonHeight - padding * 2,
    );

    const minDistance: number =
      Math.min(window.innerWidth, window.innerHeight) / 4;

    let newPos: Position;
    let distance: number = 0;

    do {
      newPos = {
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      };

      distance = Math.sqrt(
        Math.pow(newPos.x - position.x, 2) + Math.pow(newPos.y - position.y, 2),
      );
    } while (distance < minDistance);

    return newPos;
  };

  const handleMouseNear = (): void => {
    setAttempts((prev: number) => prev + 1);
    setIsTransitioning(true);

    const newPos: Position = getRandomPosition();
    setPosition(newPos);

    setTimeout((): void => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative h-screen w-full bg-gray-100">
      <div className="absolute right-4 top-4 rounded-lg bg-white px-4 py-2 shadow">
        Attempts: {attempts}
      </div>
      <div
        className="absolute cursor-pointer p-8"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: isTransitioning ? "all 0.3s ease-in-out" : "none",
        }}
        onMouseEnter={handleMouseNear}
      >
        <button
          className={`
            whitespace-nowrap rounded-lg 
            bg-blue-500 
            px-6 
            py-3 
            text-white 
            shadow-lg 
            hover:bg-blue-600
            focus:outline-none
          `}
        >
          {attempts >= 5 ? "You tried enough times" : "Try to click me!"}
        </button>
      </div>
    </div>
  );
};

export default ImpossibleButton;
