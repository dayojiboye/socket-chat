import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ChatMessage, ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";
import useStore from "../../hooks/useStore";

type Props = {
	chat: ChatMessage;
};

export default function MessageTile({ chat }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const { username } = useStore();

	const isMe: boolean = chat.user === username;

	return (
		<View style={[styles.container, { alignItems: isMe ? "flex-end" : "flex-start" }]}>
			<Text style={styles.username}>{chat.user}</Text>
			<View
				style={[
					styles.chatBubble,
					{
						backgroundColor: isMe ? "#171717" : theme.blue,
						borderRadius: 15,
						borderBottomLeftRadius: isMe ? 15 : 0,
						borderBottomRightRadius: isMe ? 0 : 15,
					},
				]}
			>
				<Text style={styles.text}>{chat.text}</Text>
			</View>
			<Text style={styles.username}>{chat.time}</Text>
		</View>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			width: "100%",
			gap: 7,
			marginBottom: 16,
		},
		username: {
			fontSize: 14,
			color: "#868585",
			fontWeight: "500",
		},
		chatBubble: {
			paddingHorizontal: 12,
			paddingVertical: 10,
		},
		text: {
			color: theme.text,
			fontSize: 16,
		},
	});
