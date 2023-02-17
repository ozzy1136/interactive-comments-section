import { comment_reply_wrapper } from "../assets/styles/Comments.module.css";
import Comment from "./Comment";

export default function CommentThread({ data, level = 0 }) {
	const { replies, ...parent } = data;

	return (
		<>
			<li
				className={`${level > 0 && comment_reply_wrapper}`}
				style={{
					marginInlineStart: `calc(var(--reply-inline-spacer) * ${level})`,
				}}
			>
				<Comment data={parent} />
			</li>
			{replies !== undefined && (
				<>
					{replies.map((reply) => (
						<CommentThread
							data={reply}
							level={level + 1}
							key={reply.id}
						/>
					))}
				</>
			)}
		</>
	);
}
