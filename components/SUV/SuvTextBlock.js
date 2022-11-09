import React from "react";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "../CursorManager";
function SuvTextBlock() {
  let { t } = useTranslation();
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  return (
    <div className="paragraph-block-outer paragraph-block-outer-first flex-center">
      <div className="paragraph-block-inner">
        <div className="paragraph-block__caption">
          <h3 className="medium-font">{t("suv:caption")}</h3>
        </div>
        <div className="paragraph-block__link-text">
          <div>
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="medium-font btn-small btn-small-3"
              href="https://www.s-v.de/en/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Website
            </a>
          </div>
          <div className="paragraph-block__link-text__p">
            <p>{t("suv:caption-desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuvTextBlock;
