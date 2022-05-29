import React, {useState} from "react";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { FontAwesome, AntDesign, Entypo, Octicons } from '@expo/vector-icons';

import TransactionScreen from "../screens/TransactionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import navConstants from "../constants/navConstants";
import * as constants from "../constants/appConstants";
import CategoryManagementScreen from "../screens/CategoryManagementScreen";
import OverviewScreen from "../screens/OverviewScreen";
import AppLoading from 'expo-app-loading';
import useMyFont from "../hooks/useMyFonts";

const BottomTab = createBottomTabNavigator();

const Navigation: React.FC = () => {

    const [loadFonts, setLoadFonts] = useState<boolean>(false);

    if (!loadFonts) {
        return (
            <AppLoading
                startAsync={useMyFont}
                onFinish={() => setLoadFonts(true)}
                onError={console.warn}
            />
        );
    }

    const navTheme = DefaultTheme;
    navTheme.colors.background = constants.COLORS.secondary;
    navTheme.colors.text = constants.COLORS.lightGray;
    navTheme.colors.primary = constants.COLORS.primary;

    return (

            <BottomTab.Navigator screenOptions ={{
                tabBarLabelStyle: {fontFamily: "MontserratMedium",},
                tabBarActiveTintColor: constants.COLORS.primary,
                tabBarAllowFontScaling: true,
                tabBarInactiveTintColor: constants.COLORS.lightGray,
                headerShown: false,
               // tabBarSafeAreaInsets: {bottom: 0},
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: constants.COLORS.greenDark
                }
            }} >

                <BottomTab.Screen
                    name={navConstants.navBar.OVERVIEW}
                    component={OverviewScreen}
                    options={{
                         tabBarLabel: 'Overview',
                        tabBarIcon: ({ color, size }) => (
                            <Octicons name="home" size={size} color={color} />
                        )
                    }}
                />

                <BottomTab.Screen
                    name={navConstants.navBar.TRANSACTIONS}
                    component={TransactionScreen}
                    options={{
                        tabBarLabel: 'Transactions',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="profile" size={size} color={color} />
                        )
                    }}
                />

                <BottomTab.Screen
                    name={navConstants.navBar.CATEGORY_MGT}
                    component={CategoryManagementScreen}
                    options={{
                        tabBarLabel: 'Category',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="switcher" size={size} color={color} />
                        )
                    }}
                />

                <BottomTab.Screen
                    name={navConstants.navBar.PROFILE}
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user-circle" size={size} color={color} />
                        )
                    }}
                />

            </BottomTab.Navigator>


    );
}

export default Navigation;

