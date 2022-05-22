import React, {useState, useContext} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    StatusBar,
    ScrollView,
    Platform
} from "react-native";


import {useFocusEffect} from '@react-navigation/native';

import {AntDesign, MaterialIcons} from '@expo/vector-icons';

import * as constants from '../constants/appConstants';
import AppText from "../ui/AppText";
import Tag from "../ui/Tag";
import LineGraphChart from "../ui/LineGraphChart";
import wordHelper from "../utility/wordHelper";
import * as appConstants from '../constants/appConstants';
import moment from "moment";

import Block from "../ui/Block";

import DateTimePicker from '@react-native-community/datetimepicker';
import TileBreakdown from "../ui/TileBreakdown";
import ActivityIndicator from "../ui/ActivityIndicator";
// import Icon from 'react-native-vector-icons/Feather';
import AuthContext from "../context/AuthContext";
import {TransactionsContext} from "../context/TransactionsContext";
import {useQuery, QueryObserverResult} from "react-query";
import {CategoryContext} from "../context/CategoryContext";
import transactionsApi from "../api/transactionsApi";

import functions from "../utility/functions";
import AppModal from "../ui/AppModal";
import PageActivityIndicator from "../ui/PageActivityIndicator";
import ITransaction from "../interfaces/ITransaction";

// Overview page
const OverviewScreen: React.FC = (props) => {

    const currentMonthTransactionList: QueryObserverResult = useQuery('currentMonthTransactions', () => transactionsApi.getCurrentMonthTransactions());
    const monthSummary: QueryObserverResult = useQuery('monthSummary', () => transactionsApi.getMonthSummary());
    const weeklySummary: QueryObserverResult = useQuery('weeklySummary', () => transactionsApi.getWeekSummary());


    const uLink: string = "https://images.unsplash.com/photo-1567303314286-6735a4ad9d42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1603&q=80";

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [country, setCountry] = useState("uk");

    // @ts-ignore
    const {auth, setAuth} = useContext(AuthContext);

    // dealing with date
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const bulkingResult = () => {
        //@ts-ignore
        return functions.bulkTotals(currentMonthTransactionList.data);
    }


    // @ts-ignore
    return (
        <>
            <View
                style={[style.briefContainer, {paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20}]}>
                <AppText style={[style.heading, {textAlign: "center"}]}>OVERVIEW</AppText>
                <View style={style.rowContainer}>

                    <View style={{width: 70, height: 70}}>
                        <Image
                            style={{
                                borderRadius: 35,
                                height: 70,
                                borderWidth: 2,
                                borderColor: "grey"
                            }}
                            width={70}
                            height={70}
                            source={{uri: uLink}}
                        />

                    </View>

                    <View>
                        {show && (
                            <AppText>Morning</AppText>
                        )}

                    </View>


                    <Tag
                        //@ts-ignore
                        icon={<AntDesign name="downcircle" size={15} color={constants.COLORS.lightGray}/>}
                        label={date.toDateString()}
                    />
                </View>


                <View style={style.rowContainer}>
                    <View style={{justifyContent: "space-around", height: 50}}>
                        <AppText>{"3000 spent today"}</AppText>
                        {/*<AppText>{"Status: Average"}</AppText>*/}
                    </View>
                    <View><AppText>{"Money usage"}</AppText></View>
                </View>
            </View>


            {/*<View style={{alignItems: "center", justifyContent: "center"}}>*/}
            {/*    <ActivityIndicator visible={true}/>*/}
            {/*</View>*/}

            <ScrollView style={style.container}>
                <StatusBar translucent barStyle={"light-content"}/>
                <SafeAreaView>

                    <View>


                        {
                            currentMonthTransactionList.isLoading ? <AppText>Loading ...</AppText>:
                                <View style={[style.briefContainer]}>
                                    <View style={{width: "100%", alignItems: "center"}}>
                                        <AppText>{"Balance"}</AppText>
                                        <AppText style={{
                                            color: constants.COLORS.primary,
                                            fontSize: 46
                                        }}>{
                                            // wordHelper.currencyFormatted(bulkTotals().balance, 'us-US', 'USD')
                                            //@ts-ignore
                                            bulkingResult().balance.toFixed(2)
                                        }</AppText>
                                    </View>

                                    <View style={style.rowContainer}>
                                        <View>
                                            <AppText>{"You have earned"}</AppText>
                                            <AppText style={{
                                                fontSize: 35,
                                                color: constants.COLORS.green
                                            }}>{
                                                // wordHelper.currencyFormatted(bulkTotals().totalIncome, 'us-US', 'USD')
                                                //@ts-ignore
                                                bulkingResult().totalIncome.toFixed(2)
                                            }</AppText>
                                            <AppText>{"This month"}</AppText>
                                        </View>

                                        {/*Separator*/}
                                        <View style={{borderColor: "#555", borderWidth: .6, height: "70%"}}>
                                        </View>
                                        {/*Separator ends*/}
                                        <View>
                                            <AppText style={{textAlign: "right"}}>{"You've spent"}</AppText>
                                            <AppText style={{fontSize: 35, color: constants.COLORS.red}}>
                                                {
                                                    //  wordHelper.currencyFormatted(bulkTotals().totalExpenses, 'us-US', 'USD')
                                                    //@ts-ignore
                                                    bulkingResult().totalExpenses.toFixed(2)
                                                }
                                            </AppText>
                                            <AppText style={{textAlign: "right"}}>{"this month"}</AppText>
                                        </View>
                                    </View>

                                </View>
                        }


                        <Block title={"Week Overview"} bgColor={appConstants.COLORS.greenDark}>

                            <AppText style={{marginVertical: 10, textAlign: "center"}}>{"This week stats."}</AppText>

                            {/*    Chart starts*/}

                            {weeklySummary.isLoading ? <AppText>Loading chart ...</AppText>:
                                <LineGraphChart
                                    labels={["Mon", "Tues", "Wed", "thur", "Fri", "Sat", "Sun"]}
                                    //@ts-ignore
                                    dataSetA={functions.weekGraphData(weeklySummary.data).incomes}
                                    //@ts-ignore
                                    dataSetB={functions.weekGraphData(weeklySummary.data).expenses}
                                    height={240}
                                />
                            }


                            {/* Chart ends*/}
                        </Block>



                        {/* Last month expenses block*/}
                        <Block bgColor={appConstants.COLORS.greenDark}
                               title={`${moment().format("MMMM")} expenses summary`}>

                            <View style={{marginVertical: 7}}>
                                <AppText style={{fontSize: 17}}>{"Total expenses"}</AppText>
                            </View>
                            <View style={{marginBottom: 25}}>
                                {
                                    monthSummary.isLoading ?
                                        <AppText>Loading...</AppText> : (
                                            //@ts-ignore
                                             functions.sortExpenses(monthSummary.data).map(item => <TileBreakdown
                                                 title={item.title}
                                                 amount={item.total}
                                                 times ={item.count}
                                                 key={`${item.total}`}
                                             />
                                            )
                                        )
                                }

                            </View>


                        </Block>

                    </View>

                </SafeAreaView>
            </ScrollView>

                <PageActivityIndicator
                    visible={currentMonthTransactionList.isLoading
                    || weeklySummary.isLoading
                    || monthSummary.isLoading}
                />


            {/*<AppModal title={"Pick a date"} height={50} visible={false}>*/}
            {/*    <AppText>Please pick a date to display stuff</AppText>*/}

            {/*    <View style={{flexDirection: "row"}}>*/}
            {/*        <AppTextInput placeholder={"Day"} />*/}
            {/*        <AppTextInput placeholder={"Month"} />*/}
            {/*        <AppTextInput placeholder={"Year"} />*/}
            {/*    </View>*/}

            {/*</AppModal>*/}

        </>
    );
}


export default OverviewScreen;

const style = StyleSheet.create({

    subTitle: {
        fontSize: constants.SIZE.xSmall,
        color: constants.COLORS.primaryLight
    },

    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    briefContainer: {
        width: "100%",
        minHeight: 80,
        padding: 10,
        backgroundColor: constants.COLORS.greenDark
    },

    // The profile stuff
    container: {
        flex: 1,
        width: "100%",
        paddingTop: 30,
    },
    subContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: StatusBar.currentHeight
    },
    heading: {
        color: constants.COLORS.white,
        fontSize: 20,
        marginVertical: 10
    }
});
