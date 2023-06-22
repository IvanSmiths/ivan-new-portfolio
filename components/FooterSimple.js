/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { CursorContext } from "./CursorManager";
import { icons } from "../utils/icons";
import { useRouter } from "next/router";

function FooterSimple() {
  const { setSize } = useContext(CursorContext);
  const handleMouseEnter = () => {
    setSize("medium");
  };
  const handleMouseLeave = () => {
    setSize("small");
  };
  const router = useRouter();
  const iconWidth = "32x"

  return (
    <>
      <footer>
        <div className="footer-simple">
          <div className="footer-counter-inner">
            <div className="footer-counter__contact">
              <ul className="footer__icon">
                {icons.map((icon, index) => (
                  <li key={index}>
                    <a href={icon.link}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      target="_blank"
                      rel="noopener noreferrer">
                      <img src={icon.icon} alt={icon.alt} height={iconWidth} width={iconWidth} />
                    </a>
                  </li>
                ))}
              </ul>
              <div>
                <a
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  href="mailto:ivansmiths.com"
                  className="medium-font"
                >
                  info@ivansmiths.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer-small"></div>
      </footer>
    </>
  );
}
export default FooterSimple;
