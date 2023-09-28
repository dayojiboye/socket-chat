import {
	StyleSheet,
	TextInput,
	TextInputProps,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import React from "react";
import { StyleProp } from "react-native";
import { ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

type Props = {
	onChangeText: (text: string) => void;
	placeholder?: string;
	isChat?: boolean;
	outerContainerStyle?: StyleProp<ViewStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	inputStyle?: StyleProp<TextStyle>;
	leftIcon?: any;
	rightIcon?: any;
	leftIconProps?: any;
	rightIconProps?: any;
	error?: boolean | string;
	onSend?: () => void;
	isBottomSheet?: boolean;
} & TextInputProps;

export default function CustomTextInput({
	onChangeText,
	placeholder,
	isChat = false,
	outerContainerStyle,
	containerStyle,
	inputStyle,
	leftIcon,
	rightIcon,
	leftIconProps,
	rightIconProps,
	onSend,
	isBottomSheet,
	...props
}: Props) {
	const { styles, theme } = useStyles(createStyles);
	const refInput = React.useRef(null);

	const LeftIcon = leftIcon;
	const RightIcon = rightIcon;

	const InputComponent = isBottomSheet ? BottomSheetTextInput : TextInput;

	return (
		<View style={[styles.outerContainer, outerContainerStyle]}>
			<View
				style={[
					styles.container,
					{
						paddingLeft: 16,
						paddingRight: isChat ? 0 : 16,
					},
					containerStyle,
				]}
			>
				{leftIcon && <LeftIcon {...leftIconProps} />}
				<InputComponent
					ref={refInput}
					placeholder={placeholder}
					placeholderTextColor={theme.faded}
					spellCheck={false}
					cursorColor={theme.faded}
					selectionColor={theme.faded}
					style={[styles.textInput, inputStyle]}
					onChangeText={onChangeText}
					{...props}
				/>
				{isChat && (
					<TouchableOpacity
						style={styles.sendButton}
						onPress={() => {
							onSend?.();
						}}
					>
						<PaperAirplaneIcon size={20} color={theme.blue} />
					</TouchableOpacity>
				)}
				{rightIcon && <RightIcon {...rightIconProps} />}
			</View>
		</View>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		outerContainer: {
			width: "100%",
		},
		container: {
			backgroundColor: "#171717",
			flexDirection: "row",
			alignItems: "center",
			width: "100%",
			height: 60,
			gap: 16,
		},
		textInput: {
			fontSize: 16,
			color: theme.text,
			flex: 1,
			height: "100%",
			backgroundColor: "transparent",
		},
		sendButton: {
			height: "100%",
			justifyContent: "center",
			alignItems: "center",
			width: 60,
			backgroundColor: "transparent",
		},
	});
