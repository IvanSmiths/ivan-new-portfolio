/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import {useState} from "react";

function HomeWork({setProjectsRef, title, img, link, role}) {
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
                <div className="absolute bottom-small left-small text-left -mb-3">
                    <h2 className="paragraph -mb-2">
                        {role}
                    </h2>
                    <h3 className="heading-1-bold">
                        {title}
                    </h3>
                </div>

                <img onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}
                     src={img} alt={title} className='w-full h-full object-cover'/>
            </Link>
        </li>
    )
}

export default HomeWork