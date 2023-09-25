import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RootStackParamList, ThemeType } from "../types";
import useStyles from "../hooks/useStyles";
import CustomStatusBar from "../components/CustomStatusBar";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import ChatTile from "../components/ChatTile";
import dummyChats from "../data";

type Props = StackScreenProps<RootStackParamList>;

export default function Chats({ navigation }: Props) {
	const { styles, theme } = useStyles(createStyles);

	React.useEffect(() => {
		navigation.setOptions({
			title: "Chats",
			headerTitleAlign: "left",
			headerTitleStyle: styles.headerTitle,
			headerLeftContainerStyle: { paddingLeft: 0 },
			headerRight: (props) => (
				<TouchableOpacity>
					<PencilSquareIcon size={30} color={theme.violet} />
				</TouchableOpacity>
			),
			headerStyle: { backgroundColor: theme.background },
		});
	}, [navigation]);

	return (
		<>
			<CustomStatusBar />
			<ScrollView
				style={{ flex: 1, backgroundColor: theme.background }}
				contentContainerStyle={styles.container}
				scrollEnabled={dummyChats.length > 0}
			>
				{dummyChats.length > 0 ? (
					dummyChats.map((chat) => <ChatTile key={chat.id} item={chat} onPress={() => {}} />)
				) : (
					<View style={styles.emptyView}>
						<Text style={styles.emptyText}>No chat</Text>
					</View>
				)}
			</ScrollView>
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
	});
