import React, {useEffect, useState, useContext} from "react";
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

import {TransactionsContext} from "../../context/TransactionsContext";
import {useQuery, QueryObserverResult, useQueryClient, QueryCache} from "react-query";

import transactionsApi from "../../api/transactionsApi";
import {baseUrlApi} from "../../constants/genConstant";

import PageActivityIndicator from "../../ui/PageActivityIndicator";


const AllTransactions: React.FC<any> = (props) => {


    const queryClient = useQueryClient();

    //@ts-ignore
    const {transactions, setTransactions} = useContext(TransactionsContext);

    const {isSuccess, isLoading, isError, error, data} = useQuery(
        'transactions',
        () => transactionsApi.getTransactions(),
        {}
    );

    useEffect(() => {
        // console.log(queryClient.getQueryCache().queries('transactions'));
        // console.log(queryClient.getQueryData('weeklySummary'));
    }, [])

    setTransactions(data);

    const [loadedData, setLoadedData] = useState<any []>([]);

    const [refresh, setRefresh] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const [sTitle, setSTitle] = useState("");


    const loadInfo = (): void => {
        setLoadedData(transactions);
    }

    const refreshing = async () => {
        await queryClient.invalidateQueries('transactions');
    }

    // search start
    const handleSearch = (title: string): void => {
        const exp = new RegExp(title, 'i');

        const stf: any[] = transactions.filter(
            (item: any) => (item.comment.match(exp) || item.title.match(exp)));
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
    // #End Search

    // for handling
    // @ts-ignore
    return (
        <View style={style.container}>

            <StatusBar translucent barStyle={"light-content"}/>
            <SafeAreaView style={style.content}>

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

                                <AppTextInput name={"search"} value={sTitle} onChangeText={(v) => handleSTitle(v)}
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
                                {/*<AppText style={style.heading}>{data.length !== null && data.length} transactions | </AppText>*/}

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
                    isLoading ?
                        //@ts-ignore
                        // <View style={{alignItems: "center", justifyContent: "center"}}>
                        //     <ActivityIndicator visible={true} />
                        // </View>
                        <PageActivityIndicator visible={isLoading} />
                    :
                    data.length > 0 ?
                        <FlatList
                            // data={loadedData}
                            data={data}
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
    );
}

export default AllTransactions;

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
