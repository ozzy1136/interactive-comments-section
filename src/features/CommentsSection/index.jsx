import { useState } from "react";
import { useImmer } from "use-immer";
import { useA11yDialog } from "react-a11y-dialog";

import styles from "./assets/styles/Comments.module.css";
import projectData from "@data/data.json";
import CommentThread from "./components/CommentThread";
import AddNewResponse from "./components/AddNewResponse";
import DeleteDialog from "./components/DeleteDialog";
import { NextCommentIdProvider } from "./context/NextCommentId";
import { UpdateCommentsProvider } from "./context/UpdateComments";
import { DeleteDialogProvider } from "./context/DeleteDialog";

export default function CommentsSection() {
	const [commentsData, setCommentsData] = useImmer(projectData.comments);
	const [instance, attr] = useA11yDialog({
		id: "delete-comment-dialog",
		role: "dialog",
		title: "Delete comment",
	});
	const [commentToDelete, setCommentToDelete] = useState({
		parentIndexes: undefined,
		idToDelete: undefined,
	});

	return (
		<NextCommentIdProvider>
			<UpdateCommentsProvider value={setCommentsData}>
				<DeleteDialogProvider value={instance}>
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
										className={
											styles.comments_thread_container
										}
									>
										<CommentThread
											data={commentData}
											parentIndexes={[]}
											commentIndex={index}
											setCommentToDelete={
												setCommentToDelete
											}
										/>
									</ul>
								</li>
							))}
						</ol>
						<AddNewResponse isNewComment={true} />
					</section>
					<DeleteDialog
						attr={attr}
						commentToDelete={commentToDelete}
					/>
				</DeleteDialogProvider>
			</UpdateCommentsProvider>
		</NextCommentIdProvider>
	);
}
