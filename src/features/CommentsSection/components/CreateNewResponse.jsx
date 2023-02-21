import styles from "../assets/styles/Comments.module.css";
import { useCurrentUser } from "@context/CurrentUserContext";
import Avatar from "./Avatar";

function handleSubmitNewComment(e) {
	e.preventDefault();

	console.log("new comment was submitted");
}

export default function CreateNewResponse({ action }) {
	const currentUser = useCurrentUser();

	return (
		<div className={styles.newcomment_container}>
			<form
				className={styles.newcomment_form_container}
				onSubmit={handleSubmitNewComment}
			>
				<textarea
					className={styles.newcomment_form_textarea}
					placeholder="Add a comment..."
					name="new-comment-text"
					id="new-comment-text"
				></textarea>
				<input
					className={`${styles.newcomment_form_button} ${styles.button_respond}`}
					type="submit"
					value={action}
				/>
			</form>
			<div className={styles.newcomment_avatar_wrapper}>
				<Avatar
					src={currentUser.image.webp}
					username={currentUser.username}
				/>
			</div>
		</div>
	);
}
