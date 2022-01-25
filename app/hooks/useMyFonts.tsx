import React, {useState} from "react";

import * as Font from "expo-font";

const useMyFont = () => {

     return Font.loadAsync({
            "MontserratBlack": require("../assets/fonts/Montserrat/Montserrat-Black.ttf"),
            "MontserratThin" : require("../assets/fonts/Montserrat/Montserrat-Thin.ttf"),
            "MontserratLight": require("../assets/fonts/Montserrat/Montserrat-Light.ttf"),
            "MontserratExtraLight" : require("../assets/fonts/Montserrat/Montserrat-ExtraLight.ttf"),
            "MontserratRegular": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
            "MontserratMedium" : require("../assets/fonts/Montserrat/Montserrat-Medium.ttf"),
            "MontserratSemiBold" : require("../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
            "MontserratBold" : require("../assets/fonts/Montserrat/Montserrat-Bold.ttf")
        });

}

export default useMyFont;