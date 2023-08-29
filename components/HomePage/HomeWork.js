/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import {useEffect, useRef} from "react";
import gsap from "gsap"

function HomeWork({setProjectsRef, title, img, link, role}) {
    const triggerRef = useRef(null);
    const roleRef = useRef(null);
    const workRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({paused: true});
        tl.to(roleRef.current,
            {
                bottom: 1,
                duration: 0.3
            }).to(workRef.current,
            {
                bottom: 2,
                duration: 0.3
            }, 0.1)

        function handleMouseEnter() {
            tl.play();
        }

        function handleMouseLeave() {
            tl.reverse();
        }

        const trigger = triggerRef.current;
        trigger.addEventListener('mouseenter', handleMouseEnter);
        trigger.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            trigger.removeEventListener('mouseenter', handleMouseEnter);
            trigger.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <li ref={setProjectsRef} className='pb-0 sm:pb-small pt-small sm:pt-0 pl-small sm:pl-0 opacity-0 m-0 w-full
        h-full flex justify-center items-center text-center absolute top-0 left-0'>
            <Link className="relative h-full w-full sm:flex sm:justify-center" href={link}>
                <div className="absolute bottom-small w-full left-small text-left">
                    <div className="overflow-hidden relative h-10">
                        <h2 ref={roleRef} className="paragraph absolute -bottom-5 left-0 lowercase">
                            {role}
                        </h2>
                    </div>
                    <div className="overflow-hidden mt-1 relative h-10">
                        <h3 ref={workRef} className="absolute -bottom-9 left-0 heading-1-bold -mb-5 uppercase">
                            {title}
                        </h3>
                    </div>
                </div>
                <img ref={triggerRef} src={img} alt={title} className='w-full h-full object-cover'/>
            </Link>
        </li>
    )
}

export default HomeWork