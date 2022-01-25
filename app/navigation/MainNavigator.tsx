import React from "react";
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";

import Navigation from "./Navigation";
import navConstants from "../constants/navConstants";
import {NavigationContainer, Theme} from "@react-navigation/native";
import AddTypeScreen from "../screens/AddTypeScreen";
import EditTypeScreen from '../screens/UpdateTypeScreen';

import * as appConstants from '../constants/appConstants';
import UpdateType from "../screens/UpdateTypeScreen";
import AddTransactionScreen from "../screens/AddTransactionScreen";


const Stack = createStackNavigator();

const MyTheme: Theme = {
    dark: true,
    colors: {
        notification: appConstants.COLORS.primary,
        primary: appConstants.COLORS.primary,
        background: appConstants.COLORS.secondary,
        card: 'rgb(255, 255, 255)',
        text: appConstants.COLORS.lightGray,
        border: appConstants.COLORS.lightGray
    },
};

const MainNavigation = () => {

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{headerShown: false,}} initialRouteName={navConstants.NAVIGATION}>
                <Stack.Screen
                    name={navConstants.NAVIGATION}
                    component={Navigation}
                    options={{...TransitionPresets.ModalSlideFromBottomIOS}}
                />

                <Stack.Screen
                    name={navConstants.ADDTYPE}
                    component={AddTypeScreen}
                    options={{...TransitionPresets.ModalSlideFromBottomIOS}}
                />

                <Stack.Screen
                    name={navConstants.EDITTYPE}
                    component={EditTypeScreen}

                />

                <Stack.Screen
                    name={navConstants.ADDTRANSACTION}
                    component={AddTransactionScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation;