import useTranslation from "next-translate/useTranslation";
import SrcImage from "../../components/SrcImage";

function CgExp() {
  let { t } = useTranslation();
  return (
    <>
      <div className="exposition-cnt skewElem">
        <div className="exposition">
          <em className="tiny-font spacing stuff-em">.exposition</em>
          <h2 className="large-font word-wrap impact uppercase">
            {t("cg-prospect:fastest")}
          </h2>
        </div>
      </div>

      <div className="exposition-website-1-cnt skewElem">
        <SrcImage
          src={"/cg-prospect-website-2.jpg"}
          webp={"/cg-prospect-website-2.webp"}
          height={"60%"}
          width={"60%"}
          alt={"image"}
          className={"exposition-website-1"}
        />
      </div>
    </>
  );
}

export default CgExp;
