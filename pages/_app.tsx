import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider, CartProvider, AuthProvider } from "../context";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SWRConfig
			value={{
				fallbackData: pageProps.fallbackData,
			}}
		>
			<SessionProvider>
				<AuthProvider>
					<CartProvider>
						<UiProvider>
							<Component {...pageProps} />
						</UiProvider>
					</CartProvider>
				</AuthProvider>
			</SessionProvider>
		</SWRConfig>
	);
}

export default MyApp;
