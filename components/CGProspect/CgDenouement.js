import useTranslation from "next-translate/useTranslation";

function CgDenouement() {
  let { t } = useTranslation();
  return (
    <div className="denouement-cnt skewElem">
      <em className="stuff-em spacing tiny-font">.denouement</em>
      <h3 className="impact impact-large uppercase word-wrap large-font">
        {t("cg-prospect:denouement")}
      </h3>
    </div>
  );
}

export default CgDenouement;
