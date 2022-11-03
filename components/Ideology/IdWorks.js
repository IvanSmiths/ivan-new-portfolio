import React from "react";
import ProjectItem from "../ProjectItem/ProjectItem";
import { pageData } from "../../utils/sampleData";

function IdWorks() {
  return (
    <>
      <div className="gallery-container" id="gallery-container"></div>
      <section>
        <div className="main-container " id="main-container">
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

export default IdWorks;
