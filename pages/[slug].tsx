import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Work, works } from '../utils/works';
import Header from "../components/Work/Header";
import Description from "../components/Work/Description";
import Footer from "../components/Work/Footer";
import Layout from "../components/Global/Layout";
import React from "react";

interface Params extends ParsedUrlQuery {
    slug: string;
}

interface WorkPageProps {
    work: Work;
}

const WorkPage: NextPage<WorkPageProps> = ({work}) => {
    return (
        <Layout>
            <Header work={work}/>
            <Description work={work}/>
            <Footer work={work}/>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<WorkPageProps, Params> = async ({params}) => {
    const slug = params?.slug;
    const work = works.find((work) => work.slug === slug);

    return {
        props: {
            work,
        },
    };
};

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