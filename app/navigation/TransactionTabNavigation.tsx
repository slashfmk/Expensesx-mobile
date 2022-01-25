import React, {useState} from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

import AllTransactions from "../screens/tabs/AllTransactions";
import IncomeTab from "../screens/tabs/IncomeTab";
import ExpenseTab from "../screens/tabs/ExpenseTab";

import * as constants from '../constants/appConstants';
import navConstants from "../constants/navConstants";
import {TransitionPresets} from "@react-navigation/stack";
import AppLoading from 'expo-app-loading';
import useMyFont from "../hooks/useMyFonts";

const TransactionTabNavigation = () => {

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

            <TopTab.Screen name={navConstants.transactions.ALL} component={AllTransactions}/>
            <TopTab.Screen name={navConstants.transactions.INCOMES} component={IncomeTab}/>
            <TopTab.Screen name={navConstants.transactions.EXPENSES} component={ExpenseTab}/>
        </TopTab.Navigator>
    )
}

export default TransactionTabNavigation;
