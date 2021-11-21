/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const CGProspect = () => {
  return (
    <div>
      <h1>CGProspect</h1>
      <Link href="/">
        <a>
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1584306670957-acf935f5033c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80"
            height="500px"
            width="500px"
            alt="logo of CGProspect"
          />
        </a>
      </Link>
    </div>
  );
};

export default CGProspect;
