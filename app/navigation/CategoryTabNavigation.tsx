import React, {useState} from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import IncomeManager from "../screens/tabs/IncomeManagerTab";
import ExpenseManager from "../screens/tabs/ExpenseManagerTab";
import * as constants from "../constants/appConstants";
import navConstants from "../constants/navConstants";
import AppLoading from 'expo-app-loading';
import useMyFont from "../hooks/useMyFonts";

const CategoryTabNavigation = () => {

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

    const TopTab = createMaterialTopTabNavigator();

    // <BottomTab.Navigator screenOptions ={{
    //     // labelStyle: {fontFamily: "MontserratMedium",},
    //     tabBarActiveTintColor: constants.COLORS.primary,
    //     //  allowFontScaling: true,
    //     tabBarInactiveTintColor: constants.COLORS.lightGray,
    //     //  safeAreaInsets: {bottom: 0},
    //     tabBarStyle: {
    //         borderTopWidth: 0,
    //         backgroundColor: constants.COLORS.greenDark
    //     }
    // }} >

    return (
        <TopTab.Navigator screenOptions={{
            tabBarLabelStyle: {fontFamily: "MontserratMedium",},
            tabBarIndicatorStyle: {backgroundColor: constants.COLORS.primary},
            tabBarActiveTintColor: constants.COLORS.primary,
            tabBarAllowFontScaling: true,
            tabBarInactiveTintColor: constants.COLORS.lightGray,
            tabBarStyle: {
                borderBottomColor: "black",
                paddingVertical: 0, backgroundColor: constants.COLORS.greenDark
            },
           // style: {paddingVertical: 0, backgroundColor: constants.COLORS.greenDark}
        }}>
            <TopTab.Screen name={navConstants.categoryManagement.INCOMES} component={IncomeManager}/>
            <TopTab.Screen name={navConstants.categoryManagement.EXPENSES} component={ExpenseManager}/>
        </TopTab.Navigator>
    )
};

export default CategoryTabNavigation;
