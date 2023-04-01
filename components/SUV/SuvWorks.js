import React from "react";
import { pageData } from "../../utils/suvData";
import ProjectItem from "../../components/ProjectItem/ProjectItem";

function SuvWorks() {
  return (
    <>
      <div className="gallery-container" id="gallery-container"></div>
      <section>
        <div className="main-container skewElem" id="main-container">
          <ul>
            {pageData.map((project, index) => (
              <ProjectItem key={index} project={project} itemIndex={index} />
            ))}
            <span className="lines line-4"></span>
          </ul>
        </div>
      </section>
    </>
  );
}

export default SuvWorks;
