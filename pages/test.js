import Link from 'next/link';
import {useEffect} from "react";


function Test() {

    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);

    return (
        <div>
            <Link href="/">
                <h2 className="text-white">go back</h2>
            </Link>
            <h1 className="text-9xl">Teest text</h1>
            <h1 className="text-9xl">Teest text</h1>
            <img
                src="/ideology-website-7.png"
                className="w-full h-full object-cover"
            />
            <img
                src="ideology-website-7.png"
                className="w-full h-full object-cover"
            />
            <h1 className="text-9xl">Teest text</h1>
            <h1 className="text-9xl">Teest text</h1>
        </div>
    );
}

export default Test;
