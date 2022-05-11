import useTranslation from "next-translate/useTranslation";

function CgClimax() {
  let { t } = useTranslation();
  return (
    <main className="climax-cnt flex-center skewElem">
      <div className="climax">
        <em className="stuff-em spacing tiny-font">.climax</em>
        <p>{t("cg-prospect:climax")}</p>
      </div>
    </main>
  );
}

export default CgClimax;
