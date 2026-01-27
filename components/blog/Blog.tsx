import type { GetStaticProps } from "next";
import Link from "next/link";
import { formatDate } from "../../utils/formatters/formatDate";
import { getPosts } from "../../utils/queries/posts/getPosts";
import type { Post } from "../../utils/queries/posts/types";
import { dm_mono } from "../../utils/style/fonts/fonts";

type BlogPageProps = {
	posts: Post[];
};

export default function BlogPage({ posts }: BlogPageProps) {
	return (
		<main className="p-sm gap-sm flex flex-wrap">
			{posts.map((post: Post, index: number) => (
				<Link
					key={index}
					className={`group animate-fadeInUp [animation-delay:${index + 1}00ms] hover:bg-foreground border-background-muted gap-sm hover:border-foreground p-sm flex w-[600px] flex-col border opacity-0 transition`}
					href={`blog/${post?.slug}`}
				>
					<img
						src={post.cover}
						className="w-full object-cover"
						alt="blogpost"
					/>
					<div className="gap-sm flex items-center">
						<time
							className={`group-hover:text-background ${dm_mono} text-xs uppercase transition`}
							dateTime={post.publishedAt}
						>
							{formatDate(post.publishedAt)}
						</time>
						<span
							className={`group-hover:text-background ${dm_mono} text-xs uppercase transition`}
						>
							{post.category}
						</span>
					</div>
					<h2 className="group-hover:text-background text-2xl font-medium transition md:text-4xl">
						{post.title}
					</h2>
					<h3 className="group-hover:text-background text-sm transition">
						{post.description}
					</h3>
				</Link>
			))}
		</main>
	);
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
	const posts = getPosts(); // synchronous

	return {
		props: { posts },
		revalidate: 60, // optional ISR: rebuild every 60s
	};
};
