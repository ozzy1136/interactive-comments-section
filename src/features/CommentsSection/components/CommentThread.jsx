import Comment from "./Comment";

export default function CommentThread({ data, level = 0, commenter }) {
	const { replies, ...parent } = data;

	return (
		<>
			<style jsx>{`
				.comment_thread_wrapper {
					position: relative;
				}

				.comment_thread_wrapper::before {
					content: "";
					display: block;
					background-color: var(--c-light-gray);
					position: absolute;
					height: calc(100% + 1em);
					width: 2px;
					left: calc(${level - 1} * 1.25em);
				}

				.comment_thread_wrapper:last-child::before {
					height: 100%;
				}

				.comment_wrapper {
					position: relative;
					margin-inline-start: calc(
						var(--reply-inline-spacer) * ${level}
					);
				}
			`}</style>
			<div className={level > 0 && "comment_thread_wrapper"}>
				<li className={level > 0 && "comment_wrapper"}>
					<Comment data={parent} commenter={commenter} />
				</li>
				{replies !== undefined && (
					<>
						{replies.map((reply) => (
							<CommentThread
								data={reply}
								level={level + 1}
								commenter={data.user.username}
								key={reply.id}
							/>
						))}
					</>
				)}
			</div>
		</>
	);
}
