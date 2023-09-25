import React from "react";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import useStore from "../../hooks/useStore";

type Props = StatusBarProps;

export default function CustomStatusBar(props: Props) {
	const { themeMode } = useStore();

	return <StatusBar style={themeMode === "dark" ? "light" : "dark"} {...props} />;
}
