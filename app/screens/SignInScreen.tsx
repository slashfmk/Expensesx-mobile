import React, {useContext, useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ImageBackground,
    Platform, ScrollView,
} from "react-native";

import * as Animatable from 'react-native-animatable';
import {useMutation, useQuery} from "react-query";
import {Formik} from "formik";
import * as Yup from 'yup';

import * as Constants from "../constants/appConstants";
import navConstants from "../constants/navConstants";

import AppTextInput from "../ui/AppTextInput";
import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";
import ActivityIndicator from "../ui/ActivityIndicator";
import Notification from "../ui/Notification";

import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

import ISignInForm from "../interfaces/ISignInForm";
import storage from "../utility/storage";
import useRefreshToken from "../hooks/useRefreshToken";
import IsLoggedInContext from "../context/IsLoggedInContext";
import AuthContext from "../context/AuthContext";

const SignInScreen: React.FC<any> = (props) => {
    //@ts-ignore
    const {auth, setAuth} = useContext(AuthContext);
    const refresh = useRefreshToken();
    //@ts-ignore
    const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);

    // @ts-ignore
    const {mutateAsync, isError, isLoading, isSuccess, error} =
        useMutation(async (login: ISignInForm) => axios.post(`/auth/signin/`, login),
            {
                onSuccess: async (data, variables, context) => {
                    //@ts-ignore
                    const refreshToken = data.data.refreshToken;
                    await storage.saveRefreshToken(refreshToken);
                    await refresh();
                    setIsLoggedIn(true);
                },
                onError: async (error1, variables, context) => {
                     await storage.deleteRefreshToken();
                     setAuth({});
                     setIsLoggedIn(false);
                   //  console.error(error1.response.data.message);
                }
            });

    useEffect(() => {
    }, [isLoggedIn]);

    // @ts-ignore
    return (
        <ImageBackground source={require("../assets/app_images/profile.jpeg")}
                         imageStyle={{opacity: .2, backgroundColor: "#000000"}}
                         style={[StyleSheet.absoluteFillObject, style.container]}>
            <StatusBar translucent barStyle={"light-content"}/>

            <SafeAreaView style={style.subContainer}>
                <Animatable.View
                    animation={"slideInUp"}
                    duration={1000}
                    useNativeDriver>
                    <AppText style={style.heading}>Please sign in</AppText>
                </Animatable.View>

                {
                    isError && <Notification type={"danger"}>
                        {//@ts-ignore
                            //  error.response.data.message
                        }
                    </Notification>

                }


                <Formik
                    initialValues={{username: '', password: ''}}
                    onSubmit={async values => {
                        try {
                            await mutateAsync({
                                // @ts-ignore
                                username: values.username.toString(),
                                password: values.password.toString()
                            })
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Required'),
                        password: Yup.string().required('Required')
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

                        <View style={style.form}>

                            <Animatable.View animation={"slideInLeft"} useNativeDriver={true}>

                                <AppTextInput
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    placeholder={'Username'}
                                    value={values.username}
                                    name={"username"}
                                />
                                <AppText style={style.errorInput}>{errors.username}</AppText>
                            </Animatable.View>

                            <Animatable.View animation={"slideInRight"} useNativeDriver={true}>

                                <AppTextInput
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry={true}
                                    placeholder={'Password'}
                                    value={values.password}
                                    name={"password"}
                                />
                                <AppText style={style.errorInput}>{errors.password}</AppText>
                            </Animatable.View>

                            <Animatable.View animation={"slideInUp"} useNativeDriver={true}>
                                {isLoading ?
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <ActivityIndicator size={100} visible={true}/>
                                    </View>
                                    :
                                    <AppButton
                                        disabled={isLoading}
                                        title={isLoading ? "Signing In ..." : "Sign In"}
                                        onPress={handleSubmit}
                                    />
                                }
                            </Animatable.View>

                            <Animatable.View animation={"slideInRight"} useNativeDriver={true}>
                                <AppText
                                    onPress={() => props.navigation.navigate(navConstants.SIGN_UP)}
                                    style={style.subTitle}>
                                    Don't have an account? Sign up
                                </AppText>
                            </Animatable.View>

                            <Animatable.View animation={"slideInLeft"} useNativeDriver={true}>
                                <AppText onPress={() => props.navigation.navigate(navConstants.SPLASH)}
                                         style={style.subTitle}>Forgot your password</AppText>
                            </Animatable.View>

                        </View>

                    )}
                </Formik>
            </SafeAreaView>

        </ImageBackground>
    )
}


export default SignInScreen;


const style = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "black",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    subContainer: {
        flex: 1,
        justifyContent: "center"
    },
    form: {
        padding: 20,
        //alignItems: "center"
    },
    subTitle: {
        fontFamily: "MontserratMedium",
        color: Constants.COLORS.white,
        marginVertical: 9,
        textAlign: "center"
    },
    heading: {
        fontFamily: "MontserratMedium",
        color: Constants.COLORS.white,
        fontSize: 27,
        marginVertical: 10,
        textAlign: "center"
    },
    headingRed: {
        fontFamily: "MontserratMedium",
        color: Constants.COLORS.red,
        fontSize: 15,
        marginVertical: 10,
        textAlign: "center"
    },
    errorInput: {
        color: Constants.COLORS.red,
        textAlign: "center",
        marginTop: -10
    }
});
