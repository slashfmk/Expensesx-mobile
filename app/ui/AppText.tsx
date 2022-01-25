import React, {useState} from "react";
import {GestureResponderEvent, StyleSheet, Text} from "react-native";
import * as constant from "../constants/appConstants";
import AppLoading from 'expo-app-loading';
import useMyFont from "../hooks/useMyFonts";


interface AppTextProps {
    children: string | number | undefined | string[] | any;
    style?: any;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    onLongPress?:  ((event: GestureResponderEvent) => void) | undefined;
}

const AppText = (props: AppTextProps) => {

    const [loadFonts, setLoadFonts] = useState<boolean>(false);

    if (!loadFonts) {
        return (
            <AppLoading
                startAsync={useMyFont}
                onFinish={() => setLoadFonts(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <Text
            style={[style.text, props.style && props.style]}
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            {props.children}
        </Text>
    );
}

export default AppText;

const style = StyleSheet.create({
    text: {
        fontFamily: "MontserratMedium",
        color: constant.COLORS.lightGray,
        fontSize: constant.SIZE.small
    }
});


