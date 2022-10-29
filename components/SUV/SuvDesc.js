import React from "react";
import SrcImage from "../SrcImage";

function SuvDesc() {
  return (
    <div className="cs__desc">
      <div className="cs__desc-image flex-center">
        <SrcImage
          src="/scholz-und-volkmer-website-3.jpg"
          webp="/scholz-und-volkmer-website-3.webp"
          height="970px"
          width="1920px"
          alt="image of a website"
        />
      </div>
      <ul className="cs__desc-text">
        <li>Frontend: Vue.js (Nuxt.js), TypeScript, Gsap</li>
        <li>
          Date: 12/03/2022 <br /> Current
        </li>
      </ul>
    </div>
  );
}

export default SuvDesc;
