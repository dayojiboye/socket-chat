import { darkTheme, lightTheme } from "../config/theme";

export type RootStackParamList = {
	Home: undefined;
};

export type AppContextValue = {
	themeMode: string;
	isInitializing: boolean;
	toggleThemeMode: (value: string) => void;
	setInitApp: (value: boolean) => void;
};

export type ThemeType = typeof lightTheme | typeof darkTheme;
