import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sdkSWR } from "../../../lib";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		Credentials({
			name: "Custom Login",
			credentials: {
				email: {
					label: "Email:",
					type: "email",
					placeholder: "example@email.com",
				},
				password: {
					label: "Password:",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				const { customerAccessTokenCreate } =
					await sdkSWR.customerAccessTokenCreate({
						input: {
							email: credentials?.email!,
							password: credentials?.password!,
						},
					});

				if (!customerAccessTokenCreate?.customerAccessToken) return null;

				// const { customer } = await sdkSWR.searchCustomer({
				// 	customerAccessToken:
				// 		customerAccessTokenCreate?.customerAccessToken?.accessToken!,
				// });

				const user = {
					acessToken:
						customerAccessTokenCreate?.customerAccessToken?.accessToken!,
				};

				return user;
			},
		}),
	],

	// Custom Pages
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/register",
	},

	session: {
		maxAge: 2592000, /// 30d
		strategy: "jwt",
		updateAge: 86400, // cada día
	},

	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = user?.accessToken;

				switch (account?.type) {
					case "credentials":
						token.user = user;
						token.name = user?.name;
						token.email = user?.email;
				}
			}

			return token;
		},

		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;
			return session;
		},
	},
};

export default NextAuth(authOptions);
