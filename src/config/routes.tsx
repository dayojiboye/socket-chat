import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import Chats from "../screens/Chats";
import Home from "../screens/Home";
import ChatScreen from "../screens/ChatScreen";
import useStore from "../hooks/useStore";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppRoutes() {
	const { username } = useStore();

	return (
		<Stack.Navigator
			screenOptions={{
				headerBackTitleVisible: false,
				headerTitleAlign: "center",
				headerShadowVisible: false,
				headerMode: "screen",
				headerLeftContainerStyle: { paddingLeft: 20 },
				headerRightContainerStyle: { paddingRight: 20 },
			}}
		>
			{!username ? (
				<Stack.Screen name="Home" component={Home} />
			) : (
				<>
					<Stack.Screen name="Chats" component={Chats} />
					<Stack.Screen name="ChatScreen" component={ChatScreen} />
				</>
			)}
		</Stack.Navigator>
	);
}
