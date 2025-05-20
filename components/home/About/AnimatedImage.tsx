type AnimatedImageProps = {
  src: string;
  alt?: string;
  refCallback: (el: HTMLImageElement | null) => void;
};

export const AnimatedImage = ({
  src,
  alt = "",
  refCallback,
}: AnimatedImageProps) => {
  return (
    <figure className="inline h-16 overflow-hidden lg:h-24">
      <img
        ref={refCallback}
        className="inline h-16 origin-left scale-150 object-cover pb-4 lg:h-24"
        src={src}
        alt={alt}
      />
    </figure>
  );
};
