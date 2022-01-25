import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";

import Swipeable from 'react-native-gesture-handler/Swipeable';

import * as Animatable from 'react-native-animatable';

import useFeedbackEmoji from "../hooks/useFeedbackEmoji";

import {AntDesign, FontAwesome5} from '@expo/vector-icons';
import timeAndDateHelper from "../utility/timeAndDateHelper";

import * as constant from '../constants/appConstants';
import AppButton from "./AppButton";
import AppModal from "./AppModal";
import AppText from "./AppText";
import AppSwipeableActions from "./AppSwipeableActions";
import wordHelper from "../utility/wordHelper";
import moment from "moment";
import luxon, {DateTime} from 'luxon';

import {useMutation, useQueries, QueryClient, useQueryClient} from "react-query";
import axios from "axios";
import {baseUrlApi} from "../constants/genConstant";
import PageActivityIndicator from "./PageActivityIndicator";
import ConfirmActivityIndicator from "./ConfirmActivityIndicator";

interface PreviewItemProps {

    id: number;
    title: string;
    comment?: string;
    amount: number;
    time: string;
    category: "expense" | "income" | string;
    type: string;
    satisfaction: "bad" | "neutral" | "excellent" | string;
    date: string;
}

// Component item
const PreviewItem = (props: PreviewItemProps) => {

    const queryClient = useQueryClient();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean> (false);
    // @ts-ignore
    const {mutateAsync, isError, isLoading, isSuccess} = useMutation((data) => axios.delete(`${baseUrlApi}/transactions/${data}`), {
            onSuccess: async (data, variables, context) => {
                await queryClient.invalidateQueries('transactions');
                await queryClient.invalidateQueries('monthSummary');
                await queryClient.invalidateQueries('weeklySummary');

                setIsConfirmationModalVisible(true);
                setTimeout(() => {
                    setIsConfirmationModalVisible(false);
                }, 1600);

            },
            onError: (error, variables, context) => {
            },
            onSettled: (data) => {
            }
        }
    );

    return (
        <>
            <Swipeable
                renderLeftActions={() => <AppSwipeableActions
                    //@ts-ignore
                    icon={<AntDesign name={"star"} size={30} color={constant.COLORS.yellow}/>}
                    bgColor={constant.COLORS.greenDark}
                    onPress={() => console.log(`item ${props.title} as favorite`)}
                />}
                renderRightActions={() => <>
                    <AppSwipeableActions
                        //@ts-ignore
                        icon={<AntDesign name={"delete"} size={30} color={constant.COLORS.greenDark}/>}
                        bgColor={constant.COLORS.red}
                        //@ts-ignore
                        onPress={() => mutateAsync(props.id)}
                    />

                    <AppSwipeableActions
                        //@ts-ignore
                        icon={<AntDesign name={"edit"} size={30} color={constant.COLORS.greenDark}/>}
                        bgColor={constant.COLORS.yellow}
                        onPress={() => console.log(`item ${props.title} modified!`)}
                    />
                </>

                }
            >
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(true)}>

                    <Animatable.View
                        useNativeDriver={true}
                        animation={"fadeInUp"}
                        easing={"ease-in-out-sine"}
                        style={style.container}
                    >

                        <View style={style.UpperWrapper}>
                            <AppText style={style.title}>{props.title}</AppText>
                            {useFeedbackEmoji(props.satisfaction)}
                        </View>

                        <View style={style.lowerWrapper}>

                            <View style={[style.prefixWrapper,
                                props.category === "incomes" ?
                                    {backgroundColor: constant.COLORS.green} :
                                    {backgroundColor: constant.COLORS.red}
                            ]}>
                            </View>

                            <View style={style.suffixWrapper}>
                                <AppText style={style.description}>
                                    {props.comment ? props.comment : "No comment found!"}
                                </AppText>

                                <View style={style.extra}>
                                    <View>
                                        <AppText style={style.description}>Amount: </AppText>
                                        <AppText style={style.amount}>{props.amount}</AppText>
                                    </View>

                                    <View>
                                        <AppText style={[style.description, {textAlign: "center"}]}>{"Type"}</AppText>
                                        <AppText
                                            style={style.amount}>{props.type.substring(0, 1).toUpperCase()}{props.type.substring(1).toLowerCase()}</AppText>
                                    </View>

                                    <View>
                                        <AppText style={[style.description, {textAlign: "right"}]}>{"Date"}</AppText>
                                        <AppText style={style.amount}>
                                            {/*{*/}
                                            {/*    DateTime.fromISO(props.date)*/}
                                            {/*}*/}
                                            {moment(props.date).isSame(moment().format('YYYY/MM/D')) ?
                                                `Today at ${timeAndDateHelper.convertTime(props.time)}`
                                                : moment(props.date).format("dd MMM DD YYYY")}
                                        </AppText>
                                    </View>

                                </View>


                            </View>


                        </View>

                    </Animatable.View>
                </TouchableWithoutFeedback>


                <ConfirmActivityIndicator duration={1000} visible={isConfirmationModalVisible}/>

                <AppModal title={props.title} visible={isModalVisible} onClose={() => setIsModalVisible(false)}>

                    <View style={style.rowContainer}>
                        {/*<FontAwesome5 name="money-check-alt" size={18} color={constant.COLORS.lightGray}/>*/}
                        <AppText style={style.spot}> {props.amount}</AppText>
                    </View>

                    <View style={style.rowContainer}>
                        <AntDesign name="piechart" size={18} color={constant.COLORS.lightGray}/>
                        <AppText
                            style={style.modalTitle}> {wordHelper.FirstLetterToUpperCase(props.type)}</AppText>
                    </View>

                    <View style={style.rowContainer}>
                        <AntDesign name="calendar" size={18} color={constant.COLORS.lightGray}/>
                        <AppText style={style.modalTitle}> {moment(props.date).format("MMMM Do YYYY")}</AppText>
                        <AppText style={style.modalTitle}> | </AppText>
                        <AntDesign name="clockcircleo" size={18} color={constant.COLORS.lightGray}/>
                        <AppText style={style.modalTitle}> {timeAndDateHelper.convertTime(props.time)}</AppText>
                    </View>

                    <View style={style.satisfaction}>
                        <AppText style={style.modalTitle}>I was </AppText>
                        {useFeedbackEmoji(props.satisfaction)}
                        <AppText style={style.modalTitle}> with this transact.</AppText>
                    </View>


                    <View style={style.modalComment}>
                        <AppText
                            style={style.description}>{props.comment ? props.comment : "No comment found!"}</AppText>
                    </View>
                    <AppButton title={"Done"} onPress={() => setIsModalVisible(false)}/>
                </AppModal>


            </Swipeable>
        </>
    );
}

export default PreviewItem;

const style = StyleSheet.create({

    // cat
    categoryText: {
        flexWrap: "wrap",
        fontSize: 11,
    },
    categoryManagement: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'center',
        backgroundColor: "black",
        borderRadius: 30,
    },

    //
    rowContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    satisfaction: {
        flexDirection: "row",
        justifyContent: "center"
    },
    //modal content
    modalComment: {
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, .5)",
        marginVertical: 10
    },
    amountRow: {
        justifyContent: "space-around"
    },
    modalTitle: {
        fontFamily: "MontserratBold",
        fontSize: constant.SIZE.small,
        textAlign: "center",
        marginBottom: 7
    },

    spot: {
        fontFamily: "MontserratMedium",
        fontSize: constant.SIZE.xxLarge,
        fontWeight: "300",
        textAlign: "center",
        marginBottom: 7
    },


    // the ui
    container: {
        width: "100%",
        borderRadius: 0,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: constant.COLORS.greenDark,
        marginVertical: 0
    },
    UpperWrapper: {
        width: "100%",
        flexShrink: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10,
        alignItems: "flex-start"
    },
    lowerWrapper: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 10,
        marginTop: 4
    },
    prefixWrapper: {
        width: 5,
        height: "100%",
        marginRight: 10,
        backgroundColor: constant.COLORS.primary
    },
    suffixWrapper: {
        width: "100%",
        flexShrink: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },

    extra: {
        width: "100%",
        flexDirection: "row",
        flexShrink: 1,
        justifyContent: "space-between",
        borderWidth: .9,
        paddingTop: 7,
        borderTopColor: "#353739",
        borderColor: "transparent",
        marginVertical: 7
    },

    date: {
        fontSize: constant.SIZE.xLarge,
    },
    title: {
        fontFamily: "MontserratBold",
        fontSize: constant.SIZE.small,
        marginLeft: 25
    },
    description: {
        flexWrap: "wrap",
    },
    amount: {
        fontSize: 13,
        color: constant.COLORS.primary,
    }

});
