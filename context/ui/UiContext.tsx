import { createContext } from "react";

interface ContextProps {
	isSideMenuOpen: boolean;
	isSlideIn: boolean;
	isSlideOut: boolean;

	// Methods
	toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
