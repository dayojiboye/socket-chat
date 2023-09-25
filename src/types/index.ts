import { darkTheme, lightTheme } from "../config/theme";
import dummyChats from "../data";

export type RootStackParamList = {
	Chats: undefined;
};

export type AppContextValue = {
	themeMode: string;
	isInitializing: boolean;
	toggleThemeMode: (value: string) => void;
	setInitApp: (value: boolean) => void;
};

export type ThemeType = typeof lightTheme | typeof darkTheme;

export type ChatMessage = { id: string; text: string; time: string; user: string };

export type ChatItemType = {
	id: string;
	name: string;
	messages: ChatMessage[];
};

export type ChatItemsType = ChatItemType[];
