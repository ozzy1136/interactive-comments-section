// FOR DEMO PURPOSES ONLY
// USE GUID FOR REAL WORLD PROJECTS

import { createContext, useContext } from "react";

export const NextCommentIdContext = createContext(null);

export function useNextCommentId() {
	return useContext(NextCommentIdContext);
}
