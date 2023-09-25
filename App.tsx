import React from "react";
import AppEntry from "./AppEntry";
import AppProvider from "./src/context/AppContext";

export default function App() {
	return (
		<AppProvider>
			<AppEntry />
		</AppProvider>
	);
}
