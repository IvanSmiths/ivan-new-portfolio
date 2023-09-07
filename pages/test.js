import {useEffect} from "react";
import ScrollSection from "../components/Tests/ScrollSection";

function Test() {

    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);

    return (
        <ScrollSection/>
    );
}

export default Test;
