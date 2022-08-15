import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider } from "../context";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: async (resource, init) => {
					return fetch(resource, init).then((res) => res.json());
				},
				fallback: pageProps.fallback,
			}}
		>
			<UiProvider>
				<Component {...pageProps} />
			</UiProvider>
		</SWRConfig>
	);
}

export default MyApp;
