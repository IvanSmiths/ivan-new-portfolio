import Head from "next/head";
import {useHoverStore} from "../utils/store";
import Works from "../components/HomePage/Works";
import Text from "../components/HomePage/Text";

const Home = () => {
    const schemaData = {
        "@context": "http://schema.org",
        "@type": "WebSite",
        name: "IvanSmiths",
        url: "https://www.ivansmiths.com",
        image: "https://www.ivansmiths.com/main-texture.jpg",
        description: "Frontend developer with 2 years of experience",
        brand: {
            "@type": "Brand",
            logo: "https://www.ivansmiths.com/logo-icon-white.svg",
        },
        sameAs: "https://www.ivansmiths.com",
        author: {
            "@type": "Person",
            name: "Ivan",
            familyName: "Smiths",
            url: "https://www.ivansmiths.com",
        },
        inLanguage: "en",
        copyrightYear: 2020,
        genre: "http://vocab.getty.edu/aat/300179434",
        headline: "Speed, security & INNOVATION",
        keywords: "next.js, wiesbaden, react.js, frontend developer",
        locationCreated: "Wiesbaden",
    };

    const {setScrollHint} = useHoverStore();

    setTimeout(() =>
        setScrollHint(false), 4000
    )

    return (
        <>
            <Head>
                <title>React/Frontend developer from Wiesbaden</title>
                <meta name="description"
                      content="React/Frontend developer & UI/UX designer with three years of experience, based and currently living in Wiesbaden"/>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData)}}
                />
                <meta
                    name="msvalidate.01"
                    content="4BBF8C331FF33E2E7BFD0EF4CDD32BEC"
                />
            </Head>
            <Text/>
            <Works/>
        </>
    );
};

export default Home;
