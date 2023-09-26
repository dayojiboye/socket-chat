import { Keyboard, ScrollView, Text, View } from "react-native";
import React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppBottomSheet from ".";
import { StyleSheet } from "react-native";
import { ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";

type Props = {};

const CreateRoomBottomSheet = React.forwardRef(
	({}: Props, ref: React.Ref<BottomSheetModalMethods>) => {
		const closeBottomsheet = React.useCallback(() => {
			// @ts-ignore
			ref?.current?.close();
		}, []);

		const defaultSnapPoints = ["45%"];
		const { styles } = useStyles(createStyles);
		const [groupName, setGroupName] = React.useState<string>("");
		const [snapPoints, setSnapPoints] = React.useState(defaultSnapPoints);

		const handleCreateRoom = () => {
			closeBottomsheet();
			setGroupName("");
		};

		React.useEffect(() => {
			const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
				setSnapPoints(["70%"]);
			});

			const keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", () => {
				setSnapPoints(["70%"]);
			});

			const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
				setSnapPoints(defaultSnapPoints);
			});

			const keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", () => {
				setSnapPoints(defaultSnapPoints);
			});

			return () => {
				keyboardDidShowListener.remove();
				keyboardWillShowListener.remove();
				keyboardDidHideListener.remove();
				keyboardWillHideListener.remove();
			};
		}, []);

		return (
			<AppBottomSheet ref={ref} snapPoints={snapPoints} closeBottomsheet={closeBottomsheet}>
				<View style={styles.header}>
					<Text style={styles.headingText}>Enter group name</Text>
				</View>
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
				>
					<CustomTextInput placeholder="Group name" onChangeText={(text) => setGroupName(text)} />
					<CustomButton label="Create" disabled={groupName.length < 3} onPress={handleCreateRoom} />
				</ScrollView>
			</AppBottomSheet>
		);
	}
);

export default CreateRoomBottomSheet;

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			paddingTop: 24,
			paddingHorizontal: 20,
			gap: 16,
			paddingBottom: 30,
		},
		header: {
			justifyContent: "center",
			paddingHorizontal: 20,
			paddingTop: 10,
		},
		headingText: {
			fontWeight: "700",
			fontSize: 20,
			color: theme.text,
			lineHeight: 32,
			textAlign: "center",
		},
	});
