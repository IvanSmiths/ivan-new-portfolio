/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import {useState} from "react";

function HomeWork({setProjectsRef, title, img, link}) {
    const [hovered, setHovered] = useState(false)

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <li ref={setProjectsRef} className='pb-0 sm:pb-small pt-small sm:pt-0 pl-small sm:pl-0 opacity-0 m-0 w-full h-full flex justify-center
            items-center text-center absolute top-0 left-0'>
            <Link className="relative h-full w-full sm:flex sm:justify-center" href={link}>
                <h2 className="paragraph absolute bottom-small left-small">
                    {title}
                </h2>
                <img onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     src={img} alt={title} className='w-full h-full object-cover'/>
            </Link>
        </li>
    )
}

export default HomeWork