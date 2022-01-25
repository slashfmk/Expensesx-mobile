import React from "react";
import {GestureResponderEvent, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import * as constants from "../constants/appConstants";
import {FontAwesome} from "@expo/vector-icons";
import AppText from "./AppText";

interface FullBottomButtonprops {
    title: string;
    bgColor?: string | any;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const FullBottomButton = (props: FullBottomButtonprops) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[style.container, props.bgColor && {backgroundColor: props.bgColor}]}>
                <FontAwesome
                    name="plus"
                    size={30}
                    color={constants.COLORS.lightGray}
                />
                <AppText>{props.title}</AppText>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default FullBottomButton;

const style = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        borderColor: "#444",
        borderTopWidth: .2,
        borderBottomWidth: .2,
        backgroundColor: constants.COLORS.greenDark,
        zIndex: 1
    }
})
