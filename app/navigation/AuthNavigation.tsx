import React from "react";
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import navConstants from "../constants/navConstants";
//import {NavigationContainer} from "@react-navigation/native";
//import {NavigationContainer} from "react-navigation";
import {NavigationContainer, Theme} from "@react-navigation/native";


const Stack = createStackNavigator();

const AuthNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName={navConstants.SPLASH}>
                <Stack.Screen
                    name={navConstants.SPLASH}
                    component={SplashScreen}
                />
                <Stack.Screen
                    name={navConstants.SIGN_IN}
                    component={SignInScreen}
                    options={ {...TransitionPresets.ScaleFromCenterAndroid}}
                />
                <Stack.Screen
                    name={navConstants.SIGN_UP}
                    component={SignUpScreen}
                    options={ {...TransitionPresets.ScaleFromCenterAndroid}}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthNavigation;
