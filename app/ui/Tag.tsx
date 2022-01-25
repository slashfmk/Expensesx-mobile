import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import * as constants from "../constants/appConstants";
import AppModal from "./AppModal";
import AppText from "./AppText";

interface TagProps {
    label: string;
    icon?: React.Component| undefined;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    bgColor?: string | any;
}

const Tag = (props: TagProps) => {
    return (
            <TouchableWithoutFeedback onPress={props.onPress}>
                <View style={[style.rowContainer, props.bgColor && {backgroundColor: props.bgColor}]}>
                    {props.icon}
                    <AppText style={style.label}> {props.label}</AppText>
                </View>
            </TouchableWithoutFeedback>
    );
}

export default Tag;

const style = StyleSheet.create({

    // tag
    rowContainer: {
        backgroundColor: "#000000",
        marginHorizontal: 2,
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    label: {
        fontSize: constants.SIZE.xSmall,
        textAlign: "center"
    },
});