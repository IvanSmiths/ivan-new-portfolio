/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import SrcImage from "../SrcImage";

const PostCard = ({ post }) => {
  return (
    <>
      <div className="post-card-cnt">
        <div className="post-card-info-cnt">
          <Link passHref href={`/post/${post.slug}`}>
            <motion.a
              layoutId={post.layoutid}
              className="medium-font impact impact-big uppercase"
            >
              {post.title}
            </motion.a>
          </Link>
          <span> {moment(post.createdAt).format("MMM DD, YY")}</span>
          <p className="small-font">{post.excerpt}</p>
          <Link href={`/post/${post.slug}`}>
            <a className="btn-small post-card-cta">Read it</a>
          </Link>
        </div>
        <div className="post-card-img-cnt">
          <Link href={`/post/${post.slug}`}>
            <a>
              <SrcImage
                src={post.image.url}
                webp={post.imagewebp.url}
                height={400}
                width={400}
                alt={"image"}
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;
