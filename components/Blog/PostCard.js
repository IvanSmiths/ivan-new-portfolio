/* eslint-disable @next/next/no-img-element */
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SrcImage from '../SrcImage';

const PostCard = ({ post }) => {
  return (
    <>
      <div className="post-card-cnt">
        <div className="post-card-info-cnt">
          <Link href={`/post/${post.slug}`}>
            <a>
              <motion.h2
                layoutId={post.layoutid}
                className="big-font impact impact-big uppercase"
              >
                {post.title}
              </motion.h2>
            </a>
          </Link>
          <span> {moment(post.createdAt).format('MMM DD, YY')}</span>
          <p>{post.excerpt}</p>
        </div>
        <div className="post-card-img-cnt">
          <Link href={`/post/${post.slug}`}>
            <a>
              <SrcImage
                src={post.image.url}
                webp={post.imagewebp.url}
                height={400}
                width={400}
                alt={'image'}
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;
