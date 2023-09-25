import { StyleSheet, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { ThemeType } from "../types";
import useStyles from "../hooks/useStyles";
import useStore from "../hooks/useStore";
import CustomStatusBar from "../components/CustomStatusBar";

export default function Home() {
	const { styles } = useStyles(createStyles);
	const { toggleThemeMode, themeMode } = useStore();

	return (
		<>
			<CustomStatusBar />
			<View style={styles.container}>
				<CustomButton
					label={`Switch to ${themeMode === "dark" ? "light" : "dark"} theme`}
					onPress={() => toggleThemeMode(themeMode === "dark" ? "light" : "dark")}
				/>
			</View>
		</>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: 20,
			backgroundColor: theme.background,
		},
	});
