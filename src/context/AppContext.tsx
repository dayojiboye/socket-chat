import React from "react";
import { AppContextValue } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const _storeUserPreferredTheme = async (value: string) => {
	try {
		await AsyncStorage.setItem("theme", value);
	} catch (err) {
		__DEV__ && console.log("Something went wrong saving user's theme", err);
	}
};

type AppContextAction =
	| { type: "toggle_theme_mode"; payload: string }
	| { type: "init_app"; payload: boolean };

const initialState: {
	themeMode: string;
	isInitializing: boolean;
} = {
	themeMode: "light",
	isInitializing: true,
};

export const AppContext = React.createContext({} as AppContextValue);

const reducer = (state: typeof initialState, action: AppContextAction) => {
	switch (action.type) {
		case "toggle_theme_mode":
			return {
				...state,
				themeMode: action.payload,
			};

		case "init_app":
			return {
				...state,
				isInitializing: action.payload,
			};

		default:
			throw new Error("Unsupported action type for app context");
	}
};

export default function AppProvider(props: React.PropsWithChildren<{}>) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const value: AppContextValue = React.useMemo(() => {
		const toggleThemeMode = (value: string) => {
			dispatch({ type: "toggle_theme_mode", payload: value });
			_storeUserPreferredTheme(value);
		};

		const setInitApp = (value: boolean) => {
			dispatch({ type: "init_app", payload: value });
		};

		return {
			themeMode: state.themeMode,
			isInitializing: state.isInitializing,
			toggleThemeMode,
			setInitApp,
		};
	}, [state.themeMode, state.isInitializing]);

	return <AppContext.Provider value={value} {...props} />;
}
