import getPosts, { Post, Posts } from "../../utils/getPosts";
import Link from "next/link";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";

export default async function Pag() {
  const posts: Posts[] = await getPosts();
  return (
    <div className="mt-large">
      <Navbar position={Position.Fixed} />
      {posts?.map((post: Post) => (
        <Link key={post.slug} href={`blog/${post.slug}`}>
          <div>{post.title}</div>
        </Link>
      ))}
    </div>
  );
}
