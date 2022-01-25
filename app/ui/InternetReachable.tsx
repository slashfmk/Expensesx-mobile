import React from "react";
import {View, StyleSheet} from 'react-native';
import AppText from "./AppText";
import {useNetInfo} from "@react-native-community/netinfo";
import * as appConstant from '../constants/appConstants';

const InternetReachable: React.FC = (props: any) => {
    return (
        <View>
            {useNetInfo().isInternetReachable && <AppText style={style.txt}>No internet</AppText>}
        </View>
    );
}

const style = StyleSheet.create({
    bg: {
        width: "100%",
        padding: 30,
        backgroundColor: "black"
    },
    txt: {
        color: appConstant.COLORS.primary
    }
});

export default InternetReachable;