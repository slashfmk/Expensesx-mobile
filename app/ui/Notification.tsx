import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import * as appConstant from "../constants/appConstants";
import AppText from "./AppText";
import * as appConstants from '../constants/appConstants';
import * as Animatable from 'react-native-animatable';


interface INotification {
    type: "info" | "danger" | "warning" | "success";
}

const Notification: React.FC<INotification> = (props) => {

    let colorNote = "";
    const [visible, setVisible] = useState<string>("bounceIn");
    const [isPresent, setIsPresent] = useState<string>("flex");

    if(props.type === "danger"){
        colorNote = appConstants.COLORS.red
    } else if (props.type === "warning"){
        colorNote = appConstants.COLORS.yellow;
    } else if (props.type === "success") {
        colorNote = appConstants.COLORS.green;
    } else if(props.type === "info"){
        colorNote = "blue";
    }

    setTimeout(() => {
        setVisible("bounceOut");
    }, 3000);

    setTimeout(() => {
        setIsPresent("none");
    }, 4000);


    return (
        <Animatable.View animation={visible} useNativeDriver={true} easing={"ease-in"} style={[style.wrapper,]}>
           <AppText style={{color: colorNote, textAlign: "center"}}>
               {props.children}
           </AppText>
        </Animatable.View>
    )
}

const style = StyleSheet.create({

    wrapper: {
        backgroundColor: "rgba(0, 0, 0, .5)",
       // width: "100%",
        borderRadius: 6,
        marginHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 10,
        padding: 15
    }
});

export default Notification;
