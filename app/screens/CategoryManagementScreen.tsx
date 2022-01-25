import React  from "react";

import {View, StyleSheet, StatusBar} from "react-native";
import * as Constants from "../constants/appConstants";
import CategoryTabNavigation from "../navigation/CategoryTabNavigation";
import AppText from "../ui/AppText";
import * as constants from "../constants/appConstants";

const CategoryManagementScreen: React.FC = () => {

    return (
        <View style={style.container}>
            <StatusBar translucent barStyle={"light-content"}/>

            <View style={{alignItems: "center"}}>
                <AppText style={style.title}>CATEGORY MANAGEMENT</AppText>
            </View>
            <CategoryTabNavigation/>
        </View>
    );
}

export default CategoryManagementScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: 30,
        backgroundColor: Constants.COLORS.greenDark
    },
    title: {
        color: constants.COLORS.white,
        fontSize: 17,
        marginVertical: 10

    }
});
