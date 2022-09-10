import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sdkSWR } from "../../../lib/shopify/client";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		// ...add more providers here

		Credentials({
			name: "Custom Login",
			credentials: {
				email: {
					label: "Email:",
					type: "email",
					placeholder: "email@example.com",
				},
				password: {
					label: "Password:",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				const response = await sdkSWR.customerAccessTokenCreate({
					input: {
						email: credentials?.email!,
						password: credentials?.password!,
					},
				});

				const stringJSON = JSON.stringify(response);
				const responseJSON = JSON.parse(stringJSON);
				return responseJSON;
			},
		}),
	],

	// Custom Pages
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/register",
	},

	// Callbacks
	jwt: {
		// secret: process.env.JWT_SECRET_SEED, // deprecated
	},

	session: {
		maxAge: 2592000, /// 30d
		strategy: "jwt",
		updateAge: 86400, // cada día
	},

	callbacks: {
		async jwt({ token, account, user }) {
			//console.log({ token, account, user });
			if (account) {
				const { customerAccessToken } = user?.customerAccessTokenCreate as {
					customerAccessToken: { accessToken: string };
				};

				token.accessToken = customerAccessToken.accessToken;

				switch (account.type) {
					// case "oauth":
					// 	const dataRes = await sdkSWR.searchCustomer({
					// 		customerAccessToken:
					// 			token.user.customerAccessTokenCreate.customerAccessToken
					// 				.accessToken,
					// 	});
					// 	break;

					case "credentials":
						const response = await sdkSWR.searchCustomer({
							customerAccessToken: token.accessToken as string,
						});

						const responseString = JSON.stringify(response);

						const responseJSON = JSON.parse(responseString);

						token.user = responseJSON?.customer;
						token.name = responseJSON?.customer?.firstName;
						token.email = responseJSON?.customer?.email;

						break;
				}
			}

			return token;
		},

		async session({ session, token, user }) {
			console.log("session2", { session, token, user });
			session.accessToken = token.accessToken;
			session.user = token.user as any;

			return session;
		},
	},
});
