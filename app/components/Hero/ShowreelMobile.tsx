import React from "react";

const ShowreelMobile = () => {
  return (
    <div className="relative h-full w-full flex-grow-0 p-small">
      <video
        src="/videos/showreel-short.mp4"
        className="h-full w-full rounded-md object-cover object-left"
        muted
        autoPlay
        loop
      />
      <a
        href="https://youtu.be/osf7rWGB9qw"
        target="_blank"
        rel="noreferrer noopener"
        className="absolute bottom-[30px] right-[30px] rounded-sm bg-dark px-4 py-2 text-xs font-semibold text-white transition hover:bg-light hover:text-dark"
      >
        Watch on YouTube
      </a>
    </div>
  );
};

export default ShowreelMobile;
