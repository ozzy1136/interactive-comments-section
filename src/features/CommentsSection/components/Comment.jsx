import { useState, useEffect } from "react";

import styles from "../assets/styles/Comments.module.css";
import ReplyIcon from "../assets/icons/icon-reply.svg";
import EditIcon from "../assets/icons/icon-edit.svg";
import DeleteIcon from "../assets/icons/icon-delete.svg";
import Avatar from "./Avatar";
import CommentScore from "./CommentScore";
import AddNewResponse from "./AddNewResponse";
import { useCurrentUser } from "@context/CurrentUserContext";
import { useUpdateComments } from "../context/UpdateComments";
import { useDeleteDialog } from "../context/DeleteDialog";
import { editResponse, updateScore } from "../utils";

export default function Comment({
	data,
	parentIndexes,
	index,
	setCommentToDelete,
}) {
	const currentUser = useCurrentUser();
	const updateComments = useUpdateComments();
	const deleteDialog = useDeleteDialog();
	const [isReplying, setIsReplying] = useState(false);
	const [isEditingComment, setIsEditingComment] = useState(false);
	const [commentContent, setCommentContent] = useState(data.content);

	const isCurrentUser = currentUser.username === data.user.username;

	useEffect(() => {
		if (deleteDialog) {
			deleteDialog.on("show", addBodyNoScroll);
			deleteDialog.on("hide", removeBodyNoScroll);
		}

		return () => {
			if (deleteDialog) {
				deleteDialog.off("show", addBodyNoScroll);
				deleteDialog.off("hide", removeBodyNoScroll);
			}
		};
	}, [deleteDialog]);

	function addBodyNoScroll() {
		document.body.classList.toggle("no-scroll", true);
	}

	function removeBodyNoScroll() {
		document.body.classList.toggle("no-scroll", false);
	}

	function handleUpdateScore(parentIndexes, idToUpdate) {
		return function (newScore) {
			updateComments((draft) => {
				updateScore(draft, parentIndexes, idToUpdate, newScore);
			});
		};
	}

	function handleEditButtonClick() {
		setIsEditingComment(true);
	}

	function handleEditResponse(e) {
		e.preventDefault();

		updateComments((draft) => {
			editResponse(draft, parentIndexes, data.id, commentContent.trim());
		});
		setIsEditingComment(false);
	}

	return (
		<>
			<article className={styles.comment_container}>
				<header className={styles.comment_details_container}>
					<Avatar
						src={data.user.image.webp}
						username={data.user.username}
					/>
					<span className={styles.comment_details_username}>
						{data.user.username}
					</span>
					{isCurrentUser && (
						<span className={styles.comment_details_label}>
							<small>you</small>
						</span>
					)}
					{/* In real world case, precise date would be available and would be used with <time> */}
					<span className={styles.comment_details_date}>
						<small>{data.createdAt}</small>
					</span>
				</header>
				<div className={styles.comment_content_container}>
					{isEditingComment ? (
						<form
							className={styles.comment_content_form}
							onSubmit={handleEditResponse}
						>
							<textarea
								className={`${styles.comment_content_form_textarea} ${styles.form_textarea}`}
								value={commentContent}
								onChange={(e) =>
									setCommentContent(e.target.value)
								}
								name="user-reply"
								id="edited-user-reply"
								required
							></textarea>
							<button
								className={`${styles.comment_content_form_button} ${styles.button_action}`}
								type="submit"
							>
								Update
							</button>
						</form>
					) : (
						<p>
							{Object.hasOwn(data, "replyingTo") && (
								<span
									className={styles.comment_content_commenter}
								>
									@{data.replyingTo}&nbsp;
								</span>
							)}
							{data.content}
						</p>
					)}
				</div>
				<CommentScore
					initScore={data.score}
					handleUpdateScore={handleUpdateScore(
						parentIndexes,
						data.id
					)}
				/>
				{isCurrentUser ? (
					<div className={styles.comment_useraction_container}>
						<button
							type="button"
							className={`${styles.comment_delete_button} ${styles.comment_action_button}`}
							onClick={() => {
								setCommentToDelete((state) => ({
									...state,
									parentIndexes: parentIndexes,
									id: data.id,
								}));
								deleteDialog.show();
							}}
							disabled={isEditingComment}
						>
							<DeleteIcon className={styles.icon} />
							<span>Delete</span>
						</button>
						<button
							type="button"
							className={`${styles.comment_edit_button} ${styles.comment_action_button}`}
							onClick={handleEditButtonClick}
							disabled={isEditingComment}
						>
							<EditIcon className={styles.icon} />
							<span>Edit</span>
						</button>
					</div>
				) : (
					<div className={styles.comment_reply_button_wrapper}>
						<button
							type="button"
							className={`${styles.comment_reply_button} ${styles.comment_action_button}`}
							onClick={() => setIsReplying(!isReplying)}
						>
							<ReplyIcon className={styles.icon} />
							<span>Reply</span>
						</button>
					</div>
				)}
			</article>
			{isReplying && (
				<AddNewResponse
					indexes={[...parentIndexes, index]}
					replyingTo={data.user.username}
					setIsReplying={setIsReplying}
				/>
			)}
		</>
	);
}
