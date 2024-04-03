import getPosts, { Post, Posts } from "../../utils/getPosts";
import Link from "next/link";
import Navbar from "../globalComponents/Navbar/Navbar";

export default async function Pag() {
  const posts: Posts[] = await getPosts();
  return (
    <div>
      <Navbar />
      {posts?.map((post: Post) => (
        <Link key={post.slug} href={`blog/${post.slug}`}>
          <div>{post.title}</div>
        </Link>
      ))}
    </div>
  );
}
