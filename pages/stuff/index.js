/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useRef} from "react";
import Head from "next/head";
import Footer from "../../components/Footer";
import Stuff from "../../components/HomePage/Stuff";
import {gsap} from "gsap";

const Index = () => {
    const opacityRef = useRef(null)
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(opacityRef.current, {
                opacity: 0
            }, {
                opacity: 1,
                delay: 0.5,
                duration: 1
            })
        })
        return () => ctx.revert();
    }, []);
    return (
        <>
            <Head>
                <title>Ivan Smiths | All my works and projects</title>
                <meta
                    name="description"
                    content="All my works and projects, made all with React, Postgresql and Next,js."
                />
            </Head>
            <div style={{opacity: 0}} ref={opacityRef}>
                <Stuff/>
            </div>
            <Footer link="blog"/>
        </>
    );
};

export default Index;
