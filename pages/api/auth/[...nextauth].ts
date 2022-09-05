import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Shopify Login",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "email@example.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				console.log({ credentials });
				// return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

				//return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );
			},
		}),
		// ...add more providers here
	],
});
