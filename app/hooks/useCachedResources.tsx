import Reqct from 'react';

import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    "MontserratBlack": require("../assets/fonts/Montserrat/Montserrat-Black.ttf"),
                    "MontserratThin" : require("../assets/fonts/Montserrat/Montserrat-Thin.ttf"),
                    "MontserratLight": require("../assets/fonts/Montserrat/Montserrat-Light.ttf"),
                    "MontserratExtraLight" : require("../assets/fonts/Montserrat/Montserrat-ExtraLight.ttf"),
                    "MontserratRegular": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
                    "MontserratMedium" : require("../assets/fonts/Montserrat/Montserrat-Medium.ttf"),
                    "MontserratSemiBold" : require("../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
                    "MontserratBold" : require("../assets/fonts/Montserrat/Montserrat-Bold.ttf")
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                await SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
