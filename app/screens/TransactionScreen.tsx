import React, {useState, useEffect, useCallback, useContext} from "react";
import {View, StyleSheet, StatusBar, SafeAreaView, Platform} from "react-native";

import {AppLoading} from "expo";
import useMyFont from "../hooks/useMyFonts";
import * as constants from '../constants/appConstants';
import TransactionTabNavigation from "../navigation/TransactionTabNavigation";

import {useFocusEffect} from '@react-navigation/native';
import AppText from "../ui/AppText";
import ActivityIndicator from "../ui/ActivityIndicator";
import {baseUrlApi} from "../constants/genConstant";
import {useQuery} from "react-query";

import {TransactionsContext} from "../context/TransactionsContext";

// Screen holding all expenses
// const getTransactions = async () => {
//     try {
//         const response: any = await axios.get(`${baseUrlApi}/transactions/`, {});
//         return response.data;
//     } catch(e){
//         console.log("Error while sending request");
//     }
// }

const TransactionScreen: React.FC = () => {

    const [loadFonts, setLoadFonts] = useState<boolean>(false);

    //@ts-ignore
    // const {transactions, setTransactions, deleteTransaction, modifyTransaction} = useContext(TransactionsContext);
    // const {isSuccess, isLoading, isError, error, data} = useQuery('transactions', () => getTransactions());

   // setTransactions(data);

    if (!loadFonts) {
        return (
            <AppLoading startAsync={useMyFont} onFinish={() => setLoadFonts(true)}/>
        );
    }

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
