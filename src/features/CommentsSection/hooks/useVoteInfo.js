import { useReducer } from "react";

function voteInfoReducer(state, action) {
	switch (action.type) {
		case "upvote_clicked": {
			return {
				...state,
				score:
					state.downvotePressed === "true"
						? state.score + 2
						: state.upvotePressed === "true"
						? state.score - 1
						: state.score + 1,
				upvotePressed:
					state.upvotePressed === "true" ? "false" : "true",
				downvotePressed:
					state.downvotePressed === "true"
						? "false"
						: state.downvotePressed,
			};
		}
		case "downvote_clicked": {
			return {
				...state,
				score:
					state.upvotePressed === "true" && state.score > 2
						? state.score - 2
						: state.downvotePressed === "true"
						? state.score + 1
						: state.score - 1,
				downvotePressed:
					state.downvotePressed === "true" ||
					(state.upvotePressed === "true" && state.score < 3)
						? "false"
						: "true",
				upvotePressed:
					state.upvotePressed === "true"
						? "false"
						: state.upvotePressed,
			};
		}
		default: {
			throw new Error("Unknown action: " + action.type);
		}
	}
}

export default function useVoteInfo(initVal) {
	const [state, dispatch] = useReducer(voteInfoReducer, initVal);

	return [state, dispatch];
}
