import Head from "next/head";

import Comments from "@features/Comments";

export default function Home() {
	return (
		<>
			<Head>
				<title>Frontend Mentor | Interactive comments section</title>
			</Head>
			<main>
				<Comments />
			</main>
		</>
	);
}
