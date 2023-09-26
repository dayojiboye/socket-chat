import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { ChatItemType, ChatMessage, ThemeType } from "../../types";
import useStyles from "../../hooks/useStyles";
import { UserCircleIcon } from "react-native-heroicons/outline";
import { formatDistance } from "date-fns";

type Props = {
	item: ChatItemType;
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
};

export default function ChatTile({ item, style, onPress }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const [messages, setMessages] = React.useState<ChatMessage>();

	React.useLayoutEffect(() => {
		setMessages(item.messages[item.messages.length - 1]);
	}, []);

	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<View style={{ paddingVertical: 20 }}>
				<UserCircleIcon color={theme.blue} size={36} />
			</View>
			<View style={styles.contentContainer}>
				<View style={{ gap: 4, flex: 1 }}>
					<Text style={styles.recipient}>{item.name}</Text>
					<Text numberOfLines={2} style={styles.message}>
						{messages?.user ? messages.user + ":" : null} {messages?.text}
					</Text>
				</View>
				<Text style={styles.timestamp}>
					{/* {formatDistance(timestamp, new Date(), {
						addSuffix: true,
					})} */}
					{messages?.time}
				</Text>
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
			color: theme.text,
			fontSize: 12,
		},
		timestamp: {
			minWidth: 80,
			textAlign: "right",
			fontSize: 12,
			color: theme.text,
		},
	});
