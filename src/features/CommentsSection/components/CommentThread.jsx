import {
	comment_thread_wrapper,
	comment_wrapper,
} from "../assets/styles/Comments.module.css";
import Comment from "./Comment";

export default function CommentThread({ data, parentIndexes, commentIndex }) {
	const { replies, ...commentData } = data;

	return (
		<div className={comment_thread_wrapper}>
			<li className={comment_wrapper}>
				<Comment
					data={commentData}
					parentIndexes={parentIndexes}
					index={commentIndex}
				/>
			</li>
			{replies.map((reply, index) => (
				<CommentThread
					data={reply}
					parentIndexes={[...parentIndexes, commentIndex]}
					commentIndex={index}
					key={reply.id}
				/>
			))}
		</div>
	);
}
