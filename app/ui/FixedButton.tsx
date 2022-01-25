
import React from "react";
import {GestureResponderEvent, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import * as constants from "../constants/appConstants";
import {FontAwesome} from "@expo/vector-icons";
import AppText from "./AppText";

interface FixedButtonprops {
    title: string;
    bgColor?: string | any;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const FixedButton = (props: FixedButtonprops) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[style.container, props.bgColor && {backgroundColor: props.bgColor}]}>
                <FontAwesome
                    name={props.title}
                    size={20}
                    color={constants.COLORS.lightGray}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default FixedButton;

const style = StyleSheet.create({
    container: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        bottom: 30,
        right: 30,
        padding: 10,
        borderColor: "#444",
        borderTopWidth: .2,
        borderBottomWidth: .2,
        backgroundColor: constants.COLORS.primary,
        opacity: .9,
        zIndex: 1
    }
})
