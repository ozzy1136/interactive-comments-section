import styles from "../assets/styles/Comments.module.css";
import { useCurrentUser } from "@context/CurrentUserContext";
import Avatar from "./Avatar";

function handleSubmitNewResponse(e) {
	e.preventDefault();

	console.log("new response was submitted");
}

export default function CreateNewResponse({ action }) {
	const currentUser = useCurrentUser();

	return (
		<div className={styles.newresponse_container}>
			<form
				className={styles.newresponse_form_container}
				onSubmit={handleSubmitNewResponse}
			>
				<textarea
					className={styles.newresponse_form_textarea}
					placeholder="Add a comment..."
					name="new-response-text"
					id="new-response-text"
				></textarea>
				<input
					className={`${styles.newresponse_form_button} ${styles.button_respond}`}
					type="submit"
					value={action}
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
