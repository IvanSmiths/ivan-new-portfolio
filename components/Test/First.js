/* eslint-disable @next/next/no-img-element */
import React from "react";

function First() {
  return (
    <div>
      <div className="stuff">
        <div className="stuff__company">
          <div className="stuff__company-inner">
            <h2>Company name</h2>
            <h2>Another Company name</h2>
            <h2>Third Company name</h2>
          </div>
        </div>
        <div className="stuff__image">
          <img
            src="scholz-und-volkmer-website-mobile-4.jpg"
            height="805"
            with="469"
            alt="work"
          />
          <img
            src="scholz-und-volkmer-website-mobile-4.jpg"
            height="805"
            with="469"
            alt="work"
          />
        </div>
        <div className="stuff__desc">
          <div className="stuff__desc-inner">
            <ul>
              <li>Frontend developer</li>
              <li>Link</li>
            </ul>
            <ul>
              <li>Frontend developer</li>
              <li>Link</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default First;
