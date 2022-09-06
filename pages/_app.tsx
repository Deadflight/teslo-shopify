import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider, CartProvider, AuthProvider } from "../context";
import { SWRConfig } from "swr";
import {} from "context/auth";

function MyApp({ Component, pageProps }: AppProps) {
	return (
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
	);
}

export default MyApp;
