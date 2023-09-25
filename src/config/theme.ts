import { ThemeType } from "../types";

const commonValues = {
	green: "#4CAF4F",
	inputBg: "#FAF0D3",
	white: "#fff",
	disabled: "#949191",
	black: "#000000",
	// add more
};

export const lightTheme = {
	...commonValues,
	background: "rgb(242, 242, 242)",
	text: "#000",
};

export const darkTheme = {
	...commonValues,
	background: "rgb(0, 0, 0)",
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
