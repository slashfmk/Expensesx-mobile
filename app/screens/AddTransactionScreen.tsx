import React, {useState} from "react";
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, View} from "react-native";

import {AntDesign, Feather, MaterialIcons} from '@expo/vector-icons';

import AppText from "../ui/AppText";

import * as appConstant from '../constants/appConstants';
import AppTextInput from "../ui/AppTextInput";
import AppButton from "../ui/AppButton";
import ActivityIndicator from "../ui/ActivityIndicator";
import * as Animatable from 'react-native-animatable';


const AddTransactionScreen = (props: any) => {


    // form
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [satisfaction, setSatisfaction] = useState("");
    const [categoryType, setCategoryType] = useState<string>("");

    const [errors, setErrors] = useState({titleError: "", descError: ""});


    // handle fields
    const handleTitle = (title: string): void => {
        setTitle(title);
    }

    const handleAmount = (amount: number): void => {
        setAmount(amount);
    }

    const handleComment = (comment: string): void => {
        setComment(comment);
    }

    const handleCategoryType = (categoryType: string): void => {
        setCategoryType(categoryType);
    }
    const handleSatisfaction = (satisfaction: string): void => {
        setSatisfaction(satisfaction);
    }

    // Validation
    const validation = (): void => {
        if (!title || !amount || !satisfaction || !categoryType) {
            // if (!title) setErrors({titleError: "Title is missing", descError: ""});
            // else if (!description) setErrors({titleError: "", descError: "Description is missing"});
            // else setErrors({titleError: "Title is missing", descError: "Description is missing"})

        } else {
            //@ts-ignore
            dispatch(transactionActions.transactionAdd({
                "title": title,
                "amount": Number.parseFloat(String(amount)),
                "type": categoryType,
                "comment": comment,
                "satisfaction": satisfaction
            }));

            // if (typeSelector.error != null) {
            //        console.log("Error when inserting")
            // } else {
            //     props.navigation.goBack();
            // }
        }
    }


    // @ts-ignore
    // @ts-ignore
    return (
        <View style={{flex: 1}}>
            <View style={[style.container,
                {
                    backgroundColor: appConstant.COLORS.greenDark,
                    paddingBottom: 20,
                    flex: .5
                }]}
            >

                <Animatable.View duration={600} useNativeDriver={true} delay={600} animation={"bounceIn"}
                                 easing={"ease-in"}>
                    <Feather onPress={() => props.navigation.goBack()} name="arrow-left" size={30}
                             color={appConstant.COLORS.lightGray}/>
                </Animatable.View>

                <Animatable.View duration={600} useNativeDriver={true} delay={300} animation={"bounceIn"}
                                 easing={"ease-in"}>
                    <MaterialIcons name="playlist-add" style={{textAlign: "center"}} size={64}
                                   color={appConstant.COLORS.lightGray}/>
                </Animatable.View>

                <Animatable.View duration={300} useNativeDriver={true} delay={600} animation={"fadeInLeft"}
                                 easing={"ease-in"}>
                    <AppText style={style.title}>Create new {props.route.params.item.type}</AppText>
                </Animatable.View>


                <Animatable.View duration={300} useNativeDriver={true} delay={700} animation={"fadeInRight"}
                                 easing={"ease-in"}>
                    <AppText style={{textAlign: 'center'}}>Enter your {props.route.params.item.type} info
                        below</AppText>
                    <AppText>{"fixed this"}</AppText>
                </Animatable.View>
            </View>

            <View style={[style.container, {justifyContent: "center"}]}>


                <View>
                    {/*/!*{typeSelector.error && <AppText>{typeSelector.error}</AppText>}*!/*/}
                    {/*{!title || !description &&*/}
                    {/*<AppText style={style.errorMessage}>Please fill out empty field!</AppText>*/}
                    {/*}*/}
                </View>

                <View>


                    <Animatable.View duration={300} useNativeDriver={true} delay={650} animation={"fadeInLeft"}
                                     easing={"ease-in"}>
                        <AppTextInput
                            placeholder={"Title"}
                            value={title}
                            onChangeText={handleTitle}
                            error={errors.titleError}
                        />
                    </Animatable.View>

                    <Animatable.View duration={300} useNativeDriver={true} delay={650} animation={"fadeInLeft"}
                                     easing={"ease-in"}>
                        <AppTextInput
                            placeholder={"Amount"}
                            value={amount}
                            keyboardType={"numeric"}
                            onChangeText={handleAmount}
                        />
                    </Animatable.View>

                    <View>
                    </View>

                    <Animatable.View duration={300} useNativeDriver={true} delay={600} animation={"fadeInRight"}
                                     easing={"ease-in"}>
                        <AppTextInput
                            placeholder={"comment"}
                            value={comment}
                            onChangeText={handleComment}

                        />
                    </Animatable.View>


                    <Animatable.View duration={300} useNativeDriver={true} delay={600} animation={"fadeInRight"}
                                     easing={"ease-in"}>
                        <AppTextInput

                            placeholder={"satisfaction"}
                            value={satisfaction}
                            onChangeText={handleSatisfaction}

                        />
                    </Animatable.View>

                    <Animatable.View duration={300} useNativeDriver={true} delay={600} animation={"fadeInRight"}
                                     easing={"ease-in"}>
                        <AppTextInput

                            placeholder={"Category type"}
                            value={categoryType}
                            onChangeText={handleCategoryType}

                        />
                    </Animatable.View>

                    {
                        <Animatable.View duration={600} useNativeDriver={true} delay={600} animation={"bounceIn"}
                                         easing={"ease-in"}>
                            <AppButton
                                // disabled={typeSelector.loading || (!title || !satisfaction || !amount )}
                                // title={typeSelector.loading ? "Submitting ..." : "Submit"}

                                title={"Work here"}
                                onPress={() => validation()}
                            />
                        </Animatable.View>
                    }
                </View>

            </View>
        </View>
    )

}

export default AddTransactionScreen;

const style = StyleSheet.create({
    container: {
        paddingTop: 50,
        width: "100%",
        paddingHorizontal: 30,

    },
    errorMessage: {
        color: appConstant.COLORS.red,
        textAlign: "center"
    },
    title: {
        fontSize: appConstant.SIZE.large,
        textAlign: "center",
        marginVertical: 10
    }
});
