import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";

import {AntDesign, Feather, MaterialCommunityIcons} from '@expo/vector-icons';

import AppText from "../ui/AppText";

import * as appConstant from '../constants/appConstants';
import AppTextInput from "../ui/AppTextInput";
import AppButton from "../ui/AppButton";
import ActivityIndicator from "../ui/ActivityIndicator";
import * as Animatable from 'react-native-animatable';
import {TransactionsContext} from "../context/TransactionsContext";
import {CategoryContext} from "../context/CategoryContext";
import {Formik} from "formik";
import * as Yup from "yup";
import ConfirmActivityIndicator from "../ui/ConfirmActivityIndicator";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {baseUrlApi} from "../constants/genConstant";

import Notification from "../ui/Notification";


const UpdateType: React.FC<any> = (props) => {


    const queryClient = useQueryClient();

    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean> (false);

    const mutation = useMutation('types', (data) => axios.patch(`${baseUrlApi}/type/${props.route.params.item.id}`, data),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries('typeIncomes');
                queryClient.invalidateQueries('typeExpenses');
                queryClient.invalidateQueries('transactions');
            },
            onError: (data, variables) => {},
            onMutate: () => {

            }
        })


    // @ts-ignore
    return (
        <>
            <View style={style.container}>


                <Animatable.View duration={600} useNativeDriver={true} delay={600} animation={"bounceIn"} easing={"ease-in"}>
                <Feather onPress={() => props.navigation.goBack()} name="arrow-left" size={30}
                         color={appConstant.COLORS.lightGray}/>
                </Animatable.View>


                <Animatable.View duration={800} useNativeDriver={true} animation={"bounceIn"} easing={"ease-in"}>
                      <MaterialCommunityIcons name="briefcase-edit" style={{textAlign: "center"}} size={74}
                                              color={appConstant.COLORS.lightGray}/>
                </Animatable.View>

                <Animatable.View duration={300} useNativeDriver={true} animation={"fadeInLeft"} easing={"ease-in"}>
                <AppText style={style.title}>Edit {props.route.params.item.title} category</AppText>
                </Animatable.View>

                <Animatable.View duration={500} useNativeDriver={true} animation={"fadeInRight"} easing={"ease-in"}>
                <View style={style.notification}>
                    <AppText style={{textAlign: 'center', color: appConstant.COLORS.yellow}}>Note: updating this category will affect all transactions using it</AppText>

                </View>
                </Animatable.View>

                {
                    mutation.isError ?
                        <Notification type={"danger"}>
                            {mutation.isError ? mutation.error.response.data : ""}
                        </Notification>
                        : null
                }

            </View>

            <View style={style.container}>

                {/*Formik starts*/}

                <Formik
                    initialValues={{title: props.route.params.item.title, description: props.route.params.item.description}}
                    onSubmit={async values => {
                        // @ts-ignore
                        await mutation.mutateAsync({title: values.title, description: values.description});
                        if(!mutation.isError){
                            setIsConfirmationModalVisible(true);
                            setTimeout(() => {
                                setIsConfirmationModalVisible(false);
                                props.navigation.goBack();
                            }, 1700);

                        }

                    }}

                    validationSchema={Yup.object().shape({
                        title: Yup.string().required('Required'),
                        description: Yup.string().required('Required')
                    })}
                >

                    {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          errors,
                          touched,
                          isValid,
                          values
                      }) => (
                        <>
                            <Animatable.View duration={300} useNativeDriver={true} delay={650} animation={"fadeInLeft"}
                                             easing={"ease-in"}>
                                <AppTextInput
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    name={'title'}
                                    placeholder={"Title"}
                                    value={values.title}
                                    error={errors.title}
                                />
                            </Animatable.View>


                            <Animatable.View duration={300} useNativeDriver={true} delay={600} animation={"fadeInRight"}
                                             easing={"ease-in"}>
                                <AppTextInput
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    name={'description'}
                                    placeholder={"Description"}
                                    value={values.description}
                                    multiline={true}
                                    error={errors.description}
                                />
                            </Animatable.View>


                            <Animatable.View duration={600} useNativeDriver={true} delay={600} animation={"bounceIn"}
                                             easing={"ease-in"}>
                                <AppButton
                                    disabled={mutation.isLoading || isConfirmationModalVisible}
                                    title={mutation.isLoading || isConfirmationModalVisible ? "Saving ..." : "Submit"}
                                    onPress={handleSubmit}
                                />
                            </Animatable.View>

                            <ConfirmActivityIndicator visible={isConfirmationModalVisible} />
                        </>
                    )}


                </Formik>
                {/* #end Formik*/}

            </View>
        </>
    )

}

export default UpdateType;

const style = StyleSheet.create({
    container: {
        paddingTop: 50,
        width: "100%",
        paddingHorizontal: 20,
    },
    notification: {
        backgroundColor: appConstant.COLORS.greenDark,
        borderRadius: 6,
        padding: 15
    },
    errorMessage: {
        color: appConstant.COLORS.red,
        textAlign: "center"
    },
    title: {
        fontSize: appConstant.SIZE.large,
        textAlign: "center",
        color: appConstant.COLORS.white,
        marginVertical: 10
    }
});
