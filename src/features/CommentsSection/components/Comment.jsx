import { useState } from "react";

import styles from "../assets/styles/Comments.module.css";
import MinusIcon from "../assets/icons/icon-minus.svg";
import PlusIcon from "../assets/icons/icon-plus.svg";
import ReplyIcon from "../assets/icons/icon-reply.svg";
import EditIcon from "../assets/icons/icon-edit.svg";
import DeleteIcon from "../assets/icons/icon-delete.svg";
import Avatar from "./Avatar";
import { useCurrentUser } from "@context/CurrentUserContext";
import useVoteInfo from "../hooks/useVoteInfo";
import CreateNewResponse from "./CreateNewResponse";

export default function Comment({ data, commenter }) {
	const currentUser = useCurrentUser();
	const [voteInfo, dispatchVoteSelection] = useVoteInfo({
		score: data.score,
		upvotePressed: "false",
		downvotePressed: "false",
	});
	const [isReplying, setIsReplying] = useState(false);

	const isCurrentUser = currentUser.username === data.user.username;

	return (
		<>
			<article className={styles.comment_container}>
				<header className={styles.comment_details_container}>
					<Avatar
						src={data.user.image.webp}
						username={data.user.username}
					/>
					<span className={styles.comment_details_username}>
						{data.user.username}
					</span>
					{isCurrentUser && (
						<span className={styles.comment_details_label}>
							<small>you</small>
						</span>
					)}
					{/* In real world case, precise date would be available and would be used with <time> */}
					<span className={styles.comment_details_date}>
						<small>{data.createdAt}</small>
					</span>
				</header>
				<div className={styles.comment_content_container}>
					<p>
						{typeof commenter === "string" && (
							<span className={styles.comment_content_commenter}>
								@{commenter}&nbsp;
							</span>
						)}
						{data.content}
					</p>
				</div>
				<div className={styles.comment_score_container}>
					<button
						className={`${styles.comment_score_toggle}`}
						type="button"
						aria-label="Up vote"
						aria-pressed={voteInfo.upvotePressed}
						onClick={() =>
							dispatchVoteSelection({ type: "upvote_clicked" })
						}
					>
						<PlusIcon className={styles.icon} />
					</button>
					<span className={styles.comment_score_value}>
						{voteInfo.score}
					</span>
					<button
						className={`${styles.comment_score_toggle}`}
						type="button"
						aria-label="Down vote"
						aria-pressed={voteInfo.downvotePressed}
						disabled={
							voteInfo.downvotePressed === "false" &&
							voteInfo.score <= 1
						}
						onClick={() =>
							dispatchVoteSelection({ type: "downvote_clicked" })
						}
					>
						<MinusIcon className={styles.icon} />
					</button>
				</div>
				{isCurrentUser ? (
					<div className={styles.comment_useraction_container}>
						<button
							type="button"
							className={`${styles.comment_delete_button} ${styles.comment_action_button}`}
						>
							<DeleteIcon className={styles.icon} />
							<span>Delete</span>
						</button>
						<button
							type="button"
							className={`${styles.comment_edit_button} ${styles.comment_action_button}`}
						>
							<EditIcon className={styles.icon} />
							<span>Edit</span>
						</button>
					</div>
				) : (
					<div className={styles.comment_reply_button_wrapper}>
						<button
							type="button"
							className={`${styles.comment_reply_button} ${styles.comment_action_button}`}
							onClick={() => setIsReplying(!isReplying)}
						>
							<ReplyIcon className={styles.icon} />
							<span>Reply</span>
						</button>
					</div>
				)}
			</article>
			{isReplying && <CreateNewResponse action="Reply" />}
		</>
	);
}
