import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html suppressHydrationWarning lang="en">
			<Head />
			<body suppressHydrationWarning className="bg-background text-foreground">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
