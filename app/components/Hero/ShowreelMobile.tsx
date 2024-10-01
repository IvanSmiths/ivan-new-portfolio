import React from "react";

const ShowreelMobile = () => {
  return (
    <div className="grid">
      <video
        src="/videos/showreel-short.mp4"
        className="col-span-full"
        muted
        autoPlay
        loop
      />
    </div>
  );
};

export default ShowreelMobile;
