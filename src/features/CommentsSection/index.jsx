import { useImmer } from "use-immer";

import styles from "./assets/styles/Comments.module.css";
import projectData from "@data/data.json";
import CommentThread from "./components/CommentThread";
import AddNewResponse from "./components/AddNewResponse";
import { NextCommentIdProvider } from "./context/NextCommentId";
import { UpdateCommentsProvider } from "./context/UpdateComments";

export default function CommentsSection() {
	const [commentsData, setCommentsData] = useImmer(projectData.comments);

	return (
		<NextCommentIdProvider>
			<UpdateCommentsProvider value={setCommentsData}>
				<section
					className={`${styles.comments_container} section-container`}
				>
					<h1 aria-hidden="false" hidden>
						Comments Section
					</h1>
					<ol className={styles.comments_threads_container}>
						{commentsData.map((commentData, index) => (
							<li key={commentData.id}>
								<ul
									className={styles.comments_thread_container}
								>
									<CommentThread
										data={commentData}
										indexes={[]}
										commentIndex={index}
									/>
								</ul>
							</li>
						))}
					</ol>
					<AddNewResponse type={"new_comment"} />
				</section>
			</UpdateCommentsProvider>
		</NextCommentIdProvider>
	);
}
