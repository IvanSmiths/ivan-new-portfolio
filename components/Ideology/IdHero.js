import React, { useEffect, useRef, useContext, useState } from "react";
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

function IdHero() {
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
            UI/UX Designer: (Adobe XD)
          </span>
          <h1 ref={setStaggerRef} className="big-font impact">
            Ideology <br />
          </h1>
        </div>
        <Link href="https://www.ideology.it/">
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
              <li className="bold">{t("ideology:tech")}</li>
              <li>{t("ideology:animation")} Adobe XD</li>
              <li>{t("ideology:frontend")} HTML, CSS, jQuery</li>
              <li>{t("ideology:style")} WooCommerce, Stripe, PayPal</li>
            </ul>
            <ul ref={setStaggerRef}>
              <li className="bold">{t("ideology:date")}</li>
              <li>12/08/2020</li>
              <li>18/02/2022</li>
            </ul>
          </div>
          <div className="case-studio-header__second-row__first-list second-row__second-list">
            <ul ref={setStaggerRef}>
              <li className="bold">Clients:</li>

              <li>
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  href="https://lemonsoda.it/special-edition/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Lemon Soda
                </a>
              </li>
              <li>
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  href="https://www.remax-primaclasse.it/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Remax
                </a>
              </li>
              <li>
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  href="https://www.mabuprofumerie.it/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  MABÙ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          ref={setStaggerRef}
          className="case-studio-header__second-row__image"
        >
          <SrcImage
            src={"/ideology-website-1.jpg"}
            webp={"/ideology-website-1.webp"}
            height={"926px"}
            width={"1900px"}
            alt={"image"}
          />
        </div>
      </div>
    </header>
  );
}

export default IdHero;
