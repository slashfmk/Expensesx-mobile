
/*
Activity indicator for screens
 */
import React from 'react';
import {View} from 'react-native';
import AppModal from "./AppModal";
import ActivityIndicator from "./ActivityIndicator";
import LottieView from 'lottie-react-native';


interface IConfirmActivityIndicator {
    visible: boolean;
}

const ConfirmActivityIndicator: React.FC<IConfirmActivityIndicator> = (props) => {
    return (
        <AppModal
            title={"loading"}
            width={100}
            height={100}
            showIconTitle={props.visible}
            visible={props.visible}
            bg={true}
        >
            <View style={{justifyContent: "center", alignItems: "center", position: "relative", top: -15}}>
                <LottieView
                    style={{backgroundColor: "transparent", width: 100 && 100}}
                    source={require('../assets/json_anim/check_simple.json')}
                   // autoSize={}
                    autoPlay
                    loop={false}
                />
            </View>

        </AppModal>
    );
}

export default ConfirmActivityIndicator;
