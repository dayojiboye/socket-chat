import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RootStackParamList, ThemeType } from "../types";
import useStyles from "../hooks/useStyles";
import CustomStatusBar from "../components/CustomStatusBar";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import ChatTile from "../components/ChatTile";
import dummyChats from "../data";
import { PlusIcon } from "react-native-heroicons/solid";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CreateRoomBottomSheet from "../components/BottomSheets/CreateRoom";

type Props = StackScreenProps<RootStackParamList>;

export default function Chats({ navigation }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const createRoomBottomSheetRef = React.useRef<BottomSheetModal>(null);

	React.useEffect(() => {
		navigation.setOptions({
			title: "Chats",
			headerTitleAlign: "left",
			headerTitleStyle: styles.headerTitle,
			headerLeftContainerStyle: { paddingLeft: 0 },
			headerStyle: { backgroundColor: theme.background },
		});
	}, [navigation]);

	return (
		<>
			<CustomStatusBar />
			<View style={{ flex: 1 }}>
				<ScrollView
					style={{ flex: 1, backgroundColor: theme.background }}
					contentContainerStyle={styles.container}
					scrollEnabled={dummyChats.length > 0}
				>
					{dummyChats.length > 0 ? (
						dummyChats.map((chat) => (
							<ChatTile
								key={chat.id}
								item={chat}
								onPress={() => navigation.navigate("ChatScreen", { name: chat.name, id: chat.id })}
							/>
						))
					) : (
						<View style={styles.emptyView}>
							<Text style={styles.emptyText}>No chat</Text>
						</View>
					)}
				</ScrollView>
				<TouchableOpacity
					activeOpacity={0.6}
					style={styles.floatingButton}
					onPress={() => createRoomBottomSheetRef.current?.present()}
				>
					<PlusIcon color={theme.blue} size={36} />
				</TouchableOpacity>
			</View>
			<CreateRoomBottomSheet ref={createRoomBottomSheetRef} />
		</>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			paddingTop: 20,
			paddingBottom: 50,
			paddingHorizontal: 20,
		},
		headerTitle: {
			color: theme.text,
			fontSize: 24,
			fontWeight: "700",
		},
		emptyView: {
			height: 400,
			justifyContent: "center",
			alignItems: "center",
		},
		emptyText: {
			fontWeight: "500",
			color: theme.faded,
			fontSize: 18,
			textAlign: "center",
		},
		floatingButton: {
			position: "absolute",
			bottom: 60,
			right: 20,
			width: 60,
			height: 60,
			borderRadius: 30,
			backgroundColor: "#181818",
			justifyContent: "center",
			alignItems: "center",
		},
	});
