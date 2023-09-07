import { FC, useEffect, useRef } from 'react';
import { Work } from '../../utils/works';
import { gsap } from "gsap";

interface HeaderProps {
    work: Work;
}

const Header: FC<HeaderProps> = ({work}) => {
    const scopeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {

        }, scopeRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={scopeRef} className="grid">
                <div className="grid-column-3-10 h-[100vh] text-center flex justify-center items-center">
                    <div className="h-fit">
                        {work.jobDescription.split("").map((letter, index) => (
                            <span className="heading-1 text-center" key={index}>
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;
