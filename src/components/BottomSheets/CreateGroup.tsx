import { ScrollView, Text, View } from "react-native";
import React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AppBottomSheet from ".";
import { StyleSheet } from "react-native";
import { ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";
import CustomButton from "../CustomButton";
import socket from "../../utils/socket";
import CustomTextInput from "../CustomTextInput";

type Props = {};

const CreateGroupBottomSheet = React.forwardRef(
	({}: Props, ref: React.Ref<BottomSheetModalMethods>) => {
		const closeBottomsheet = React.useCallback(() => {
			// @ts-ignore
			ref?.current?.close();
			setGroupName("");
		}, []);

		const { styles } = useStyles(createStyles);
		const [groupName, setGroupName] = React.useState<string>("");

		const handleCreateRoom = () => {
			socket.emit("createGroup", groupName);
			closeBottomsheet();
		};

		return (
			<AppBottomSheet ref={ref} snapPoints={["36%"]} closeBottomsheet={closeBottomsheet}>
				<View style={styles.header}>
					<Text style={styles.headingText}>Enter group name</Text>
				</View>
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
				>
					<CustomTextInput
						autoFocus
						placeholder="Group name"
						onChangeText={(text) => setGroupName(text)}
						isBottomSheet
					/>
					<CustomButton label="Create" disabled={groupName.length < 3} onPress={handleCreateRoom} />
				</ScrollView>
			</AppBottomSheet>
		);
	}
);

export default CreateGroupBottomSheet;

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
