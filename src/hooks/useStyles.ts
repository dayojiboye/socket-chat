import { StyleSheet } from "react-native";
import { ThemeType } from "../types";
import useStore from "./useStore";
import themeConfig from "../config/theme";
import React from "react";

interface Styles<T extends StyleSheet.NamedStyles<T>> {
	styles: T;
	theme: ThemeType;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
	createStyle: (theme: ThemeType) => T
): Styles<T> {
	const { themeMode } = useStore();
	const theme = themeConfig(themeMode);

	return {
		theme,
		styles: React.useMemo(() => createStyle(theme), [themeMode, createStyle]),
	};
}
