function getRepliesArray(comments, parentIndexes) {
	return parentIndexes.reduce(
		(repliesArray, parentIndex) => repliesArray[parentIndex].replies,
		comments
	);
}

export function addResponse(comments, parentIndexes, newResponse) {
	const parent = getRepliesArray(comments, parentIndexes);
	if (parentIndexes.length === 0) {
		parent.push(newResponse);
	} else {
		parent.unshift(newResponse);
	}
}

export function deleteResponse(comments, parentIndexes, idToDelete) {
	const parent = getRepliesArray(comments, parentIndexes);
	const commentIndex = parent.findIndex(({ id }) => id === idToDelete);
	if (commentIndex !== -1) parent.splice(commentIndex, 1);
}

export function editResponse(comments, parentIndexes, idToEdit, newComment) {
	const parent = getRepliesArray(comments, parentIndexes);
	const commentIndex = parent.findIndex(({ id }) => id === idToEdit);
	if (commentIndex !== -1) parent[commentIndex].content = newComment;
}

export function updateScore(comments, parentIndexes, idToUpdate, newScore) {
	const parent = getRepliesArray(comments, parentIndexes);
	const commentIndex = parent.findIndex(({ id }) => id === idToUpdate);
	if (commentIndex !== -1) parent[commentIndex].score = newScore;
}
