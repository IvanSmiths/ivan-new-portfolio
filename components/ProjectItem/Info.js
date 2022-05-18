import React from "react";

const Info = ({ id, project }) => {
  return (
    <div className="info-block" layout={id}>
      {project.map((element) => (
        <em className="small-font info-projects" key={element}>
          <span>{element}</span>
        </em>
      ))}
    </div>
  );
};

export default Info;
