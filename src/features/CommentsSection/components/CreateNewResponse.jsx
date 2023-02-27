import { useState } from "react";

import styles from "../assets/styles/Comments.module.css";
import { useCurrentUser } from "@context/CurrentUserContext";
import Avatar from "./Avatar";
import { useNextCommentId } from "../context/NextCommentId";

/**
 *
 * @param {Object} props
 * @param {string} props.type Either "reply" or "send"
 */
export default function CreateNewResponse({ type, addNewResponse }) {
	const currentUser = useCurrentUser();
	const { nextCommentId, setNextCommentId } = useNextCommentId();
	const [responseContent, setResponseContent] = useState("");

	function handleSubmitResponse(e) {
		e.preventDefault();

		addNewResponse((previousComments) =>
			previousComments.concat({
				id: nextCommentId,
				content: responseContent,
				createdAt: "Today",
				score: 1,
				user: {
					...currentUser,
				},
			})
		);

		setResponseContent("");

		setNextCommentId((previousId) => previousId + 1);
	}

	return (
		<div className={styles.newresponse_container}>
			<form
				className={styles.newresponse_form_container}
				onSubmit={handleSubmitResponse}
				aria-label={
					type === "send" ? "Add a new comment" : "Reply to comment"
				}
			>
				<textarea
					className={styles.newresponse_form_textarea}
					value={responseContent}
					onChange={(e) => setResponseContent(e.target.value)}
					placeholder="Add a comment..."
					name="new-response-text"
					id="new-response-text"
				></textarea>
				<input
					className={`${styles.newresponse_form_button} ${styles.button_respond}`}
					type="submit"
					value={type}
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
