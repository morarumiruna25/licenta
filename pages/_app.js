import "../styles/globals.css";
import Navbar from "/components/Navbar";
import { DataProvider } from "../store/GlobalState";

function MyApp({ Component, pageProps }) {
	return (
		<DataProvider>
			<Navbar>
				<Component {...pageProps} />
			</Navbar>
		</DataProvider>
	);
}

export default MyApp;
