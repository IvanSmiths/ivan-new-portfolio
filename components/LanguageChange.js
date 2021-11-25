import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageChange = () => {
  let router = useRouter();
  return (
    <ul className="lang-cnt">
      <li>
        <Link locale="en" href={router.asPath}>
          <a>{router.locales[0]}</a>
        </Link>
      </li>
      <li>/</li>
      <li>
        <Link locale="it" href={router.asPath}>
          <a>{router.locales[1]}</a>
        </Link>
      </li>
    </ul>
  );
};

export default LanguageChange;
