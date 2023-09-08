import { FC, memo, useState } from "react";

interface SrcImageProps {
    src: string;
    webp: string;
    alt: string;
    height: string | number;
    width: string | number;
    className?: string;
    lazyOff?: boolean;
    placeholder?: string;
}

const SrcImage: FC<SrcImageProps> = ({src, webp, alt, height, width, className, placeholder}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            <picture className={className ? className : null}>
                <source
                    height={height}
                    width={width}
                    srcSet={webp}
                    type="image/webp"
                />
                <img
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    src={imageLoaded ? src : placeholder}
                    height={height}
                    width={width}
                    onLoad={() => setImageLoaded(true)}
                />
            </picture>
        </>
    );
}

export default memo(SrcImage);

