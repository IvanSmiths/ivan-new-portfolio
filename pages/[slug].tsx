import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Work, works } from '../utils/works';

interface Params extends ParsedUrlQuery {
    slug: string;
}

interface WorkPageProps {
    work: Work;
}

const WorkPage: NextPage<WorkPageProps> = ({work}) => {
    return (
        <div>
            <h1>{work.title}</h1>
            <p>{work.description}</p>
            {work.images && work.images.map((image, index) => <img src={image} key={index}/>)}
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
