import {
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	TextStyle,
	TouchableOpacityProps,
	ActivityIndicator,
	GestureResponderEvent,
	StyleSheet,
} from "react-native";
import React from "react";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";

type Props = {
	disabled?: boolean;
	label: string;
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
	activeOpacity?: number;
	onPress?: (event: GestureResponderEvent) => void;
	onLongPress?: (event: GestureResponderEvent) => void;
	leftIcon?: any;
	rightIcon?: any;
	leftIconProps?: any;
	rightIconProps?: any;
	isLoading?: boolean;
} & TouchableOpacityProps;

export default function CustomButton({
	disabled,
	label = "Button",
	containerStyle,
	style,
	labelStyle,
	activeOpacity = 0.8,
	onPress,
	leftIcon,
	rightIcon,
	leftIconProps,
	rightIconProps,
	isLoading,
	onLongPress,
	...props
}: Props) {
	const { theme, styles } = useStyles(createStyles);
	const LeftIcon = leftIcon;
	const RightIcon = rightIcon;
	const pressed = useSharedValue(false);

	const tap = Gesture.Tap()
		.onBegin(() => {
			if (disabled || isLoading) return;
			pressed.value = true;
		})
		.onFinalize(() => {
			pressed.value = false;
		});

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ scale: withTiming(pressed.value ? 0.97 : 1) }],
	}));

	return (
		<GestureDetector gesture={tap}>
			<Animated.View style={[{ width: "100%" }, animatedStyles, containerStyle]}>
				<TouchableOpacity
					activeOpacity={activeOpacity}
					disabled={disabled || isLoading}
					style={[
						styles.buttonStyle,
						{ backgroundColor: disabled || isLoading ? theme.disabled : theme.green },
						style,
					]}
					onPress={onPress}
					onLongPress={onLongPress}
					{...props}
				>
					{isLoading ? (
						<ActivityIndicator size="small" color={theme.white} />
					) : (
						<>
							{leftIcon && <LeftIcon {...leftIconProps} />}
							<Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
							{rightIcon && <RightIcon {...rightIconProps} />}
						</>
					)}
				</TouchableOpacity>
			</Animated.View>
		</GestureDetector>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		containerStyle: {
			width: "100%",
		},
		buttonStyle: {
			width: "100%",
			height: 50,
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "row",
			gap: 3,
		},
		labelStyle: {
			fontSize: 16,
			fontWeight: "500",
			color: theme.white,
		},
	});
