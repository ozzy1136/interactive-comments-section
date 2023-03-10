import Comment from "./Comment";

export default function CommentThread({
	data,
	parentIndexes,
	commentIndex,
	setCommentToDelete,
}) {
	const { replies, ...commentData } = data;

	return (
		<>
			<style jsx>{`
				.comment_wrapper {
					position: relative;
					padding-inline-start: calc(
						var(--reply-inline-spacer) * ${parentIndexes.length}
					);
				}

				.comment_wrapper:not(:first-child)::before {
					content: "";
					display: block;
					width: 2px;
					height: calc(100%);
					background-color: var(--c-light-gray);
					position: absolute;
					left: calc(
						var(--reply-inline-spacer) *
							(${parentIndexes.length} - 1)
					);

					@media screen and (min-width: 1024px) {
						left: calc(var(--reply-inline-spacer) / 2);
					}
				}

				// .comment_wrapper:not(:first-child):last-child::before {
				// 	height: 100%;
				// }
			`}</style>
			<li className={"comment_wrapper"}>
				<Comment
					data={commentData}
					parentIndexes={parentIndexes}
					index={commentIndex}
					setCommentToDelete={setCommentToDelete}
				/>
			</li>
			{replies.map((reply, index) => (
				<CommentThread
					data={reply}
					parentIndexes={[...parentIndexes, commentIndex]}
					commentIndex={index}
					setCommentToDelete={setCommentToDelete}
					key={reply.id}
				/>
			))}
		</>
	);
}
