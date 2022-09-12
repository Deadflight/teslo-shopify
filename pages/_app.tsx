import "../styles/globals.css";
import { UiProvider, CartProvider, AuthProvider } from "../context";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { AppProps } from "next/app";

interface PageProps {
	fallbackData: any;
}

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
	return (
		<SessionProvider>
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
