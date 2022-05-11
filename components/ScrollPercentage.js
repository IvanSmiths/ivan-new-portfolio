import { useEffect, useState } from "react";
import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import useTranslation from "next-translate/useTranslation";

export const ScrollingAnimation = () => {
  const [currentPrecent, setCurrentPercent] = useState(0);
  const [currentProgressColor, setCurrentProgressColor] = useState(null);
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  useEffect(
    () =>
      yRange.onChange((v) => {
        setCurrentPercent(Math.trunc(yRange.current));
      }),
    [yRange]
  );

  useEffect(() => {
    setCurrentProgressColor(
      currentPrecent >= 90
        ? "#CDFF00"
        : currentPrecent >= 45
        ? "#31A9D5"
        : currentPrecent >= 20
        ? "#F2BD1D"
        : "#FF3B77"
    );
  }, [currentPrecent]);
  let { t } = useTranslation();

  return (
    <motion.div className="progress-cnt" data-scroll-container>
      <svg className="progress-icon" viewBox="0 0 60 60">
        <motion.path
          className="scroll-pecentage"
          fill={currentPrecent === 100 ? "#CDFF00" : "scroll-pecentage"}
          strokeWidth="0.8"
          stroke={currentProgressColor}
          strokeDasharray="0 1"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{
            pathLength,
            rotate: 90,
            translateX: 5,
            translateY: 5,
            opacity: 1,
            scaleX: -1,
          }}
        />
      </svg>
      <motion.div
        className="scroll-percentage-text"
        style={{
          position: "-webkit-sticky",
          position: "absolute",
          top: `${currentPrecent === 100 ? "12px" : `23px`}`,
          left: `${currentPrecent === 100 ? "22px" : `18px`}`,
          width: "10px",
          height: "10px",
          opacity: "1",
        }}
      >
        {currentPrecent === 100 ? `${t("common:go-up")}` : `${currentPrecent}%`}
      </motion.div>
    </motion.div>
  );
};

export default ScrollingAnimation;
