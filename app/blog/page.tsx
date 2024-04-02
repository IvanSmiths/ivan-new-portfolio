import getPosts from "../../utils/fetchPosts";
import Link from "next/link";

export default async function Pag() {
  const posts = await getPosts();
  console.log(posts[0].body);
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} href={`blog/${post.slug}`}>
          <div className="w-5">{post.title}</div>
        </Link>
      ))}
    </div>
  );
}
