/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useReducer, useRef } from "react";
import useTranslation from "next-translate/useTranslation";
import { gsap } from "gsap";

const Loader = ({ setHasVisited }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasVisited(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [setHasVisited]);

  let { t } = useTranslation();
  const [lettersRef, setlettersRef] = useArrayRef();

  function useArrayRef() {
    const lettersRef = useRef([]);
    lettersRef.current = [];
    return [lettersRef, (ref) => ref && lettersRef.current.push(ref)];
  }

  const text = "Web";
  const text2 = "development";
  const text3 = "is just about";
  const text4 = "three things";

  useEffect(() => {
    const anim = gsap.to(
      lettersRef.current,
      {
        opacity: 1,
        translateY: 0,
        duration: 1,
        stagger: 0.08,
      }
    );
    return (() => {
      anim.kill()
    })
  }, []);

  return (
    <div className="loader">
      <div className="loader-cnt">
        <h1 className="tiny-font spacing loader-sub-title">
          Ivan Smiths <br /> Frontend developer <br /> focused on visual
          effects
        </h1>
        <div className="uppercase big-font loader-title">
          <div className="overflow loader__header">
            {text.split("").map((letter, index) => (
              <em key={index} ref={setlettersRef}>
                {letter}
              </em>
            ))}
          </div>
          <div className="overflow loader__header">
            {text2.split("").map((letter, index) => (
              <em key={index} ref={setlettersRef}>
                {letter}
              </em>
            ))}
          </div>
          <div className="overflow loader__header">
            {text3.split("").map((letter, index) => (
              <em key={index} ref={setlettersRef}>
                {letter}
              </em>
            ))}
          </div>
          <div className="overflow loader__header">
            {text4.split("").map((letter, index) => (
              <em key={index} ref={setlettersRef}>
                {letter}
              </em>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Loader;
