import React from "react";
import useTranslation from "next-translate/useTranslation";
function CgTextBlock() {
  let { t } = useTranslation();
  return (
    <div className="paragraph-block-outer paragraph-block-outer-first flex-center">
      <div className="paragraph-block-inner">
        <div className="paragraph-block__caption">
          <h3 className="medium-font">{t("cg-prospect:caption")}</h3>
        </div>
        <div className="paragraph-block__link-text">
          <div>
            <a
              className="medium-font btn-small btn-small-3"
              href="https://www.cgprospect.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Website
            </a>
          </div>
          <div className="paragraph-block__link-text__p">
            <p>{t("cg-prospect:caption-desc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CgTextBlock;
