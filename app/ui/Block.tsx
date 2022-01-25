import React from "react";
import {View, Text, StyleSheet} from "react-native";
import * as Constants from "../constants/appConstants";
import AppText from "./AppText";


interface BlockProps {
    title: string;
    children?: any [];
    bgColor?: string | any;
}

// Blocking different contents in the app
const Block = (props: BlockProps) => {

    return (
        <View style={[style.block, props.bgColor && {backgroundColor: props.bgColor}]}>
            <AppText style={style.blockTitle}>{props.title}</AppText>
            <View style={{marginHorizontal: 0}}>
                {props.children}
            </View>
        </View>
    );

}

export default Block;

const style = StyleSheet.create({
    // category
    block: {
        width: "100%",
        paddingHorizontal: 9,
        marginVertical: 3,
        backgroundColor: Constants.COLORS.secondary
    },
    blockTitle: {
        color: "white",
        marginVertical: 10,
        marginLeft: 10,
        fontSize: Constants.SIZE.medium,
    },
});
