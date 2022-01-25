import React from 'react';
import LottieView from "lottie-react-native";

interface ActivityIndicatorProps {
    visible: boolean;
    size?: number;
}

const ActivityIndicator = ({visible = false, size = 130}: ActivityIndicatorProps) => {

    if (!visible) return null;
    return <LottieView
        style={{backgroundColor: "transparent", width: size && size}}
        autoPlay={true}
        loop={true}
        source={require("../assets/json_anim/loading.json")}
    />
};

export default ActivityIndicator;