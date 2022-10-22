/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

const Loader = ({ setHasVisited }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasVisited(false);
    }, 5555000);
    return () => clearTimeout(timer);
  }, [setHasVisited]);

  let { t } = useTranslation();

  return (
    <div className="loader">
      <div className="loader-cnt">
        <h1 className="tiny-font spacing loader-sub-title">
          Ivan Smiths <br /> {t("common:web-react")} <br /> focused on visual
          effects
        </h1>
        <div className="uppercase big-font loader-title">
          <div className="overflow loader__header">
            <em>
              {t("common:web-dev")} <br />
            </em>
          </div>
          <div className="overflow loader__header">
            <em>
              {t("common:web-dev-2")} <br />
            </em>
          </div>
          <div className="overflow loader__header">
            <em>
              {t("common:web-dev-3")} <br />
            </em>
          </div>
          <div className="overflow loader__header">
            <em>{t("common:web-dev-4")}...</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
