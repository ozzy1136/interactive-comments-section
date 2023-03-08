import { createContext, useContext } from "react";

const UpdateCommentsContext = createContext();

export function useUpdateComments() {
	return useContext(UpdateCommentsContext);
}

export function UpdateCommentsProvider({ value, children }) {
	return (
		<UpdateCommentsContext.Provider value={value}>
			{children}
		</UpdateCommentsContext.Provider>
	);
}
