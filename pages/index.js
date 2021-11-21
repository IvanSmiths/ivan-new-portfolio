import { useEffect, useState } from 'react';
import Hero from '../components/HomePage/Hero';
import { motion } from 'framer-motion';
import Loader from '../components/HomePage/Loader';
import Stuff from '../components/HomePage/Stuff';
import Head from 'next/head';
import Marquee from '../components/Marquee-innovation';
import FooterHome from '../components/HomePage/FooterHome';

const Home = () => {
  // LOADER  ANIMATION //
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loading
      ? document.querySelector('body').classList.add('loading')
      : document.querySelector('body').classList.remove('loading');
  }, [loading]);

  const [hasVisited, setHasVisited] = useState(false);
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setHasVisited({ hasVisitedBefore: false });
      localStorage.setItem('hasVisitedBefore', true);
    }
  }, []);

  const schemaData = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      name: 'IvanSmiths',
      url: 'https://www.ivansmiths.com',
      image: 'https://www.ivansmiths.com/main-texture.jpg',
      description: `just another react developer`,
      brand: {
        '@type': 'Brand',
        logo: 'https://www.ivansmiths.com/logo-icon-white.svg',
      },
      sameAs: 'https://www.ivansmiths.com',
      author: {
        '@type': 'Person',
        name: 'Ivan',
        familyName: 'Smiths',
        url: 'https://www.ivansmiths.com',
      },
      inLanguage: 'en',
      copyrightYear: 2020,
      genre: 'http://vocab.getty.edu/aat/300179434',
      headline: 'speed, security & INNOVATION',
      keywords: 'next.js, wiesbaden, react.js, frontend developer',
      locationCreated: 'wiesbaden',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': 'https://www.ivansmiths.com/stuff',
            name: 'Stuff',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': 'https://www.ivansmiths.com/post',
            name: 'What i write',
          },
        },
      ],
    },
  ];

  return (
    <>
      {loading && hasVisited ? (
        <motion.div key="loader">
          <Loader setLoading={setLoading} />
        </motion.div>
      ) : (
        <>
          <Head>
            <title>React / Frontend developer from Wiesbaden</title>
            <meta
              name="description"
              content="React, Next.js developer with 2 years of experience, based and currently living in Wiesbaden."
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
          </Head>
          <Hero />
          <Marquee />
          <Stuff />
          <FooterHome />
        </>
      )}
    </>
  );
};

export default Home;
