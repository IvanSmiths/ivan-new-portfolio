import React from "react";

const ShowreelMobile = () => {
  return (
    <div className="h-full w-full flex-grow-0 p-small">
      <video
        src="/videos/showreel-short.mp4"
        className="h-full w-full object-cover object-left"
        muted
        autoPlay
        loop
      />
    </div>
  );
};

export default ShowreelMobile;
