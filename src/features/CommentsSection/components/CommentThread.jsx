import Comment from "./Comment";

export default function CommentThread({ data, commenter }) {
	const { replies, ...parent } = data;

	return (
		<>
			<style jsx>{`
				.comment_thread_wrapper:not(:first-child) {
					position: relative;
					padding-inline-start: var(--reply-inline-spacer);
				}

				.comment_thread_wrapper:not(:first-child)::before {
					content: "";
					display: block;
					width: 2px;
					height: calc(100% + 1em);
					background-color: var(--c-light-gray);
					position: absolute;
					left: 0;
				}

				.comment_thread_wrapper:not(:first-child):last-child::before {
					height: 100%;
				}

				@media screen and (min-width: 1024px) {
					.comment_thread_wrapper:not(:first-child)::before {
						left: calc(var(--reply-inline-spacer) / 2);
					}
				}
			`}</style>
			<div className={"comment_thread_wrapper"}>
				<li className={"comment_wrapper"}>
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
		</>
	);
}
