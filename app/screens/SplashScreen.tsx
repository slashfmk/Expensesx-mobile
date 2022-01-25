import React, {useEffect, useRef, useState} from 'react';
import {View, ImageBackground, StyleSheet, SafeAreaView, Button, StatusBar} from 'react-native';
//import {setStatusBarHidden, setStatusBarStyle, setStatusBarTranslucent, StatusBar} from 'expo-status-bar';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

import {COLORS, INFO, SIZE} from "../constants/appConstants";
import navConstants from "../constants/navConstants";
import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";
import InternetReachable from "../ui/InternetReachable";



const SplashScreen: React.FC = (props: any) => {

    return (
        <ImageBackground source={require("../assets/images/forestBg.jpeg")} imageStyle={{opacity: .4}} style={style.container}>
            <StatusBar translucent barStyle="light-content" />
            <InternetReachable />
            <View style={style.main}>

                <View>
                    <AppText style={style.title}>{INFO.appName}</AppText>
                    <AppText style={style.slogan}>{INFO.appSlogan}</AppText>
                </View>

                <View style={{width: "100%", paddingHorizontal: 65}}>
                    <AppButton title={"Sign In"} onPress={() => props.navigation.navigate(navConstants.SIGN_IN)} />
                    <AppButton title={"Sign Up"} onPress={() => props.navigation.navigate(navConstants.SIGN_UP)} />
                </View>


            </View>
        </ImageBackground>
    );

}

export default SplashScreen;

const style = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: COLORS.greenDark,
        justifyContent: "center",
        alignItems: "center",
    },

    main: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    slogan: {
        fontSize: SIZE.large,
        color: COLORS.white,
        marginVertical: 20,
    },

    title: {
        color: COLORS.primary,
        fontSize: 40,
        textAlign: "center"
    },

    copyright: {
        color: COLORS.white,
        fontSize: SIZE.small
    }

});
