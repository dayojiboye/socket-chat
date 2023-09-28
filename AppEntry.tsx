import React from "react";
import { useColorScheme } from "react-native";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { showToast } from "./src/utils/helpers";
import { toastType } from "./src/enums";
import AppRoutes from "./src/config/routes";
import useStore from "./src/hooks/useStore";
import socket from "./src/utils/socket";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

SplashScreen.preventAutoHideAsync();

export default function AppEntry() {
	const deviceTheme = useColorScheme(); // operating system color scheme
	const appStore = useStore();

	const _getUserPreferredTheme = async () => {
		try {
			const value = await AsyncStorage.getItem("theme");
			// if (deviceTheme && value === null) {
			// 	appStore.toggleThemeMode(deviceTheme);
			// } else if (value !== null) {
			// 	appStore.toggleThemeMode(value);
			// } else {
			// 	appStore.toggleThemeMode("light");
			// }
			appStore.toggleThemeMode("dark");
		} catch (err) {
			__DEV__ && console.log("Something went wrong loading user's theme", err);
		} finally {
			_getUserName();
		}
	};

	const _getUserName = async () => {
		try {
			const value = await AsyncStorage.getItem("username");
			if (value !== null) appStore.setUserName(value);
		} catch (err) {
			__DEV__ && console.log("Something went wrong loading username", err);
		} finally {
			setTimeout(() => {
				appStore.setInitApp(false);
			}, 500);
		}
	};

	const [fontsLoaded] = useFonts({
		// Add fonts here
	});

	React.useEffect(() => {
		_getUserPreferredTheme();
		TimeAgo.addDefaultLocale(en);
		socket.connect();
		// Make any initial API call here like fetching signed in user's data
		return () => {
			// socket.disconnect();
			socket.emit("disconnect");
		};
	}, []);

	// React.useEffect(() => {
	// 	_getUserPreferredTheme();
	// }, [deviceTheme]);

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded || appStore.isInitializing) {
		// App is still loading
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<NavigationContainer theme={DarkTheme}>
						<RootSiblingParent>
							<AppRoutes />
						</RootSiblingParent>
					</NavigationContainer>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
