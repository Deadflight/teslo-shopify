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
				// return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

				// const { customerAccessTokenCreate } =
				// 	await sdkSWR.customerAccessTokenCreate({
				// 		input: {
				// 			email: credentials?.email!,
				// 			password: credentials?.password!,
				// 		},
				// 	});

				return await sdkSWR.customerAccessTokenCreate({
					input: {
						email: credentials?.email!,
						password: credentials?.password!,
					},
				});
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
			// console.log({ token, account, user });
			if (account) {
				const accessToken = user?.customerAccessTokenCreate as {
					customerAccessToken: { accessToken: string };
				};

				token.accessToken = accessToken;

				switch (account.type) {
					// case "oauth":
					// 	const dataRes = await sdkSWR.searchCustomer({
					// 		customerAccessToken:
					// 			token.user.customerAccessTokenCreate.customerAccessToken
					// 				.accessToken,
					// 	});
					// 	break;

					case "credentials":
						const { customer } = await sdkSWR.searchCustomer({
							customerAccessToken: token.accessToken as string,
						});

						token.user = customer;
						token.name = customer?.firstName;
						token.email = customer?.email;

						break;
				}
			}

			return token;
		},

		async session({ session, token, user }) {
			//console.log("session", { session, token, user });
			session.accessToken = token.accessToken;
			session.user = token.user as any;

			return session;
		},
	},
});
