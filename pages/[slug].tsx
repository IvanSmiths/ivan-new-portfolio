import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Work, works } from '../utils/works';
import Header from "../components/Work/Header";
import Description from "../components/Work/Description";
import Footer from "../components/Work/Footer";
import React from "react";

interface Params extends ParsedUrlQuery {
    slug: string;
}

interface WorkPageProps {
    work: Work;
}

const WorkPage: NextPage<WorkPageProps> = ({work}) => {
    return (
        <>
            <Header work={work}/>
            <Description work={work}/>
            <Footer work={work}/>
        </>
    );
};

export const getStaticProps: GetStaticProps<WorkPageProps, Params> = async ({params}) => {
    await waitload(4.3);
    const slug = params?.slug;
    const work = works.find((work) => work.slug === slug);

    return {
        props: {
            work,
            load: "load"
        },
    };
};

function waitload(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 300));
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = works.map((work) => ({
        params: {
            slug: work.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default WorkPage;
