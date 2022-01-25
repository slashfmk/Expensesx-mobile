import React from "react";
import {Image, View, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {Feather} from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';

import * as Constants from "../constants/appConstants";

interface ImageCircleProps {
    url?: string;
}

const ImageCircle = (props: ImageCircleProps) => {
    return (
        <LinearGradient style={style.photoGrad} colors={[Constants.COLORS.primary, Constants.COLORS.green]}>
            {props.url ?
                <Image style={style.photo} source={{uri: props.url}}/> :
                <View style={style.noUrl}>
                    <Feather name={"user"} size={80} color={Constants.COLORS.green}/>
                </View>
            }

        </LinearGradient>
    );
}

export default ImageCircle;

const style = StyleSheet.create({
    photo: {
        width: 170,
        height: 170,
        borderRadius: 85,
        borderWidth: 5,
        borderColor: "black"
    },
    noUrl: {
        width: "90%",
        height: "90%",
        margin: 30,
        borderRadius: 90,
        backgroundColor: Constants.COLORS.secondary,
        justifyContent: "center",
        alignItems: "center"
    },
    photoGrad: {
        justifyContent: "center",
        alignItems: "center",
        width: 190,
        height: 190,
        borderRadius: 95,
        overflow: "hidden"
    },
})