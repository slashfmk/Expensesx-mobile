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

import {useQuery, useQueryClient, QueryCache} from "react-query";

import PageActivityIndicator from "../../ui/PageActivityIndicator";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const AllTransactions: React.FC<any> = (props) => {

    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const [refresh, setRefresh] = useState<boolean>(false);

    //@ts-ignore

    const {isSuccess, isLoading, isError, error, data} = useQuery(
        'transactions',
        async () => await axiosPrivate.get(`/transactions/`, {}),
        {}
    );

    const refreshing = async () => {
        await queryClient.invalidateQueries('incomes');
        await queryClient.invalidateQueries('expenses');
        await queryClient.invalidateQueries('transactions');
    }

    // @ts-ignore
    return (
        <View style={style.container}>

            <StatusBar translucent barStyle={"light-content"}/>
            <SafeAreaView style={style.content}>


                {
                    isLoading || refresh ?
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
