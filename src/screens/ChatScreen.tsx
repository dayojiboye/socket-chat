import {
	Animated,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
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

type Props = StackScreenProps<RootStackParamList, "ChatScreen">;

export default function ChatScreen({ navigation, route }: Props) {
	const { name, id } = route.params;
	const { styles, theme } = useStyles(createStyles);
	const [message, setMessage] = React.useState<string>("");
	const { username } = useStore();
	const inset = useSafeAreaInsets();

	const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
		{
			id: "1",
			text: "Hello guys, welcome!",
			time: "07:50",
			user: "John",
		},
		{
			id: "2",
			text: "Hi John, thank you! 😇",
			time: "08:50",
			user: "Dee",
		},
	]);

	const handleNewMessage = () => {
		if (!message.trim()) return;
		const hour =
			new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;

		const mins =
			new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;

		console.log({
			message,
			user: username,
			timestamp: { hour, mins },
		});
	};

	React.useEffect(() => {
		navigation.setOptions({
			title: name,
			headerTitleStyle: styles.headerTitle,
			headerStyle: { backgroundColor: theme.background },
			headerLeft: (props) => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Icon name="arrow-back-ios" size={20} color={theme.text} />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<>
			<CustomStatusBar />
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: theme.background }}
				behavior="padding"
				keyboardVerticalOffset={80}
			>
				<FlatList
					data={chatMessages}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <MessageTile chat={item} />}
					style={{ flex: 1, backgroundColor: theme.background }}
					contentContainerStyle={styles.container}
					scrollEnabled={chatMessages.length > 0}
				/>

				<View style={[styles.footer, { paddingBottom: inset.bottom }]}>
					<CustomTextInput
						isChat={message.length > 0}
						placeholder="Start typing..."
						value={message}
						onChangeText={(text) => setMessage(text)}
						onSend={handleNewMessage}
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
