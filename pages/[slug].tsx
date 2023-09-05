import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Work, works } from '../utils/works';
import Header from "../components/Work/Header";

interface Params extends ParsedUrlQuery {
    slug: string;
}

interface WorkPageProps {
    work: Work;
}

const WorkPage: NextPage<WorkPageProps> = ({work}) => {
    return (
        <div>
            <Header work={work}/>;
        </div>
    );
};

export const getStaticProps: GetStaticProps<WorkPageProps, Params> = async ({params}) => {
    const slug = params?.slug;
    const work = works.find((work) => work.title === slug);

    return {
        props: {
            work,
        },
    };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = works.map((work) => ({
        params: {
            slug: work.title,
        },
    }));

    return {
        paths,
        fallback: false,
    };
};

export default WorkPage;
