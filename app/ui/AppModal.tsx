import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    SafeAreaView,
    Dimensions,
    Platform,
    GestureResponderEvent,
    TouchableWithoutFeedback
} from "react-native";
import * as constant from "../constants/appConstants";
import * as constants from "../constants/appConstants";
import ZoomInAnimation from "../animation/ZoomInAnimation";
import wordHelper from "../utility/wordHelper";
import AppText from "./AppText";
import {AntDesign, MaterialCommunityIcons, Fontisto} from "@expo/vector-icons";

interface AppModalProps {
    title: string;
  //  children: any[] | any;
    visible: boolean;
    height?: string | number;
    width?: string | number;
    showIconTitle?: boolean;
    bg?: boolean;
    onClose?: ((event: GestureResponderEvent) => void) | undefined;
}

const AppModal: React.FC<AppModalProps> = (props) => {

    return (
        <Modal style={{zIndex: 25}} transparent={true} visible={props.visible}>
            <SafeAreaView style={style.modalContainer}>
                <ZoomInAnimation
                    duration={200}
                    style={[style.modal, props.bg ? {backgroundColor: "transparent"} : {backgroundColor: constant.COLORS.secondary}, props.height && {height: props.height}, props.width && {width: props.width}]}>


                    {!props.showIconTitle &&
                    (<Fontisto
                        name="close" style={style.close}
                        size={40}
                        onPress={props.onClose}
                        color={constants.COLORS.lightGray}
                    />)}

                    {!props.showIconTitle &&
                    (<AppText style={style.mTitle}>{wordHelper.FirstLetterToUpperCase(props.title)}</AppText>)}

                    {props.children}
                </ZoomInAnimation>
            </SafeAreaView>
        </Modal>
    );
}

export default AppModal;

const style = StyleSheet.create({
    // Modal styling

    close: {
        position: "absolute",
        left: `${100 / 2}%`,
        top: -60
    },

    mTitle: {
        fontFamily: "MontserratBold",
        color: constant.COLORS.primary,
        fontSize: 17,
        textAlign: "center",
        marginBottom: 7
        // marginTop: Platform.OS === "android" ? 0 : 10,
        //  marginBottom: 10
    },
    mContent: {
        paddingVertical: 10
    },
    modal: {
        width: "80%",
        minHeight: "1%",
        padding: 20,
        margin: 20,
        borderRadius: 10
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)"
    },
})
