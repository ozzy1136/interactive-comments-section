import { createContext, useContext } from "react";

const DeleteDialogContext = createContext();

export function useDeleteDialog() {
	return useContext(DeleteDialogContext);
}

export function DeleteDialogProvider({ value, children }) {
	return (
		<DeleteDialogContext.Provider value={value}>
			{children}
		</DeleteDialogContext.Provider>
	);
}
