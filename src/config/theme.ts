import { ThemeType } from "../types";

const commonValues = {
	white: "#fff",
	faded: "#ccc",
	black: "#000",
	border: "#2c2b2b",
	blue: "#145DA0",
	ghost: "#D8E1E7",
	// add more
};

export const lightTheme = {
	...commonValues,
	background: "#fff",
	text: "#000",
};

export const darkTheme = {
	...commonValues,
	background: "#000",
	text: "#fff",
};

const themeConfig = (value: string): ThemeType => {
	if (value === "dark") {
		return darkTheme;
	} else {
		return lightTheme;
	}
};

export default themeConfig;
