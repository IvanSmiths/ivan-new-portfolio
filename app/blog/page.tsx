import getPosts, { Post, Posts } from "../../utils/getPosts";
import Link from "next/link";

export default async function Pag() {
  const posts: Posts[] = await getPosts();
  return (
    <div>
      {posts?.map((post: Post) => (
        <Link key={post.slug} href={`blog/${post.slug}`}>
          <div>{post.title}</div>
        </Link>
      ))}
    </div>
  );
}
