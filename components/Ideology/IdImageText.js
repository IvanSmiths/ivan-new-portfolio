import React from "react";
import SrcImage from "../SrcImage";
import useTranslation from "next-translate/useTranslation";

function IdImageText() {
  let { t } = useTranslation();
  return (
    <div className="case-studio__images">
      <div className="case-studio__screen-image">
        <SrcImage
          src="/ideology-website-2.jpg"
          webp="/ideology-website-2.webp"
          height="755px"
          width="1424px"
          alt="image of a website"
        />
      </div>
      <div className="case-studio__screen-image">
        <SrcImage
          src="/ideology-website-3.jpg"
          webp="/ideology-website-3.webp"
          height="728px"
          width="1417px"
          alt="image of a website"
        />
      </div>
      <div className="case-studio-description">
        <div className="case-studio-description__first-column">
          <h2 className="small-font">
            01 / <span> Coding</span>
          </h2>
          <h3 className="medium-font">Counter the inflexibility of WordPress</h3>
        </div>
        <div className="case-studio-description__second-column">
          <p>
            By being a Frontend developer, I had full control over the layout and design, adding CSS code in order to counter the inflexibility and lack of design of some WordPress themes and plug-ins. <br /> <br />
            I have also used WordPress by myself, building Website from scratch using YooTheme as a theme builder. I was used to to setup Stripe and PayPal payments with WooCommerce, how to deal with payied subsciption, and gained experience with the use of the most valuable plug-ins.
          </p>
        </div>
      </div>
    </div>
  );
}

export default IdImageText;
