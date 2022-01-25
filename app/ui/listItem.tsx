import React from "react";
import {View, Text, StyleSheet} from "react-native";
import AppText from "./AppText";

interface CategoryItemProps {
    title: string;
    subTitle: string;
}

const ListItem = (props: CategoryItemProps) => {
    return (
        <View style={style.categoryItem}>
            <AppText style={style.categoryItemTitle}>{props.title}</AppText>
            <AppText style={style.categoryItemSubTitle}>{props.subTitle}</AppText>
        </View>
    );
}

export default ListItem;

const style = StyleSheet.create({

    categoryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 7
    },
    categoryItemTitle: {
        marginRight: 20,
    },
    categoryItemSubTitle: {
        color: "white",
    }
});