import { ThemeType } from "../types";

const commonValues = {
	white: "#fff",
	faded: "#ccc",
	black: "#281C2D",
	border: "rgb(240, 239, 240)",
	purpleHaze: "#BEAFC2",
	purple: "#695E93",
	violet: "#8155BA",
	// add more
};

export const lightTheme = {
	...commonValues,
	background: "#fff",
	text: "#281C2D",
};

export const darkTheme = {
	...commonValues,
	background: "#281C2D",
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
