import React from "react";
import SrcImage from "../SrcImage";

function SuvDesc() {
  return (
    <div className="cs__desc-outer">
      <div className="cs__desc-inner">
        <div className="cs__desc-image flex-center">
          <SrcImage
            src="/scholz-und-volkmer-website-1.jpg"
            webp="/scholz-und-volkmer-website-1.webp"
            height="970px"
            width="1920px"
            alt="image of a website"
          />
        </div>
        <ul className="cs__desc-text">
          <li className="medium-font">
            Stack: Vue.js (Nuxt.js), TypeScript, Gsap
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SuvDesc;
