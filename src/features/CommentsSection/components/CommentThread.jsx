import {
	comment_thread_wrapper,
	comment_wrapper,
} from "../assets/styles/Comments.module.css";
import Comment from "./Comment";

export default function CommentThread({ data, commenter }) {
	const { replies, ...parent } = data;

	return (
		<div className={comment_thread_wrapper}>
			<li className={comment_wrapper}>
				<Comment data={parent} commenter={commenter} />
			</li>
			{replies !== undefined && (
				<>
					{replies.map((reply) => (
						<CommentThread
							data={reply}
							commenter={data.user.username}
							key={reply.id}
						/>
					))}
				</>
			)}
		</div>
	);
}
