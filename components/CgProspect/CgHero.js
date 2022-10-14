import React, { useEffect, useContext, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "../../components/CursorManager";
import SrcImage from "../../components/SrcImage";

function useArrayRef() {
  const staggerRefs = useRef([]);
  staggerRefs.current = [];
  return [staggerRefs, (ref) => ref && staggerRefs.current.push(ref)];
}

function CgHero() {
  const [staggerRefs, setStaggerRef] = useArrayRef();

  useEffect(() => {
    gsap.fromTo(
      staggerRefs.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.2,
      }
    );
  }, [staggerRefs]);

  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };

  let { t } = useTranslation();
  return (
    <header className="case-studio-header">
      <div className="case-studio-header__first-row">
        <div>
          <span ref={setStaggerRef} className="small-font ">
            {t("cg-prospect:header")} React.js (Next.js)
          </span>
          <h1 ref={setStaggerRef} className="big-font impact">
            CG Prospect <br />
          </h1>
        </div>
        <Link href="https://www.cgprospect.com/">
          <a
            ref={setStaggerRef}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="case-studio-header__link btn-small"
          >
            website
          </a>
        </Link>
      </div>
      <div className="case-studio-header__second-row">
        <div>
          <div className="case-studio-header__second-row__first-list">
            <ul ref={setStaggerRef}>
              <li className="bold">{t("cg-prospect:tech")}</li>
              <li>{t("cg-prospect:frontend")}React.js (Next.js)</li>
              <li>Backend: PostgreSQL (Prisma)</li>
              <li>{t("cg-prospect:style")}CSS</li>
            </ul>
            <ul ref={setStaggerRef}>
              <li className="bold">{t("cg-prospect:date")}</li>
              <li>11/06/2021</li>
              <li>{t("cg-prospect:current")}</li>
            </ul>
          </div>
          <div className="case-studio-header__second-row__first-list second-row__second-list"></div>
        </div>
        <div className="case-studio-header__second-row__image">
          <SrcImage
            src={"/cg-prospect-website-1.jpg"}
            webp={"/cg-prospect-website-1.webp"}
            height={"752px"}
            width={"1440px"}
            alt={"image"}
          />
        </div>
      </div>
    </header>
  );
}

export default CgHero;
