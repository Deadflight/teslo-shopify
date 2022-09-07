import { IUser } from "interfaces";
import { AuthState } from "./";

// Con esto es como en typescript creamos algo como los actions creators
type AuthActionType =
	| { type: "[Auth] - Login"; payload: IUser }
	| { type: "[Auth] - Logout" };

export const authReducer = (
	state: AuthState,
	action: AuthActionType
): AuthState => {
	switch (action.type) {
		case "[Auth] - Login":
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
			};
		case "[Auth] - Logout":
			return {
				...state,
				isLoggedIn: false,
				user: undefined,
			};
		default:
			return state;
	}
};
