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
    <img
      ref={refCallback}
      className={`inline object-cover ${className}`}
      src={src}
      alt={alt}
    />
  );
};
