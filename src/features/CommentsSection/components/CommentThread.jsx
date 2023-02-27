import {
	comment_thread_wrapper,
	comment_wrapper,
} from "../assets/styles/Comments.module.css";
import Comment from "./Comment";

export default function CommentThread({ data }) {
	const { replies, ...parent } = data;

	return (
		<div className={comment_thread_wrapper}>
			<li className={comment_wrapper}>
				<Comment data={parent} />
			</li>
			{replies !== undefined &&
				replies.map((reply) => (
					<CommentThread data={reply} key={reply.id} />
				))}
		</div>
	);
}
