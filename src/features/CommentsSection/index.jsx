import commentsData from "@data/data.json";

import {
	comments_container,
	comments_threads_container,
	comments_thread_container,
} from "./assets/styles/Comments.module.css";
import CommentThread from "./components/CommentThread";

export default function CommentsSection() {
	return (
		<section className={comments_container}>
			<h1 aria-hidden="false" hidden>
				Comments Section
			</h1>
			<ol className={comments_threads_container}>
				{commentsData.comments.map((commentData) => (
					<li key={commentData.id}>
						<ul className={comments_thread_container}>
							<CommentThread data={commentData} />
						</ul>
					</li>
				))}
			</ol>
		</section>
	);
}
