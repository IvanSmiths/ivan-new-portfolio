"use client";

import { useButtonStore } from "../../utils/store";

const Counter = () => {
  const { attempts, resetAll } = useButtonStore();

  if (attempts === 0) return null;

  return (
    <div className="absolute right-small top-small z-30 px-4 py-2">
      Attempts: {attempts}
      <button className="ml-2 rounded-lg px-4 py-2" onClick={resetAll}>
        Try again
      </button>
    </div>
  );
};

export default Counter;
