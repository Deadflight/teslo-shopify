import { tesloApi } from "../../api";
import axios from "axios";
import { IUser } from "../../interfaces";
import Cookies from "js-cookie";
import { CustomerCreateMutation } from "../../lib";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useReducer, ReactNode, useEffect } from "react";
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
	const { data, status } = useSession();
	const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
	const router = useRouter();

	useEffect(() => {
		if (status === "authenticated") {
			dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
		} else if (status === "unauthenticated") {
			dispatch({ type: "[Auth] - Logout" });
		}
	}, [status, data]);

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

			const user = {
				id: data.customerCreate?.customer?.id!,
				firstName,
				lastName,
				email,
			};
			dispatch({ type: "[Auth] - Login", payload: user });
			return {
				hasError: false,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage = error?.response?.data as { message: string };

				return {
					hasError: true,
					message: errorMessage.message as string,
				};
			}

			return {
				hasError: true,
				message: "Register failed, try again",
			};
		}
	};

	// const loginUser = async (email: string, password: string) => {
	// 	// const { data } = await tesloApi.post("/user/login", {
	// 	// 	email,
	// 	// 	password,
	// 	// });
	// 	// return true;
	// };

	const logout = () => {
		Cookies.remove("cart");
		Cookies.remove("firstName");
		Cookies.remove("lastName");
		Cookies.remove("address");
		Cookies.remove("address2");
		Cookies.remove("zip");
		Cookies.remove("city");
		Cookies.remove("country");
		Cookies.remove("phone");

		signOut();
		dispatch({ type: "[Auth] - Logout" });
		// Cookies.remove('token');
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				registerUser,
				logout,
				// loginUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
