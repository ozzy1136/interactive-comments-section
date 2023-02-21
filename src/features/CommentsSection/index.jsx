import styles from "./assets/styles/Comments.module.css";
import projectData from "@data/data.json";
import CommentThread from "./components/CommentThread";
import CreateNewResponse from "./components/CreateNewResponse";

export default function CommentsSection() {
	return (
		<section className={`${styles.comments_container} section-container`}>
			<h1 aria-hidden="false" hidden>
				Comments Section
			</h1>
			<ol className={styles.comments_threads_container}>
				{projectData.comments.map((commentData) => (
					<li key={commentData.id}>
						<ul className={styles.comments_thread_container}>
							<CommentThread data={commentData} />
						</ul>
					</li>
				))}
			</ol>
			<CreateNewResponse action={"Send"} />
		</section>
	);
}
