import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider } from "../context";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UiProvider>
			<Component {...pageProps} />
		</UiProvider>
	);
}

export default MyApp;
