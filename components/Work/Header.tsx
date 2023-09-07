/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useRef } from 'react';
import { Work } from '../../utils/works';
import { gsap } from "gsap";

interface HeaderProps {
    work: Work;
}

const Header: FC<HeaderProps> = ({work}) => {
    const scope2Ref = useRef<HTMLHeadElement | null>(null);
    const jobRef = useRef<HTMLHeadingElement | null>(null);
    const companyRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        window.scrollTo({top: 0});
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.to(jobRef.current,
                {
                    bottom: 1,
                    duration: 0.5,
                    ease: "circ.out"
                }).to(companyRef.current,
                {
                    bottom: 2,
                    duration: 0.5,
                    ease: "circ.out"
                }, 0.1)
        }, scope2Ref);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <header ref={scope2Ref} className="grid">
                <div className="grid-column-8-11 h-[75vh] flex flex-col justify-center">
                    <div className="overflow-hidden relative h-10">
                        <h1 ref={jobRef} className="paragraph absolute -bottom-5 left-0 lowercase">{work.job}</h1>
                    </div>
                    <div className="overflow-hidden mt-1 relative h-10">
                        <h2 ref={companyRef}
                            className="heading-1-bold absolute -bottom-9 left-0 -mb-5 uppercase">{work.company}</h2>
                    </div>
                </div>
                <div className="grid-column-2-11">
                    <ul className="flex justify-between items-end pb-small">
                        <li>
                            <a href={work.website} rel="noopener" target="_blank">
                                website
                            </a>
                        </li>
                        <li className="flex flex-col">
                            {work.jobStack.map((date, i) => (
                                <span key={i}>{date}</span>
                            ))}
                        </li>
                        <li className="flex flex-col">
                            {work.jobDates.map((date, i) => (
                                <span key={i}>{date}</span>
                            ))}
                        </li>
                        <li>
                            <a href={work.jobLinkedin} rel="noopener" target="_blank">
                                linkedin
                            </a>
                        </li>
                    </ul>
                    <img src={work.mainImage} alt={`${work.company} main image`}/>
                </div>
            </header>
        </>
    )
};

export default Header;
