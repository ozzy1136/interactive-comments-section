import { createPortal } from "react-dom";

import styles from "../assets/styles/Comments.module.css";
import useIsMounted from "@hooks/useIsMounted";
import { useDeleteDialog } from "../context/DeleteDialog";
import { useUpdateComments } from "../context/UpdateComments";
import { deleteResponse } from "../utils/index";

export default function DeleteDialog({ attr, commentToDelete }) {
	const isMounted = useIsMounted();
	const deleteDialog = useDeleteDialog();
	const updateComments = useUpdateComments();

	function handleDeleteButtonClick() {
		updateComments((draft) => {
			deleteResponse(
				draft,
				commentToDelete.parentIndexes,
				commentToDelete.id
			);
		});
		deleteDialog.hide();
	}

	return (
		isMounted &&
		createPortal(
			<div {...attr.container} className={styles.dialog_container}>
				<div {...attr.overlay} className={styles.dialog_overlay} />
				<div
					{...attr.dialog}
					className={styles.dialog_content_container}
				>
					<p {...attr.title} className={styles.dialog_title}>
						Delete comment
					</p>
					<p className={styles.dialog_content}>
						Are you sure you want to delete this comment? This will
						remove the comment and can&apos;t be undone.
					</p>
					<div className={styles.dialog_buttons_container}>
						<button
							{...attr.closeButton}
							className={`${styles.dialog_button_cancel} ${styles.dialog_button}`}
						>
							No, cancel
						</button>
						<button
							className={`${styles.dialog_button_delete} ${styles.dialog_button}`}
							type="button"
							aria-label="Confirm comment deletion"
							onClick={handleDeleteButtonClick}
						>
							Yes, delete
						</button>
					</div>
				</div>
			</div>,
			document.body
		)
	);
}
