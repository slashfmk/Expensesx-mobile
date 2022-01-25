import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from "./AppText";
import * as AppConstants from "../constants/appConstants";
import wordHelper from "../utility/wordHelper";

interface TileBreakdownProps {
    title: string;
    times: number;
    amount: number
}

const TileBreakdown = (props: TileBreakdownProps) => {

    const [amount, setAmount] = useState(0);

    // useEffect(() => {
    // }, [props.amount])

    return (
            <View style={styles.container}>
                <View style={styles.row}>

                    <View>
                        <AppText style={{fontSize: 15, color: "#fff"}}>{wordHelper.FirstLetterToUpperCase(props.title)}</AppText>
                        <AppText style={{fontSize: 12}}>{props.times} transactions</AppText>
                    </View>

                    <AppText style={{fontSize: 17}}>{wordHelper.currencyFormatted(props.amount, 'us-US', 'USD')}</AppText>
                </View>

            </View>
    );
}

export default TileBreakdown;

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppConstants.COLORS.secondary,
        borderRadius: 9,
        padding: 15,
        marginVertical: 2
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
