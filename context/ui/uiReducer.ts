import { UiState } from "./";

type UiActionType =
	| { type: "[UI] - ToggleSideMenu" }
	| { type: "[UI] - SLIDE OUT" }
	| { type: "[UI] - SLIDE IN" };

export const uiReducer = (state: UiState, action: UiActionType) => {
	switch (action.type) {
		case "[UI] - SLIDE OUT":
			return {
				...state,
				isSlideOut: true,
				isSlideIn: false,
			};

		case "[UI] - SLIDE IN":
			return {
				...state,
				isSlideIn: true,
				isSlideOut: false,
			};

		case "[UI] - ToggleSideMenu":
			return {
				...state,
				isSideMenuOpen: !state.isSideMenuOpen,
			};

		default:
			return state;
	}
};
