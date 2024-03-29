import { useState } from "react";

import styles from "../assets/styles/Comments.module.css";
import { useCurrentUser } from "@context/CurrentUserContext";
import Avatar from "./Avatar";
import { useNextCommentId } from "../context/NextCommentId";
import { useUpdateComments } from "../context/UpdateComments";
import { addResponse } from "../utils";

export default function AddNewResponse({
	isNewComment = false,
	indexes = [],
	replyingTo,
	setIsReplying,
}) {
	const currentUser = useCurrentUser();
	const { nextCommentId, setNextCommentId } = useNextCommentId();
	const updateComments = useUpdateComments();
	const [responseContent, setResponseContent] = useState("");

	function handleSubmitResponse(e) {
		e.preventDefault();

		updateComments((draft) => {
			addResponse(draft, indexes, {
				id: nextCommentId,
				content: responseContent.trim(),
				createdAt: "Today",
				score: 1,
				...(replyingTo !== undefined && { replyingTo: replyingTo }),
				user: { ...currentUser },
				replies: [],
			});
		});

		setResponseContent("");

		setNextCommentId((previousId) => previousId + 1);

		if (!isNewComment) setIsReplying(false);
	}

	return (
		<div className={styles.newresponse_container}>
			<form
				className={styles.newresponse_form_container}
				onSubmit={handleSubmitResponse}
				aria-label={
					isNewComment ? "Add a new comment" : "Reply to comment"
				}
			>
				<textarea
					className={`${styles.newresponse_form_textarea} ${styles.form_textarea}`}
					value={responseContent}
					onChange={(e) => setResponseContent(e.target.value)}
					placeholder="Add a comment..."
					name="new-response-text"
					id="new-response-text"
					required
				></textarea>
				<input
					className={`${styles.newresponse_form_button} ${styles.button_action}`}
					type="submit"
					value={isNewComment ? "Send" : "Reply"}
				/>
			</form>
			<div className={styles.newresponse_avatar_wrapper}>
				<Avatar
					src={currentUser.image.webp}
					username={currentUser.username}
				/>
			</div>
		</div>
	);
}
