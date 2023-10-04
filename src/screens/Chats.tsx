import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ChatItemsType, RootStackParamList, ThemeType, TypingResponse } from "../types";
import useStyles from "../hooks/useStyles";
import CustomStatusBar from "../components/CustomStatusBar";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import ChatTile from "../components/ChatTile";
import { PlusIcon } from "react-native-heroicons/solid";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CreateGroupBottomSheet from "../components/BottomSheets/CreateGroup";
import { appState } from "../enums";
import axios from "axios";
import { getErrorMessage } from "../utils/helpers";
import socket from "../utils/socket";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = StackScreenProps<RootStackParamList>;

export default function Chats({ navigation }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const createGroupBottomSheetRef = React.useRef<BottomSheetModal>(null);
	const [groups, setGroups] = React.useState<ChatItemsType>([]);
	const [currentState, setCurrentState] = React.useState<appState>(appState.IDLE);
	const [typingStatus, setTypingStatus] = React.useState<TypingResponse>();
	const inset = useSafeAreaInsets();

	const _fetchGroups = async () => {
		setCurrentState(appState.LOADING);
		try {
			const response = await axios.get("http://localhost:4000/groups");
			const { status, data } = response || {};
			if (status === 200) {
				setCurrentState(appState.SUCCESS);
				setGroups(data);
			}
		} catch (err) {
			setCurrentState(appState.ERROR);
			__DEV__ && console.log(getErrorMessage(err));
		}
	};

	React.useEffect(() => {
		_fetchGroups();
	}, []);

	React.useEffect(() => {
		navigation.setOptions({
			title: "Chats",
			headerTitleAlign: "left",
			headerTitleStyle: styles.headerTitle,
			headerLeftContainerStyle: { paddingLeft: 0 },
			headerStyle: { backgroundColor: theme.background },
		});
	}, [navigation]);

	React.useEffect(() => {
		socket.on("groupsList", (groups) => {
			setGroups(groups);
		});
		socket.on("typing", (data) => {
			setTypingStatus(data);
		});
	}, [socket]);

	return (
		<>
			<CustomStatusBar />
			<ScrollView
				style={{ flex: 1, backgroundColor: theme.background }}
				contentContainerStyle={styles.container}
				scrollEnabled={groups.length > 0}
			>
				{currentState === appState.LOADING ? (
					<ActivityIndicator animating size="large" />
				) : groups.length > 0 ? (
					groups.map((chat) => (
						<ChatTile
							key={chat.id}
							item={chat}
							typingStatus={typingStatus}
							onPress={() =>
								navigation.navigate("ChatScreen", {
									name: chat.name,
									id: chat.id,
								})
							}
						/>
					))
				) : (
					<View style={styles.emptyView}>
						<Text style={styles.emptyText}>
							No group created, you can create one by tapping on the "+" button
						</Text>
					</View>
				)}
			</ScrollView>
			<TouchableOpacity
				activeOpacity={0.6}
				style={[styles.floatingButton, { bottom: inset.bottom }]}
				onPress={() => createGroupBottomSheetRef.current?.present()}
			>
				<PlusIcon color={theme.blue} size={36} />
			</TouchableOpacity>
			<CreateGroupBottomSheet ref={createGroupBottomSheetRef} />
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
			fontSize: 16,
			textAlign: "center",
			lineHeight: 24,
		},
		floatingButton: {
			position: "absolute",
			right: 20,
			width: 60,
			height: 60,
			borderRadius: 30,
			backgroundColor: "#181818",
			justifyContent: "center",
			alignItems: "center",
		},
	});
