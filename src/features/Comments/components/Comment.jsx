import Image from "next/image";

import styles from "../assets/styles/Comments.module.css";
import MinusIcon from "@icons/icon-minus.svg";
import PlusIcon from "@icons/icon-plus.svg";
import ReplyIcon from "@icons/icon-reply.svg";

export default function Comment({ data }) {
	return (
		<article className={styles.comment_wrapper}>
			<div className={styles.comment_details_container}>
				<div className={styles.avatar}>
					<Image
						src={data.user.image.webp}
						fill
						alt={`Avatar of ${data.user.name}`}
					/>
					<div className={styles.avatar_border}></div>
				</div>
				<h2 className={styles.username}>{data.user.username}</h2>
				<p>{data.createdAt}</p>
			</div>
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
