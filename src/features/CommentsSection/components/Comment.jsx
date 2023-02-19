import styles from "../assets/styles/Comments.module.css";
import MinusIcon from "@icons/icon-minus.svg";
import PlusIcon from "@icons/icon-plus.svg";
import ReplyIcon from "@icons/icon-reply.svg";
import Avatar from "./Avatar";

export default function Comment({ data }) {
	return (
		<article className={styles.comment_container}>
			<header className={styles.comment_details_container}>
				<Avatar
					src={data.user.image.webp}
					username={data.user.username}
				/>
				<span>{data.user.username}</span>
				<p>
					<small>{data.createdAt}</small>
				</p>
			</header>
			<div className={styles.comment_text_container}>
				<p>{data.content}</p>
			</div>
			<div className={styles.comment_score_container}>
				<PlusIcon className={styles.icon} />
				{data.score}
				<MinusIcon className={styles.icon} />
			</div>
			<div className={styles.comment_reply_container}>
				<ReplyIcon className={styles.icon} />
				<span>Reply</span>
			</div>
		</article>
	);
}
