export function addNewResponse(comments, parentIndexes, newResponse) {
	parent = parentIndexes.reduce(
		(repliesArray, parentIndex) => repliesArray[parentIndex].replies,
		comments
	);
	parent.push(newResponse);
}

export function deleteResponse(comments, parentIndexes, idToDelete) {
	parent = parentIndexes.reduce(
		(repliesArray, parentIndex) => repliesArray[parentIndex].replies,
		comments
	);
	const commentIndex = parent.findIndex(({ id }) => id === idToDelete);
	if (commentIndex !== -1) parent.splice(commentIndex, 1);
}
