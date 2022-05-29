import React, {useState, useEffect, useCallback, useContext} from "react";
import {View, StyleSheet, StatusBar, SafeAreaView, Platform} from "react-native";

import AppLoading from 'expo-app-loading';
import useMyFont from "../hooks/useMyFonts";
import * as constants from '../constants/appConstants';
import TransactionTabNavigation from "../navigation/TransactionTabNavigation";

import {useFocusEffect} from '@react-navigation/native';
import AppText from "../ui/AppText";
import ActivityIndicator from "../ui/ActivityIndicator";
import {baseUrlApi} from "../constants/genConstant";
import {useQuery} from "react-query";

const TransactionScreen: React.FC = () => {

    const [loadFonts, setLoadFonts] = useState<boolean>(false);

    return (
            <View style={style.container}>
                <StatusBar translucent barStyle={"light-content"}/>
                <AppText style={style.heading}>TRANSACTIONS</AppText>
                <TransactionTabNavigation />
            </View>
    );
}

export default TransactionScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.greenDark,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30
    },
    content: {

    },
    heading: {
        fontFamily: "MontserratMedium",
        textAlign: "center",
        color: constants.COLORS.white,
        fontSize: 17,
        fontWeight: "900",
        marginVertical: 10
    },

});
