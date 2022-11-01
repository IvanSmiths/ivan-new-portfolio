import React from "react";

function SuvTextBlock() {
  return (
    <div className="paragraph-block-outer paragraph-block-outer-first flex-center">
      <div className="paragraph-block-inner">
        <div className="paragraph-block__caption">
          <h3 className="medium-font">
            First concept, then design è il motto dell azienda. Ogni sito web
            partiva dal wireframing, il primo passaggio essenziale.
          </h3>
        </div>
        <div className="paragraph-block__link-text">
          <div>
            <a
              className="medium-font btn-small btn-small-3"
              href="https://www.s-v.de/en/"
            >
              Website
            </a>
          </div>
          <div className="paragraph-block__link-text__p">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
              nobis ad saepe unde tempore reprehenderit corrupti corporis,
              doloribus aspernatur similique earum aliquid iure ipsa, quam,
              dolore veritatis commodi necessitatibus numquam?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuvTextBlock;
