import useTranslation from "next-translate/useTranslation";
import SrcImage from "../../components/SrcImage";
const CgFalling = () => {
  let { t } = useTranslation();
  return (
    <>
      <div className="falling-action-website-1-cnt falling-action-cg skewElem">
        <SrcImage
          src={"/cg-prospect-website-4.jpg"}
          webp={"/cg-prospect-website-4.webp"}
          height={"500px"}
          width={"100%"}
          alt={"image"}
          className={"falling-action-website-1"}
        />
      </div>
      <div className="falling-action-cnt skewElem">
        <em className="stuff-em spacing tiny-font">.falling action</em>
        <p>{t("cg-prospect:falling")}</p>
      </div>
    </>
  );
};

export default CgFalling;
