import React, {useState} from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    NativeSyntheticEvent,
    TextInputKeyPressEventData, GestureResponderEvent, TextInputFocusEventData
} from "react-native";
import * as constants from '../constants/appConstants';
import AppLoading from 'expo-app-loading';
import useMyFont from "../hooks/useMyFonts";
import AppText from "./AppText";

interface AppTextInputProps {

    placeholder?: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad";
    value?: string | undefined;
    onChange?: ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void) | undefined;
    onChangeText?: ((text: string) => void) | undefined;
    onBlur?:  ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    multiline?: boolean | undefined;
    onKeyPress?: ((e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void) | undefined;
    onTouchEnd?:  ((event: GestureResponderEvent) => void) | undefined
    error?: string | null;
    enablesReturnKeyAutomatically?:  boolean | undefined;
    secureTextEntry?: boolean;
    name: string;
   // ref?: string;

}

const AppTextInput = (props: AppTextInputProps) => {

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
        <View style={style.mainContainer}>
            <View style={style.container}>
                <TextInput
                    style={style.textInput}
                    placeholderTextColor={"#aaa"}
                    placeholder={props.placeholder}
                    keyboardType={props.keyboardType}
                    keyboardAppearance={"dark"}
                    value={props.value}
                    onChange={props.onChange}
                    onChangeText={props.onChangeText}
                    selectionColor={constants.COLORS.primary}
                    multiline={props.multiline}
                    onKeyPress={props.onKeyPress}
                    onTouchEnd={props.onTouchEnd}
                    onBlur={props.onBlur}
                    name={props.name}

                    secureTextEntry={props.secureTextEntry}
                    enablesReturnKeyAutomatically={props.enablesReturnKeyAutomatically}
                />
            </View>
            <View>
                <AppText style={style.textInputError}>{props.error}</AppText>
            </View>
        </View>


    );
}

export default AppTextInput;

const style = StyleSheet.create({

    mainContainer: {
        width: "100%",
        flexShrink: 1,
    },
    container: {
        flexShrink: 1,
        borderColor: constants.COLORS.lightGray,
        borderBottomWidth: .5,
        padding: 10,
        margin: 3
    },

    // container: {
    //     flexShrink: 1,
    //     borderColor: "#efeded",
    //     backgroundColor: "rgba(66,65,65,0.4)",
    //     borderWidth: 0,
    //     borderRadius: 5,
    //     padding: 10,
    //     margin: 10
    // },
    textInput: {
        fontFamily: "MontserratMedium",
        color: constants.COLORS.lightGray,
        textAlign: "center",
    },
    textInputError: {
        color: constants.COLORS.red,
        fontSize: 12,
        textAlign: "center"
    }
});
