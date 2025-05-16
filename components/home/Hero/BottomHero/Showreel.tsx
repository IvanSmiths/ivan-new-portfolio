const Showreel = () => {
  return (
    <video className="w-36 object-cover" autoPlay loop muted>
      <source
        src="https://utfs.io/f/aCaScRJubtiP2mWMJSOEGVHWUKY8TpulMShIcw9X3Asb6rBn"
        media="(min-width: 768px)"
        type="video/mp4"
      />
      <track src="/videos/caption.vtt" kind="captions" />
      <source
        src="https://utfs.io/f/aCaScRJubtiPkBbnx8gxYRIj0MPlmQb12ZBuf38FwgGHAsL9"
        media="(max-width: 767px)"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default Showreel;
