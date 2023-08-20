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
            <Link className="h-full w-full" href={link}>
                {hovered === true ? <>
                    <h1 className="text-white absolute bottom-small left-small text-xs">
                        {title}
                    </h1>
                </> : null}
                <img onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     src={img} alt={title} className='h-full object-cover'/>
            </Link>
        </li>
    )
}

export default HomeWork