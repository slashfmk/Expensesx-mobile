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
import {useQuery, useQueryClient} from "react-query";
import {baseUrlApi} from "../../constants/genConstant";

import axios from 'axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PageActivityIndicator from "../../ui/PageActivityIndicator";


// Screen holding all expenses
const IncomeTab: React.FC = (props: any) => {

    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();
    const [refresh, setRefresh] = useState<boolean>(false);
    //@ts-ignore

    const {isSuccess, isLoading, isError, error, data} = useQuery(
        'incomes',
        async () => await axiosPrivate.get(`/transactions/incomes/`),
        {
            onSuccess(data) {
                console.log(data);
            },
            onError(error) {
                console.log(error);
            }
        }
    );

    const refreshing = async () => {
        await queryClient.invalidateQueries('incomes');
        await queryClient.invalidateQueries('expenses');
        await queryClient.invalidateQueries('transactions');
        // currentMonthTransactions
        await queryClient.invalidateQueries('weeklySummary');
        await queryClient.invalidateQueries('monthSummary');
        await queryClient.invalidateQueries('currentMonthTransactions');
    }

    // @ts-ignore
    return (
        <>
            <View style={style.container}>

                <StatusBar translucent barStyle={"light-content"}/>
                <SafeAreaView style={style.content}>

                    <Animatable.View
                        animation={"slideInUp"} easing={"ease-in-out-back"}
                        duration={500}
                        useNativeDriver={true}
                        style={[style.rowContainer, {marginVertical: 5}]}
                    >
                        <AppText style={style.heading}>{data?.data.length !== null && data?.data.length} transactions | </AppText>

                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <Tag label={"search"}
                                //@ts-ignore
                                 icon={<MaterialCommunityIcons name="folder-search" size={18} color={constants.COLORS.lightGray}/>}
                            />
                        </View>
                    </Animatable.View>

                    {
                        isLoading ?
                            //@ts-ignore
                            // <View style={{alignItems: "center", justifyContent: "center"}}>
                            //     <ActivityIndicator visible={true} />
                            // </View>
                            <PageActivityIndicator visible={isLoading} />
                            :
                            data?.data.length > 0 ?
                                <FlatList
                                    // data={loadedData}
                                    data={data?.data}
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
                                    onRefresh={refreshing}
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

                                    {/*<ActivityIndicator visible={true}/>*/}

                                </View>



                    }

                </SafeAreaView>
            </View>
        </>

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
