import React from "react";
import useTranslation from "next-translate/useTranslation";

const Marquee = () => {
  let { t } = useTranslation();
  return (
    <div className="marquee">
      <em className="impact large-font">{t("common:marquee")}</em>
    </div>
  );
};

export default Marquee;
