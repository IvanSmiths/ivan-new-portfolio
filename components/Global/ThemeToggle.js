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
        setHover("w-4 h-4");
    };
    const handleMouseLeave = () => {
        setHover("w-2 h-2");
    };

    return (
        <>
            <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setActiveTheme(inactiveTheme)}
                className="cursor-pointer">
                {activeTheme === "dark" ? "light mode" : "dark mode"}
            </span>
        </>
    );
};

export default ThemeToggle;
