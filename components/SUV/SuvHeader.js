/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { CursorContext } from "../CursorManager";
import SrcImage from "../SrcImage";

function useArrayRef() {
  const staggerRefs = useRef([]);
  staggerRefs.current = [];
  return [staggerRefs, (ref) => ref && staggerRefs.current.push(ref)];
}

function SuvHeader() {
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

  let router = useRouter();
  return (
    <>
      <header className="case-studio-header">
        <div className="case-studio-header__first-row">
          <div>
            <span ref={setStaggerRef} className="small-font stagger">
              {t("suv:header")} Vue.js (Nuxt.js)
            </span>
            <h1 ref={setStaggerRef} className="big-font impact stagger">
              Scholz & Volkmer <br />
            </h1>
          </div>
          <Link href="https://www.s-v.de/en/">
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
                <li className="bold">{t("suv:tech")}</li>
                <li>{t("suv:frontend")} Vue.js (Nuxt.js)</li>
                <li>{t("suv:animation")} Gsap</li>
                <li>{t("suv:style")} Scss/Sass</li>
              </ul>
              <ul ref={setStaggerRef}>
                <li className="bold">{t("suv:date")}</li>
                <li>12/03/2022</li>
                <li>{t("suv:current")}</li>
              </ul>
            </div>
            <div
              ref={setStaggerRef}
              className="case-studio-header__second-row__first-list second-row__second-list"
            >
              <ul>
                <li className="bold">Clients:</li>

                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href="https://www.adidas-group.com/en/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Adidas
                  </a>
                </li>
                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href="https://perfection.wmf.com/de/perfection/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    WMF
                  </a>
                </li>
                <li>
                  <a
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    href="https://db-engineering-consulting.com/en/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Deutsche Bahn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="case-studio-header__second-row__image">
            <SrcImage
              src={"/scholz-und-volkmer-website-2.jpg"}
              webp={"/scholz-und-volkmer-website-2.webp"}
              height={"926px"}
              width={"1900px"}
              alt={"work"}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default SuvHeader;
