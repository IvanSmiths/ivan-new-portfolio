import { dm_mono } from "../../../../utils/fonts/fonts";

const Showreel = () => {
  return (
    <a
      href="https://youtu.be/osf7rWGB9qw"
      className="group animate-fadeInUp relative cursor-pointer opacity-0 [animation-delay:100ms]"
      target="_blank"
      rel="noreferrer noopener"
    >
      <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
        <span className={`text-xs ${dm_mono} font-bold text-white uppercase`}>
          Watch on Youtube
        </span>
      </div>
      <span className={`text-xs ${dm_mono} text-foreground-muted uppercase`}>
        2020 - 2024 Showreel
      </span>
      <video className="object-cover md:h-40" autoPlay loop muted>
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
    </a>
  );
};

export default Showreel;
