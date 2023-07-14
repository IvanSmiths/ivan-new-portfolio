/* eslint-disable @next/next/no-img-element */
import { icons } from "../utils/icons";

function FooterSimple() {
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
                      target="_blank"
                      rel="noopener noreferrer">
                      <img src={icon.icon} alt={icon.alt} height={iconWidth} width={iconWidth} />
                    </a>
                  </li>
                ))}
              </ul>
              <div>
                <a
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
