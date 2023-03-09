import styles from "../assets/styles/Comments.module.css";

import { useEffect } from "react";

import useVoteInfo from "../hooks/useVoteInfo";
import MinusIcon from "../assets/icons/icon-minus.svg";
import PlusIcon from "../assets/icons/icon-plus.svg";

export default function CommentScore({ initScore, handleUpdateScore }) {
	const [voteInfo, dispatchVoteInfo] = useVoteInfo({
		score: initScore,
		upvotePressed: "false",
		downvotePressed: "false",
	});

	useEffect(() => {
		handleUpdateScore(voteInfo.score);
	}, [voteInfo]);

	return (
		<div className={styles.comment_score_container}>
			<button
				className={styles.comment_score_toggle}
				type="button"
				aria-label="Up vote"
				aria-pressed={voteInfo.upvotePressed}
				onClick={() => dispatchVoteInfo({ type: "upvote_clicked" })}
			>
				<PlusIcon className={styles.icon} />
			</button>
			<span className={styles.comment_score_value}>{voteInfo.score}</span>
			<button
				className={styles.comment_score_toggle}
				type="button"
				aria-label="Down vote"
				aria-pressed={voteInfo.downvotePressed}
				disabled={
					voteInfo.downvotePressed === "false" && voteInfo.score < 2
				}
				onClick={() => dispatchVoteInfo({ type: "downvote_clicked" })}
			>
				<MinusIcon className={styles.icon} />
			</button>
		</div>
	);
}
