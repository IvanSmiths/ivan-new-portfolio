import React from "react";
import Time from "../../components/HomePage/Time";
import FetchWeather from "../../components/HomePage/FetchWeather";

function Text() {
  return (
    <div className="grid-home-text pt-medium flex gap-small flex-col">
      <div className="flex">
        <span className="font-bold text-xl pr-5 text-right">TLDR</span>
        <h1 className="font-bold text-xl">
          Frontend UI/UX developer with 3 years of experience. seeking the
          limit. currently at TD Cowen.
        </h1>
      </div>
      <div className="flex">
        <span className="text-right">Social</span>
        <ul>
          <li>GitHub</li>
          <li>LinkedIn</li>
          <li>YouGTube</li>
        </ul>
      </div>
      <div className="flex">
        <span className=" text-right">Coding from</span>
        <ul className="flex-col gap-small">
          <li>Wiesbaden (DE)</li>
          <Time />
          <FetchWeather />
        </ul>
      </div>
    </div>
  );
}

export default Text;
