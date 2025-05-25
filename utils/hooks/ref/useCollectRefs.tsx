import { useEffect, useRef } from "react";

export function useCollectRefs<T extends HTMLElement>() {
  const refs = useRef<T[]>([]);

  useEffect(() => {
    refs.current = [];
  }, []);

  const setRef = (el: T | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return { refs, setRef };
}
