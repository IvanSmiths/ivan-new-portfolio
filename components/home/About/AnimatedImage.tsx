type AnimatedImageProps = {
  src: string;
  alt?: string;
  className?: string;
  refCallback: (el: HTMLImageElement | null) => void;
};

export const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt = "",
  className = "",
  refCallback,
}) => {
  return (
    <figure className="inline h-24 overflow-hidden">
      <img
        ref={refCallback}
        className={`inline origin-left scale-150 object-cover ${className}`}
        src={src}
        alt={alt}
      />
    </figure>
  );
};
