import { SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";
import { RootStackParamList, ThemeType } from "../types";
import useStyles from "../hooks/useStyles";
import CustomStatusBar from "../components/CustomStatusBar";
import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import useStore from "../hooks/useStore";

type Props = StackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
	const { styles, theme } = useStyles(createStyles);
	const [username, setUsername] = React.useState<string>("");
	const { setUserName } = useStore();

	React.useEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
				<KeyboardAwareScrollView
					style={{ flex: 1 }}
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
				>
					<Text style={styles.text}>Set a username</Text>
					<CustomTextInput
						outerContainerStyle={{ marginTop: 48 }}
						placeholder="Username"
						onChangeText={(text) => setUsername(text)}
					/>
					<CustomButton
						disabled={!username || username.length < 3}
						label="Continue"
						style={{ marginTop: 20 }}
						onPress={() => setUserName(username)}
					/>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</>
	);
}

const createStyles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			paddingTop: 28,
			paddingBottom: 50,
			paddingHorizontal: 20,
		},
		text: {
			color: theme.text,
			fontSize: 24,
			fontWeight: "700",
		},
	});
