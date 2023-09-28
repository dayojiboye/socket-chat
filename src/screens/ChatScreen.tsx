import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
} from "react-native";
import React from "react";
import { ChatMessage, RootStackParamList, ThemeType } from "../types";
import useStyles from "../hooks/useStyles";
import { StackScreenProps } from "@react-navigation/stack";
import CustomStatusBar from "../components/CustomStatusBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import MessageTile from "../components/MessageTile";
import useStore from "../hooks/useStore";
import CustomTextInput from "../components/CustomTextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useHeaderHeight } from "@react-navigation/elements";
import socket from "../utils/socket";

type Props = StackScreenProps<RootStackParamList, "ChatScreen">;

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function ChatScreen({ navigation, route }: Props) {
	const { name, id } = route.params;
	const { styles, theme } = useStyles(createStyles);
	const [message, setMessage] = React.useState<string>("");
	const { username } = useStore();
	const inset = useSafeAreaInsets();
	// const headerHeight = useHeaderHeight();
	// const [textInputHeight, setTextInputHeight] = React.useState<number>(0);
	const flatListRef = React.useRef<FlatList>(null);

	const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);

	const handleNewMessage = () => {
		if (!message.trim()) return;

		socket.emit("newMessage", {
			message,
			group_id: id,
			user: username,
			timestamp: new Date(),
		});

		setMessage("");
	};

	React.useEffect(() => {
		navigation.setOptions({
			title: name,
			headerTitleStyle: styles.headerTitle,
			headerStyle: { backgroundColor: theme.background },
			headerLeft: (props) => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Icon name="arrow-back" size={24} color={theme.text} />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	React.useEffect(() => {
		socket.emit("findGroup", id);
		socket.on("foundGroup", (groupChats) => setChatMessages(groupChats));
	}, []);

	React.useEffect(() => {
		socket.on("foundGroup", (groupChats) => setChatMessages(groupChats));
	}, [socket]);

	return (
		<>
			<CustomStatusBar />
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: theme.background }}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === "android" ? -200 : 80}
				enabled
			>
				<FlatList
					ref={flatListRef}
					data={chatMessages}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <MessageTile chat={item} />}
					style={{ backgroundColor: theme.background }}
					contentContainerStyle={styles.container}
					scrollEnabled={chatMessages.length > 0}
					onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
				/>

				<View style={[styles.footer, { paddingBottom: inset.bottom }]}>
					<CustomTextInput
						// multiline
						isChat={message.trim().length > 0}
						placeholder="Start typing..."
						value={message}
						onChangeText={(text) => setMessage(text)}
						onSend={handleNewMessage}
						// textAlignVertical="top"
						// containerStyle={{ height: Math.max(48, textInputHeight) }}
					/>
				</View>
			</KeyboardAvoidingView>
		</>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		headerTitle: {
			color: theme.text,
			fontSize: 18,
			fontWeight: "700",
		},
		container: {
			paddingTop: 20,
			paddingBottom: 50,
			paddingHorizontal: 20,
			flexGrow: 1,
		},
		footer: {
			paddingHorizontal: 20,
			paddingVertical: 16,
			backgroundColor: theme.background,
		},
	});
