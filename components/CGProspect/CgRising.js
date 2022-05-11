import useTranslation from "next-translate/useTranslation";
import SrcImage from "../../components/SrcImage";

function CgRising() {
  let { t } = useTranslation();
  return (
    <>
      <div className="rising-action-cnt skewElem">
        <em className="stuff-em spacing tiny-font">.Rising action</em>
        <p>{t("cg-prospect:rising")}</p>
      </div>
      <div className="falling-action-website-1-cnt skewElem">
        <SrcImage
          src={"/cg-prospect-website-3.jpg"}
          webp={"/cg-prospect-website-3.webp"}
          height={"500px"}
          width={"100%"}
          alt={"image"}
          className={"falling-action-website-1"}
        />
      </div>
    </>
  );
}

export default CgRising;
