import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
	Text,
} from "react-native";
import React from "react";
import { ChatMessage, RootStackParamList, ThemeType, TypingResponse } from "../types";
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
	const [typingStatus, setTypingStatus] = React.useState<TypingResponse>();

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

	const handleTyping = () => {
		if (message.trim())
			socket.emit("typing", { typingText: `${username} is typing...`, group_id: id });
		else socket.emit("typing", { typingText: "", group_id: id });
	};

	React.useEffect(() => {
		navigation.setOptions({
			headerStyle: { backgroundColor: theme.background },
			headerLeft: (props) => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Icon name="arrow-back" size={24} color={theme.text} />
				</TouchableOpacity>
			),
			headerTitle: (props) => (
				<View style={styles.headerTitleContainer}>
					<Text numberOfLines={2} style={styles.headerTitle}>
						{name}
					</Text>
					{typingStatus?.typingText ? (
						<Text style={styles.typingText}>{typingStatus.typingText}</Text>
					) : null}
				</View>
			),
		});
	}, [navigation, typingStatus]);

	React.useEffect(() => {
		socket.emit("findGroup", id);
		socket.on("foundGroup", (groupChats) => setChatMessages(groupChats));
	}, []);

	React.useEffect(() => {
		socket.on("foundGroup", (groupChats) => setChatMessages(groupChats));
		socket.on("typing", (data) => {
			if (data.group_id === id) setTypingStatus(data);
		});
	}, [socket]);

	// Debounce
	React.useEffect(() => {
		const delayDebounceFn = setTimeout(() => handleTyping(), 500);
		return () => clearTimeout(delayDebounceFn);
	}, [message]);

	return (
		<>
			<CustomStatusBar />
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: theme.background }}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === "android" ? -220 : 80}
				enabled
			>
				<FlatList
					ref={flatListRef}
					data={chatMessages}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <MessageTile chat={item} />}
					style={{ backgroundColor: theme.background }}
					contentContainerStyle={styles.container}
					scrollEnabled={chatMessages?.length > 0}
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
		headerTitleContainer: {
			alignItems: "center",
		},
		headerTitle: {
			color: theme.text,
			fontSize: 18,
			fontWeight: "700",
			textAlign: "center",
			maxWidth: 240,
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
		typingText: {
			color: theme.text,
			fontSize: 13,
			fontStyle: "italic",
			textAlign: "center",
			marginTop: 2,
		},
	});
