import Head from "next/head";

import projectData from "@data/data.json";
import { CurrentUserContext } from "@context/CurrentUserContext";
import CommentsSection from "@features/CommentsSection";

export default function Home() {
	return (
		<>
			<Head>
				<title>Frontend Mentor | Interactive comments section</title>
			</Head>
			<CurrentUserContext.Provider value={projectData.currentUser}>
				<main>
					<CommentsSection />
				</main>
			</CurrentUserContext.Provider>
		</>
	);
}
