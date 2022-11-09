import React, { useContext } from "react";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "../CursorManager";

function IdTextBlock() {
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();

  return (
    <div className="paragraph-block-outer paragraph-block-outer-first flex-center">
      <div className="paragraph-block-inner">
        <div className="paragraph-block__caption">
          <h3 className="medium-font">{t("ideology:caption")}</h3>
        </div>
        <div className="paragraph-block__link-text">
          <div>
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="medium-font btn-small btn-small-3"
              href="https://www.ideology.it//"
              target="_blank"
              rel="noreferrer noopener"
            >
              Website
            </a>
          </div>
          <div className="paragraph-block__link-text__p">
            <p>{t("ideology:caption-desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdTextBlock;
