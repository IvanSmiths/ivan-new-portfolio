import {useHoverStore} from "../../utils/store";

function SuvTextBlock() {

  const {setHover} = useHoverStore();
  const handleMouseEnter = () => {
    setHover("medium");
  };
  const handleMouseLeave = () => {
    setHover("small");
  };

  return (
    <div className="paragraph-block-outer paragraph-block-outer-first flex-center">
      <div className="paragraph-block-inner">
        <div className="paragraph-block__caption">
          <h3 className="medium-font">Mission: Typesafety (and coding jawdropping animations with Gsap and ScrollTrigger)</h3>
        </div>
        <div className="paragraph-block__link-text">
          <div>
            <a
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="medium-font btn-small btn-small-3"
              href="https://www.s-v.de/en/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Website
            </a>
          </div>
          <div className="paragraph-block__link-text__p">
            <p>Scholz & Volkmer is a creative agency for digital branding. Counting +180 employee and more than 30 clients such as Mercedes, DB and Adidas, S&V have been developing interactive communication since 1994 and every piece of work is based on a unique idea and presented using excellent design.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuvTextBlock;
