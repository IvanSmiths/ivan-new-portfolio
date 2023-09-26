import React from 'react';
import Link from "next/link";

function About() {
    return (
        <div>
            <h1>
                <Link href="/">
                    HOME
                </Link>
            </h1>
        </div>
    );
}

export async function getServerSideProps(context) {
    await waitload(1);
    return {
        props: {load: "load"},
    };
}

function waitload(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export default About;