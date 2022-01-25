import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent} from "react-native";

import {AntDesign, Entypo, MaterialCommunityIcons} from '@expo/vector-icons';

import * as constants from '../constants/appConstants';
import AppText from "./AppText";
import wordHelper from "../utility/wordHelper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppSwipeableActions from "./AppSwipeableActions";
import * as constant from "../constants/appConstants";

import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from 'axios';
import {baseUrlApi} from "../constants/genConstant";
import ConfirmActivityIndicator from "./ConfirmActivityIndicator";

interface CategoryItemProps {
    id: number;
    title: string;
    subTitle: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
    date?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {

    const queryClient = useQueryClient();

    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean> (false);
    const mutation = useMutation('types', (id) => axios.delete(`${baseUrlApi}/type/${id}`), {
        onSuccess: async (data, variables, context) => {

            setIsConfirmationModalVisible(true);
            setTimeout(() => {
                setIsConfirmationModalVisible(false);
            }, 1700);

            setTimeout(async () => {
                await queryClient.invalidateQueries('types');
                await queryClient.invalidateQueries('typeIncomes');
                await queryClient.invalidateQueries('typeExpenses');
            }, 1700)


        },
        onError: (data, variables, context) => {
            console.log(data);
        },
        onMutate: () => {

        }
    })

    return (
        <Swipeable
            // renderLeftActions={() => <AppSwipeableActions
            //     //@ts-ignore
            //     icon={<AntDesign name={"star"} size={30} color={constant.COLORS.yellow}/>}
            //     bgColor={constant.COLORS.greenDark}
            //     onPress={() => console.log(`item ${props.title} as favorite`)}
            // />}
            renderRightActions={() => <>
                <AppSwipeableActions
                    //@ts-ignore
                    icon={<AntDesign name={"delete"} size={30} color={constant.COLORS.greenDark}/>}
                    bgColor={constant.COLORS.red}
                    onPress={ async () => {
                        await mutation.mutateAsync(props.id);
                    }}
                />

                <AppSwipeableActions
                    //@ts-ignore
                    icon={<AntDesign name={"edit"} size={30} color={constant.COLORS.greenDark}/>}
                    bgColor={constant.COLORS.yellow}
                    onPress={props.onPress}
                />
            </>

            }
        >
        <TouchableWithoutFeedback onLongPress={props.onLongPress}>
        <View style={[style.container,
            {borderLeftColor: constants.COLORS.primary}]}>

            <View style={[style.rowContainer]}>
                <AppText style={style.title}>{wordHelper.FirstLetterToUpperCase(props.title)}</AppText>
            </View>

            <View style={style.rowContainer}>
                {/*<AppText style={style.dateAdded}>Description:</AppText>*/}
                <AppText style={style.description}>{props.subTitle}</AppText>
            </View>

            <View style={style.rowContainer}>
                <AppText style={style.dateAdded}>{}</AppText>
            </View>

        </View>
        </TouchableWithoutFeedback>
            <ConfirmActivityIndicator visible={isConfirmationModalVisible} />
        </Swipeable>
    );
}

export default CategoryItem;

const style = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: constants.COLORS.greenDark,
        marginVertical: 0,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderLeftWidth: 5,
        borderLeftColor: "red"
    },

    rowContainer: {
        flexDirection: "column",
        flexShrink: 1
    },
    title: {
        fontFamily: "MontserratBold",
        fontSize: 14,
        marginBottom: 0
    },
    description: {
        flexWrap: "wrap"
    },
    dateAdded: {
        fontSize: 13,
        color: constants.COLORS.primary,
        marginVertical: 2
    }
});
