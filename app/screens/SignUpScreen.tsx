import React, {useContext, useEffect} from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ImageBackground,
    Platform,
    ScrollView
} from "react-native";
import * as Constants from "../constants/appConstants";
import AppButton from "../ui/AppButton";
import navConstants from "../constants/navConstants";

import {useMutation} from "react-query";
import ActivityIndicator from "../ui/ActivityIndicator";
import AppTextInput from "../ui/AppTextInput";
import {Formik} from "formik";
import AppText from "../ui/AppText";
import * as Animatable from "react-native-animatable";
import * as Yup from "yup";
import axios from "../api/axios";
import {baseUrlApi} from "../constants/genConstant";
import AuthContext from "../context/AuthContext";


const SignUpScreen: React.FC = (props: any) => {

    // @ts-ignore
    const {mutateAsync, isLoading, error, isError} = useMutation(async (data) => await axios.post(`/auth/signup/`, data), {
        onSuccess: async (data, variables, context) => {
          //  console.log(data);
        },
        onError: (error1, variables, context) => {
           // console.log(error1);
        }
    });


    return (

        <ImageBackground source={require("../assets/app_images/profile.jpeg")} imageStyle={{opacity: .2}}
                         style={[StyleSheet.absoluteFillObject, style.container]}>
            <StatusBar translucent barStyle={"light-content"}/>

            <SafeAreaView style={style.subContainer}>
                <AppText style={style.heading}>Please sign up</AppText>

                {
                    isError ? <AppText style={style.headingRed}>
                            {//@ts-ignore
                              //  error.response.data.message
                            }
                            There is an error
                        </AppText> :
                        null
                }

                <Formik
                    initialValues={{firstname: '', lastname: '', email: '', password: '', rPassword: '', username: ''}}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Invalid email').required('Required'),
                        username: Yup.string().required('Required'),
                        password: Yup.string()
                            .required('Required')
                            .matches(new RegExp('(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+'), 'Must contain at least 1 Capital, lower letter and a digit'),
                        rPassword: Yup.string()
                            .required('Required')
                            .oneOf([Yup.ref('password')], "Passwords don't match"),
                        firstname: Yup.string().required('Required'),
                        lastname: Yup.string().required('Required')
                    })}
                    onSubmit={async values => {

                        try {
                            // @ts-ignore
                            const resp = await mutateAsync({
                                firstname: values.firstname,
                                lastname: values.lastname,
                                email: values.email,
                                username: values.username,
                                password: values.password,
                                repeat_password: values.rPassword
                            });
                        } catch (e) {
                            console.log(e);
                        }


                        //
                    }}
                >
                    {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          values,
                          errors,
                          isValid,
                          touched
                      }) => (

                        <View style={style.form}>


                            <AppTextInput
                                placeholder={'First name'}
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                name={"firstname"}
                                value={values.firstname}
                            />
                            <AppText style={style.errorInput}>{errors.firstname}</AppText>


                            <AppTextInput
                                placeholder={'Last name'}
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                name={"lastname"}
                                value={values.lastname}
                            />
                            <AppText style={style.errorInput}>{errors.lastname}</AppText>

                            <AppTextInput
                                placeholder={'Email'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                name={"email"}
                                value={values.email}
                            />
                            <AppText style={style.errorInput}>{errors.email}</AppText>

                            <AppTextInput
                                placeholder={'Username'}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                name={"username"}
                                value={values.username}
                            />
                            <AppText style={style.errorInput}>{errors.username}</AppText>

                            {/*<View style={style.rowContainer}>*/}
                                <AppTextInput
                                    placeholder={'Password'}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    name={"password"}
                                    value={values.password}
                                    secureTextEntry={true}
                                />
                                <AppText style={style.errorInput}>{errors.password}</AppText>

                                <AppTextInput
                                    placeholder={'Repeat password'}
                                    onChangeText={handleChange('rPassword')}
                                    onBlur={handleBlur('rPassword')}
                                    name={"rPassword"}
                                    value={values.rPassword}
                                    secureTextEntry={true}
                                />
                                <AppText style={style.errorInput}>{errors.rPassword}</AppText>

                            {/*</View>*/}

                            {isLoading ?
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <ActivityIndicator size={100} visible={true}/>
                                </View>
                                :
                                <AppButton
                                    disabled={isLoading}
                                    title={isLoading ? "Signing Up ..." : "Sign Up"}
                                    onPress={() => handleSubmit()}
                                />
                            }
                            <AppText onPress={() => props.navigation.navigate(navConstants.SIGN_IN)}
                                     style={style.subTitle}>
                                Have an account? Sign In instead</AppText>

                            {/*   #### Form end*/}


                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </ImageBackground>

    );
}

export default SignUpScreen;

const style = StyleSheet.create({

    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "black",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    rowContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20
    },
    subContainer: {
        flex: 1,
        justifyContent: "center"
    },
    form: {
        width: "100%",
        padding: 20
    },
    subTitle: {
        color: Constants.COLORS.white,
        fontWeight: "900",
        marginVertical: 9,
        textAlign: "center"
    },
    heading: {
        color: Constants.COLORS.white,
        fontSize: 27,
        fontWeight: "900",
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
