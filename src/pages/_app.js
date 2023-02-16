import Head from "next/head";
import { Rubik } from "@next/font/google";

import "@styles/global.css";

const rubik = Rubik({
	weight: ["400", "500", "700"],
	style: ["normal"],
	subsets: ["latin"],
	variable: "--ff-primary",
});

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
			<div className={rubik.variable}>
				<Component {...pageProps} />
			</div>
		</>
	);
}
