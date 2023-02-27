import { useState } from "react";

import styles from "./assets/styles/Comments.module.css";
import projectData from "@data/data.json";
import CommentThread from "./components/CommentThread";
import CreateNewResponse from "./components/CreateNewResponse";
import { NextCommentIdContext } from "./context/NextCommentId";

export default function CommentsSection() {
	const [commentsData, setCommentsData] = useState(projectData.comments);
	const [nextCommentId, setNextCommentId] = useState(5);

	return (
		<NextCommentIdContext.Provider
			value={{ nextCommentId, setNextCommentId }}
		>
			<section
				className={`${styles.comments_container} section-container`}
			>
				<h1 aria-hidden="false" hidden>
					Comments Section
				</h1>
				<ol className={styles.comments_threads_container}>
					{commentsData.map((commentData) => (
						<li key={commentData.id}>
							<ul className={styles.comments_thread_container}>
								<CommentThread data={commentData} />
							</ul>
						</li>
					))}
				</ol>
				<CreateNewResponse
					type={"send"}
					addNewResponse={setCommentsData}
				/>
			</section>
		</NextCommentIdContext.Provider>
	);
}
