import "../styles/globals.css";
import { UiProvider, CartProvider, AuthProvider } from "../context";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { AppProps } from "next/app";
import { Session } from "next-auth";

interface PageProps {
	fallbackData: any;
	session: Session;
}

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<PageProps>) {
	return (
		<SessionProvider session={session}>
			<SWRConfig
				value={{
					fallbackData: pageProps.fallbackData,
				}}
			>
				<AuthProvider>
					<CartProvider>
						<UiProvider>
							<Component {...pageProps} />
						</UiProvider>
					</CartProvider>
				</AuthProvider>
			</SWRConfig>
		</SessionProvider>
	);
}

export default MyApp;
