import commentsData from "@data/data.json";

import styles from "./assets/styles/Comments.module.css";
import Comment from "./components/Comment";

export default function Comments() {
	return (
		<section className={styles.comments_container}>
			{commentsData.comments.map((content) => {
				return <Comment data={content} key={content.id} />;
			})}
		</section>
	);
}
