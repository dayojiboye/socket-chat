import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { ChatItemType, ChatMessage, ThemeType, TypingResponse } from "../../types";
import useStyles from "../../hooks/useStyles";
import { UserCircleIcon } from "react-native-heroicons/outline";
import TimeAgo from "javascript-time-ago";
import useStore from "../../hooks/useStore";

type Props = {
	item: ChatItemType;
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
	typingStatus: TypingResponse;
};

export default function ChatTile({ item, style, onPress, typingStatus }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const [messages, setMessages] = React.useState<ChatMessage>();
	const { username } = useStore();

	const timeAgo = new TimeAgo("en");
	const noMessage = !messages?.text;
	const isSomeoneTypingInGroup = typingStatus?.group_id === item.id && !!typingStatus.typingText;

	React.useLayoutEffect(() => {
		setMessages(item.messages[item.messages.length - 1]);
	}, [item]);

	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<View style={{ paddingVertical: 20 }}>
				<UserCircleIcon color={theme.blue} size={36} />
			</View>
			<View style={styles.contentContainer}>
				<View style={{ gap: 4, flex: 1 }}>
					<Text style={styles.groupName}>{item.name}</Text>
					<Text
						numberOfLines={2}
						style={[
							styles.message,
							{
								color: isSomeoneTypingInGroup || noMessage ? theme.faded : theme.text,
								fontStyle: isSomeoneTypingInGroup || noMessage ? "italic" : "normal",
							},
						]}
					>
						{isSomeoneTypingInGroup
							? typingStatus.typingText
							: messages?.user && messages.text
							? `${messages.user === username ? "You" : messages.user}: ${messages.text}`
							: noMessage
							? "No message, start a conversation"
							: null}
					</Text>
				</View>
				{messages?.time ? (
					<Text style={styles.timestamp}>{timeAgo.format(new Date(messages.time))}</Text>
				) : null}
			</View>
		</TouchableOpacity>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flexDirection: "row",
			width: "100%",
			alignItems: "flex-start",
			gap: 16,
		},
		contentContainer: {
			paddingVertical: 20,
			borderBottomWidth: 1,
			borderBottomColor: theme.border,
			flex: 1,
			flexDirection: "row",
			justifyContent: "space-between",
			gap: 8,
		},
		groupName: {
			color: theme.text,
			fontSize: 16,
			fontWeight: "600",
			width: 200,
		},
		message: {
			fontSize: 12,
		},
		timestamp: {
			minWidth: 80,
			textAlign: "right",
			fontSize: 12,
			color: theme.text,
		},
	});
