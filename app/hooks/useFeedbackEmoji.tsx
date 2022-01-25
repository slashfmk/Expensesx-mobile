import React from "react";
import {Entypo} from "@expo/vector-icons";
import * as constant from "../constants/appConstants";

const useFeedbackEmoji = (rate: "excellent" | "neutral" | "bad" | string, size?: number) => {

        switch (rate) {
            case "excellent":
                return <Entypo name="emoji-happy" size={size ? size : 20} color={constant.COLORS.green} />;
            case "neutral":
                return <Entypo name="emoji-neutral" size={size ? size : 20} color={constant.COLORS.yellow} />
            case "bad":
                return <Entypo name="emoji-sad" size={size ? size : 20} color={constant.COLORS.red} />
            default:
                return <Entypo name="block" size={size ? size : 20} color="white" />

    }
}

export default useFeedbackEmoji;