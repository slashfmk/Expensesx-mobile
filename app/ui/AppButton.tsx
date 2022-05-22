import React from 'react';
import {
    View,
    GestureResponderEvent,
    Text,
    StyleSheet,
    TouchableHighlight, TouchableOpacity
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import {COLORS, SIZE} from "../constants/appConstants";
import AppText from "./AppText";


interface AppButtonProps {
    title: string;
    bgColor?: any | string;
    disabled?: boolean | null;
    onPress?: ((event: GestureResponderEvent) => (void | undefined)) | undefined;
}

const AppButton = (props: AppButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled} >
            <View style={[style.container, props.bgColor && {backgroundColor: props.bgColor}, props.disabled && {backgroundColor: "#999"}]}>
                <AppText style={style.title}>{props.title}</AppText>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
        backgroundColor: COLORS.primary,
        padding: 15,
        marginVertical: 5,
        borderRadius: 7
    },
    title: {
        color: COLORS.white,
        fontSize: SIZE.medium,
    }

});

export default AppButton;
