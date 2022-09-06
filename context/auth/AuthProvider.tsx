import { tesloApi } from "api";
import axios from "axios";
import { IUser } from "interfaces";
import { CustomerCreateMutation } from "lib";
import { FC, useReducer, ReactNode } from "react";
import { AuthContext, authReducer } from "./";

export interface Props {
	children: ReactNode;
}

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

	const registerUser = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => {
		try {
			const { data } = await tesloApi.post<CustomerCreateMutation>(
				"/user/register",
				{
					firstName,
					lastName,
					email,
					password,
				}
			);

			console.log(data);

			// // const { token, user } = data;
			// // Cookies.set('token', token );
			const user = {
				id: "",
				firstName: "",
				lastName: "",
				email: "",
			};
			dispatch({ type: "[Auth] - Login", payload: user });
			return {
				hasError: false,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					hasError: true,
					message: error?.response?.data?.message,
				};
			}

			return {
				hasError: true,
				message: "Register failed, try again",
			};
		}
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				registerUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
