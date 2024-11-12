const ShowreelMobile = () => {
  return (
    <div className="relative h-full w-full flex-grow-0 p-small">
      <video
        className="h-full w-full rounded-md object-cover object-left"
        poster="https://utfs.io/f/aCaScRJubtiPvP7tAZ3UO3qozXDu8rHybdfWAaIZ6KiJ0lYk"
        muted
        playsInline
        autoPlay
        loop
      >
        <source
          src="https://utfs.io/f/aCaScRJubtiPkBbnx8gxYRIj0MPlmQb12ZBuf38FwgGHAsL9"
          type="video/mp4"
        />
        <track src="/videos/caption.vtt" kind="captions" />
      </video>
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
