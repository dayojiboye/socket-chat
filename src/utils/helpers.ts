import Toast from "react-native-root-toast";
import { toastType } from "../enums";

export const showToast = (
	message: string,
	variation?: toastType,
	position: number = 60,
	duration: number = Toast.durations.LONG
) =>
	Toast.show(message, {
		duration,
		position,
		backgroundColor: variation === toastType.ERROR ? "red" : "green",
		textColor: "#fff",
		textStyle: { fontSize: 16 },
		shadow: false,
		animation: true,
	});

// Add more helper functions
