/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import {useEffect, useRef} from "react";
import gsap from "gsap"

function HomeWork({setProjectsRef, title, img, link, role}) {
    const trigger = useRef(null);
    const myDiv = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({paused: true});
        tl.fromTo(myDiv.current,
            {opacity: 0},
            {opacity: 1, duration: 0.2});

        function handleMouseEnter() {
            tl.play();
        }

        function handleMouseLeave() {
            tl.reverse();
        }

        const div = trigger.current;
        div.addEventListener('mouseenter', handleMouseEnter);
        div.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            div.removeEventListener('mouseenter', handleMouseEnter);
            div.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);


    return (
        <li ref={setProjectsRef} className='pb-0 sm:pb-small pt-small sm:pt-0 pl-small sm:pl-0 opacity-0 m-0 w-full h-full flex justify-center
            items-center text-center absolute top-0 left-0'>
            <Link className="relative h-full w-full sm:flex sm:justify-center" href={link}>
                <div ref={myDiv} className="absolute bottom-small left-small text-left -mb-3">
                    <h2 className="paragraph -mb-2 lowercase">
                        {role}
                    </h2>
                    <h3 className="heading-1-bold uppercase">
                        {title}
                    </h3>
                </div>
                <img ref={trigger} src={img} alt={title} className='w-full h-full object-cover'/>
            </Link>
        </li>
    )
}

export default HomeWork