import { darkTheme, lightTheme } from "../config/theme";
import dummyChats from "../data";

export type RootStackParamList = {
	Home: undefined;
	Chats: undefined;
	ChatScreen: { name: string; id: string };
};

export type AppContextValue = {
	themeMode: string;
	isInitializing: boolean;
	username: string;
	toggleThemeMode: (value: string) => void;
	setInitApp: (value: boolean) => void;
	setUserName: (value: string) => void;
};

export type ThemeType = typeof lightTheme | typeof darkTheme;

export type ChatMessage = { id: string; text: string; time: string; user: string };

export type ChatItemType = {
	id: string;
	name: string;
	messages: ChatMessage[];
};

export type ChatItemsType = ChatItemType[];
