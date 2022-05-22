import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, StatusBar, SafeAreaView, FlatList, Platform} from "react-native";

import * as Animatable from 'react-native-animatable';

import * as constants from '../../constants/appConstants';
import PreviewItem from "../../ui/PreviewItem";
import {AntDesign, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';

import Tag from "../../ui/Tag";
import AppModal from "../../ui/AppModal";
import AppTextInput from "../../ui/AppTextInput";
import useFeedbackEmoji from "../../hooks/useFeedbackEmoji";
import AppButton from "../../ui/AppButton";
import AppText from "../../ui/AppText";
import FullBottomButton from "../../ui/FullBottomButton";
import ActivityIndicator from "../../ui/ActivityIndicator";
import navConstants from "../../constants/navConstants";
import FixedButton from "../../ui/FixedButton";
import {useQuery} from "react-query";
import {baseUrlApi} from "../../constants/genConstant";

import axios from 'axios';


// Screen holding all expenses
const IncomeTab: React.FC = (props: any) => {

    //@ts-ignore
    const {transactions, setTransactions, deleteTransaction, modifyTransaction} = useContext(TransactionsContext);

    const [loadedData, setLoadedData] = useState<any []>([]);
    const [refresh, setRefresh] = useState<boolean>(false);

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const [sTitle, setSTitle] = useState("");


    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        loadInfo();
    }, [transactions]);

    const loadInfo = (): void => {
        setLoadedData(transactions.filter((item: any) => item.category === "incomes"));
    }

    const handleSearch = (title: string): void => {
        const exp = new RegExp(title, 'i');

        const stf: any[] = transactions.filter(
            (item: any) => (item.comment.match(exp) || item.title.match(exp)) && item.category === "incomes");
        setLoadedData(stf);
    }

    const handleSTitle = (value: string): void => {
        setSTitle(value);
        handleSearch(value);
    }

    const handleCloseSearch = (): void => {
        setSTitle("");
        setIsSearching(false);
        loadInfo();
    }

    // for handling
    // @ts-ignore
    return (
        <View style={style.container}>

            <StatusBar translucent barStyle={"light-content"}/>
            <SafeAreaView style={style.content}>

                {/*<FullBottomButton*/}
                {/*    title={"Add income"}*/}
                {/*    onPress={() => props.navigation.navigate(navConstants.ADDTRANSACTION,*/}
                {/*        {item: {"type": "incomes"}})}*/}
                {/*/>*/}

                <FixedButton
                    title={"plus"}
                    onPress={() => props.navigation.navigate(navConstants.ADDTRANSACTION,
                        {item: {"type": "incomes"}})}
                />

                {
                    isSearching ?

                        <Animatable.View
                            animation={"slideInDown"} easing={"ease-in-out-back"}
                            useNativeDriver={true}
                            style={{
                                width: "100%",
                                backgroundColor: constants.COLORS.greenDark,
                                padding: 10,
                                marginBottom: 4,
                                alignItems: "center"
                            }}>
                            <AppText style={style.heading}>Let's find it! ({loadedData.length})</AppText>
                            <View style={style.rowContainer}>

                                <AppTextInput name={"searchInput"} value={sTitle} onChangeText={handleSTitle}
                                              placeholder={"Searching for ..."}/>

                            </View>

                            <AntDesign name="closecircle" size={28} color={constants.COLORS.lightGray}
                                       onPress={() => handleCloseSearch()}/>
                        </Animatable.View>
                        : (
                            <Animatable.View
                                animation={"slideInUp"} easing={"ease-in-out-back"}
                                duration={500}
                                useNativeDriver={true}
                                style={[style.rowContainer, {marginVertical: 5}]}
                            >
                                <AppText style={style.heading}>{loadedData.length} transactions | </AppText>

                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>

                                    <Tag label={"search"} onPress={() => setIsSearching(true)}
                                        //@ts-ignore
                                         icon={<MaterialCommunityIcons name="folder-search" size={18}
                                                                       color={constants.COLORS.lightGray}/>}
                                    />
                                </View>
                            </Animatable.View>
                        )
                }


                {
                    // allIncomes.loading ?
                    //     <View style={{alignItems: "center", justifyContent: "center"}}>
                    //         <ActivityIndicator visible={true}/>
                    //     </View>
                    //     :
                    loadedData.length > 0 ?
                        <FlatList
                            data={loadedData}
                            renderItem={({item}) =>
                                <PreviewItem
                                    key={item.transaction_id}
                                    id={item.transaction_id}
                                    title={item.title}
                                    amount={item.amount}
                                    time={item.created_time}
                                    category={item.category}
                                    type={item.type}
                                    satisfaction={item.satisfaction}
                                    date={item.created_date}
                                    comment={item.comment}
                                />
                            }
                            refreshing={refresh}
                            onRefresh={() => console.log("refreshing ...")}
                            keyExtractor={(item) => item.transaction_id}
                        /> :
                        <View style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: constants.COLORS.greenDark,
                            padding: 10,
                            marginBottom: 4
                        }}>
                            <Animatable.View animation={"fadeInUp"} easing={"ease-in"} useNativeDriver>
                                {useFeedbackEmoji("bad", 100)}
                            </Animatable.View>
                            <Animatable.View style={{marginTop: 10}}
                                             animation={"fadeInUp"}
                                             easing={"ease-in"}
                                             delay={200}
                                             useNativeDriver={true}
                            >
                                <AppText style={style.heading}>There is nothing to show</AppText>
                            </Animatable.View>

                        </View>

                }

            </SafeAreaView>

            {/*Modal for adding income*/}
            {/*<AppModal title={"Add Income"} width={"100%"} height={"100%"} visible={isAdding}>*/}
            {/*    <View style={{justifyContent: "center", alignItems: "center"}}>*/}
            {/*        <AppTextInput name={''} placeholder={"Title"}/>*/}
            {/*        <AppTextInput placeholder={"Comment"}/>*/}
            {/*        <AppTextInput placeholder={"How satisfied are you??"}/>*/}
            {/*        <AppButton title={"Save"} onPress={() => setIsAdding(false)}/>*/}
            {/*    </View>*/}
            {/*</AppModal>*/}

        </View>
    );
}

export default IncomeTab;

const style = StyleSheet.create({

    rowContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    // inc
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.secondary
    },
    content: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1
    },
    heading: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "900",
        marginTop: Platform.OS === "android" ? 0 : 10,
        marginBottom: 10
    },

});
