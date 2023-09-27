import { FC, MutableRefObject, useEffect, useRef } from 'react';
import { Work } from '../../utils/works';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

interface HeaderProps {
    work: Work;
}

type SetRef = (ref: HTMLSpanElement | null) => void;

const useArrayRef = (): [MutableRefObject<HTMLSpanElement[]>, SetRef] => {
    const lettersRef = useRef<HTMLSpanElement[]>([]);
    lettersRef.current = [];
    return [lettersRef, (ref: HTMLSpanElement | null) => ref && lettersRef.current.push(ref)];
}
const Header: FC<HeaderProps> = ({work}) => {
    const scope3Ref = useRef<HTMLDivElement | null>(null);
    const [lettersRef, setLettersRef] = useArrayRef();
    const triggerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let scope = work.scope
        scope = gsap.context(() => {
            gsap.to(
                lettersRef.current,
                {
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        scrub: true,
                        start: "top top",
                        end: "2000 top",
                        pin: true,
                        markers: true
                    },
                    color: "#2A2A2A",
                    duration: 5,
                    stagger: 1,
                }
            );
        }, scope3Ref);
        return () => scope.revert();
    }, [lettersRef, work.scope]);

    return (
        <>
            <div ref={scope3Ref} className="grid">
                <div ref={triggerRef}
                     className="h-[100vh] grid-small text-center flex justify-center items-center">
                    <div className="h-fit">
                        {work.jobDescription.split("").map((letter, index) => (
                            <span className="heading-big text-center" ref={setLettersRef} key={index}>
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
