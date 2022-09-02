import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider, CartProvider } from "../context";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fallbackData: pageProps.fallbackData,
			}}
		>
			<CartProvider>
				<UiProvider>
					<Component {...pageProps} />
				</UiProvider>
			</CartProvider>
		</SWRConfig>
	);
}

export default MyApp;
