/* eslint-disable @next/next/no-img-element */
import {useEffect, useState} from "react";
import {useHoverStore} from "../../utils/store";

const ThemeToggle = () => {
    const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme);
    const inactiveTheme = activeTheme === "light" ? "dark" : "light";

    useEffect(() => {
        document.body.dataset.theme = activeTheme;
        window.localStorage.setItem("theme", activeTheme);
    }, [activeTheme]);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme");
        savedTheme && setActiveTheme(savedTheme);
    }, []);

    const {setHover} = useHoverStore();
    
    const handleMouseEnter = () => {
        setHover("medium");
    };
    const handleMouseLeave = () => {
        setHover("small");
    };

    return (
        <>
            <img
                height="20px"
                width="20px"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer z-10"
                onClick={() => setActiveTheme(inactiveTheme)}
                src={activeTheme === "dark" ? "/moon.svg" : "/sun.svg"}
                alt={`Change to ${inactiveTheme}`}
            />
        </>
    );
};

export default ThemeToggle;
