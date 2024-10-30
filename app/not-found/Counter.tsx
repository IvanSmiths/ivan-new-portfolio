"use client";
import { useButtonStore } from "../../utils/store";

const Counter = () => {
  const { attempts, resetAll } = useButtonStore();
  return (
    <div className="absolute right-4 top-4 z-30 rounded-lg px-4 py-2">
      Attempts: {attempts}
      <button
        className="ml-2 rounded-lg px-4 py-2 text-white shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={resetAll}
      >
        Try again
      </button>
    </div>
  );
};

export default Counter;
