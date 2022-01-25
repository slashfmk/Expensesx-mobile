import React from "react";
import {StyleSheet} from "react-native";
import * as Animatable from 'react-native-animatable';

interface ZoomInAnimationProps {
    children?: any[];
    duration?: number;
    delay?: number;
    style?: any;
}

const ZoomInAnimation = (props: ZoomInAnimationProps) => (
    <Animatable.View
        animation={"zoomIn"}
        useNativeDriver={true}
        easing={"ease-in"}
        style={props.style}
        delay={props.delay ? props.delay : 0}
        duration={props.duration ? props.duration : 500}>

        {props.children}

    </Animatable.View>
);

export default ZoomInAnimation;