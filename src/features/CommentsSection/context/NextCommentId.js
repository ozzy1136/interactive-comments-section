// FOR DEMO PURPOSES ONLY
// USE GUID FOR REAL WORLD PROJECTS

import { createContext, useContext, useState } from "react";

const NextCommentIdContext = createContext();

export function useNextCommentId() {
	return useContext(NextCommentIdContext);
}

export function NextCommentIdProvider({ children }) {
	const [nextCommentId, setNextCommentId] = useState(5);

	return (
		<NextCommentIdContext.Provider
			value={{ nextCommentId, setNextCommentId }}
		>
			{children}
		</NextCommentIdContext.Provider>
	);
}
