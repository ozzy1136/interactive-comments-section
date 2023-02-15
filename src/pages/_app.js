import Head from "next/head";

import "@styles/reset.css";
import "@styles/global.css";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
