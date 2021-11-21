import React from 'react';

const Info = ({ opacity, id, itemIndex, project }) => {
  return (
    <div
      className="info-block"
      layout={id}
      style={{
        opacity,
      }}
    >
      <p className="info-block-header">
        <span>0{itemIndex + 1}</span>
      </p>
      {project.map((element) => (
        <p key={element}>
          <span>{element}</span>
        </p>
      ))}
    </div>
  );
};

export default Info;
