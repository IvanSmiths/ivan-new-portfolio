import { FC, useRef } from "react";

const PageTransition: FC = () => {
    const transitionRef = useRef<HTMLDivElement | null>(null);
    return (
        <div ref={transitionRef}></div>
    )
}

export default PageTransition