import { FC, useReducer, ReactNode } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
	isSideMenuOpen: boolean;
	isSlideIn: boolean;
	isSlideOut: boolean;
}

interface Props {
	children: ReactNode;
}

const Ui_INITIAL_STATE: UiState = {
	isSideMenuOpen: false,
	isSlideIn: false,
	isSlideOut: false,
};

export const UiProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

	const toggleSideMenu = async () => {
		if (state.isSideMenuOpen) {
			dispatch({ type: "[UI] - SLIDE OUT" });
			setTimeout(() => {
				dispatch({ type: "[UI] - ToggleSideMenu" });
			}, 300);
			return;
		}

		dispatch({ type: "[UI] - ToggleSideMenu" });
		dispatch({ type: "[UI] - SLIDE IN" });
	};

	return (
		<UiContext.Provider
			value={{
				...state,

				//Methods
				toggleSideMenu,
			}}
		>
			{children}
		</UiContext.Provider>
	);
};
