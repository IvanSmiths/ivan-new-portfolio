"use client";

import { Position, useButtonStore } from "../../utils/store";
import { useEffect } from "react";

const ImpossibleButton = () => {
  const {
    position,
    attempts,
    isTransitioning,
    incrementAttempts,
    setPosition,
    resetPosition,
    setTransitioning,
  } = useButtonStore();

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

  useEffect(() => {
    const handleResize = () => resetPosition();
    window.addEventListener("resize", handleResize);
    resetPosition();

    return () => window.removeEventListener("resize", handleResize);
  }, [resetPosition]);

  const handleMouseNear = (): void => {
    incrementAttempts();
    setTransitioning(true);

    const newPos: Position = getRandomPosition();
    setPosition(newPos);

    setTimeout((): void => {
      setTransitioning(false);
    }, 300);
  };

  const getButtonMessage = (attempts: number): string => {
    const messages = [
      "Go home",
      "Nice try!",
      "Almost got it!",
      "Keep trying...",
      "One more time!",
      "You tried enough times 😅"
    ];
    
    return attempts >= messages.length ? messages[messages.length - 1] : messages[attempts];
  };

  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute z-50 cursor-pointer p-8"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: isTransitioning ? "all 0.3s ease-in-out" : "none",
        }}
        onMouseEnter={handleMouseNear}
      >
       <button>{getButtonMessage(attempts)}</button>
      </div>
    </div>
  );
};

export default ImpossibleButton;
