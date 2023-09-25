import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import Chats from "../screens/Chats";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppRoutes() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerBackTitleVisible: false,
				headerTitleAlign: "center",
				headerShadowVisible: false,
				headerMode: "screen",
				headerLeftContainerStyle: { paddingLeft: 20 },
				headerRightContainerStyle: { paddingHorizontal: 20 },
			}}
		>
			<Stack.Screen name="Chats" component={Chats} />
		</Stack.Navigator>
	);
}
