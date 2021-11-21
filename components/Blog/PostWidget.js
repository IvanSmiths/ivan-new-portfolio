/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../../utils/index';
import SrcImage from '../SrcImage';

function PostWidget({ categories, slug }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);
  return (
    <div>
      <h3>{slug ? 'Related posts' : 'Recent posts'}</h3>
      {relatedPosts.map((post) => (
        <Link key={post.title} href={`/posts/${post.slug}`}>
          <a>
            <h4 className="small-font">{post.title}</h4>
            <div>{moment(post.createdAt).format('MMM DD, YY')}</div>
          </a>
        </Link>
      ))}
    </div>
  );
}

export default PostWidget;
