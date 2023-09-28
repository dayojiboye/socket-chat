import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { ChatItemType, ChatMessage, ThemeType, TypingResponse } from "../../types";
import useStyles from "../../hooks/useStyles";
import { UserCircleIcon } from "react-native-heroicons/outline";
import TimeAgo from "javascript-time-ago";

type Props = {
	item: ChatItemType;
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
	typingStatus: TypingResponse;
};

export default function ChatTile({ item, style, onPress, typingStatus }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const [messages, setMessages] = React.useState<ChatMessage>();

	const timeAgo = new TimeAgo("en-US");

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
					<Text style={styles.recipient}>{item.name}</Text>
					<Text
						numberOfLines={2}
						style={[
							styles.message,
							{
								color: typingStatus ? theme.faded : theme.text,
								fontStyle: typingStatus ? "italic" : "normal",
							},
						]}
					>
						{messages?.user && !typingStatus ? messages.user + ":" : null}{" "}
						{typingStatus?.group_id === item.id && typingStatus && typingStatus.typingText
							? typingStatus.typingText
							: messages?.text}
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
		recipient: {
			color: theme.text,
			fontSize: 16,
			fontWeight: "600",
		},
		message: {
			// color: theme.text,
			fontSize: 12,
		},
		timestamp: {
			minWidth: 80,
			textAlign: "right",
			fontSize: 12,
			color: theme.text,
		},
	});
