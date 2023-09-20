import React from "react";
import { NavigationContainer } from "@react-navigation/native";
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

SplashScreen.preventAutoHideAsync();

export default function AppEntry() {
	const [fontsLoaded] = useFonts({
		// Add fonts here
	});

	React.useEffect(() => {
		// Make any initial API call here like fetching signed in user's data
	}, []);

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded) {
			// Load up user's device local storage
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (
		!fontsLoaded
		// appStore.isInitializing
	) {
		// App is still loading
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<NavigationContainer>
						<RootSiblingParent>
							<AppRoutes />
						</RootSiblingParent>
					</NavigationContainer>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
