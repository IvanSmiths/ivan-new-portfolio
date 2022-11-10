/* eslint-disable @next/next/no-img-element */
import React from "react";

function Third() {
  return (
    <div>
      <div className="works__outer">
        <div className="works__inner">
          <div className="works__company">
            <div className="works__company-inner">
              <div className="works__mask-top"></div>
              <h1>Suv</h1>
              <div className="works__mask-bottom"></div>
            </div>
          </div>
          <div className="works__image">
            <div className="works__image-inner">
              <img
                src="scholz-und-volkmer-website-mobile-4.jpg"
                height="805px"
                with="469px"
                alt="work"
              />
            </div>
          </div>
          <div className="works__desc">
            <div className="works__desc-inner">
              <div className="works__mask-top"></div>
              <ul>
                <li>Frontend developer</li>
                <li>Stack used</li>
                <li>Date</li>
              </ul>
              <div className="works__mask-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Third;
