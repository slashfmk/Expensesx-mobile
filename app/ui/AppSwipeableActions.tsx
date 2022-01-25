import React from "react";
import {StyleSheet, TouchableWithoutFeedback, View, GestureResponderEvent} from "react-native";
import * as Animatable from 'react-native-animatable';

interface AppSwipeableActionsProps {
    icon: React.Component;
    bgColor: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    ;
}

const AppSwipeableActions = (props: AppSwipeableActionsProps) => {

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <Animatable.View
                duration={500}
                useNativeDriver={true}
                animation={"zoomIn"}
                easing={"ease-in"}
                style={[style.container,
                    {backgroundColor: props.bgColor}]}
            >
                {props.icon}
            </Animatable.View>
        </TouchableWithoutFeedback>
    )
}

export default AppSwipeableActions;

const style = StyleSheet.create({
    container: {
        height: "100%",
        width: "20%",
        justifyContent: "center",
        backgroundColor: "red",
        alignItems: "center"
    }
});