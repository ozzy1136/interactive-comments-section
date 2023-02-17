import Head from "next/head";

import CommentsSection from "@features/CommentsSection";

export default function Home() {
	return (
		<>
			<Head>
				<title>Frontend Mentor | Interactive comments section</title>
			</Head>
			<main>
				<CommentsSection />
			</main>
		</>
	);
}
