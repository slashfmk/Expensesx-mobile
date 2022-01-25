import React, {useState} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";

import {AntDesign, Feather} from '@expo/vector-icons';

import AppText from "../ui/AppText";

import * as appConstant from '../constants/appConstants';
import AppTextInput from "../ui/AppTextInput";
import AppButton from "../ui/AppButton";
import ActivityIndicator from "../ui/ActivityIndicator";
import * as Animatable from 'react-native-animatable';

import {Formik} from 'formik';
import * as Yup from 'yup';

import {useMutation, useQuery, QueryClient, useQueryClient} from "react-query";
import axios from "axios";
import {baseUrlApi} from "../constants/genConstant";
import Notification from "../ui/Notification";
import ConfirmActivityIndicator from "../ui/ConfirmActivityIndicator";


const AddType: React.FC<any> = (props) => {

    const queryClient = useQueryClient();

    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean> (false);

    const mutation = useMutation('types', (data) => axios.post(`${baseUrlApi}/type`, data),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries('typeIncomes');
                queryClient.invalidateQueries('typeExpenses');
            },
            onError: (data, variables) => {},
            onMutate: () => {}
        })



    return (
        <>
            <View style={style.container}>

                <Animatable.View duration={600} useNativeDriver={true} delay={600} animation={"bounceIn"}
                                 easing={"ease-in"}>
                    <Feather onPress={() => props.navigation.goBack()} name="arrow-left" size={30}
                             color={appConstant.COLORS.lightGray}/>
                </Animatable.View>

                <Animatable.View duration={600} useNativeDriver={true} delay={300} animation={"bounceIn"}
                                 easing={"ease-in"}>
                    <AntDesign name="pluscircleo" style={{textAlign: "center"}} size={64}
                               color={appConstant.COLORS.lightGray}/>
                </Animatable.View>

                <Animatable.View duration={300} useNativeDriver={true} delay={600} animation={"fadeInLeft"}
                                 easing={"ease-in"}>
                    <AppText style={style.title}>Create new {props.route.params.type} Category</AppText>
                </Animatable.View>


                <Animatable.View duration={300} useNativeDriver={true} delay={700} animation={"fadeInRight"}
                                 easing={"ease-in"}>
                    <AppText style={{textAlign: 'center'}}>Please create and describe a new custom category</AppText>

                    {
                        mutation.isError ?
                                <Notification type={"danger"}>
                                    {
                                      //  mutation.isError && mutation.error.response.data
                                    }
                                </Notification>
                             : null
                    }



                </Animatable.View>
            </View>

            <View style={style.container}>

                <Formik
                    initialValues={{title: '', description: ''}}
                    onSubmit={async values => {
                        // @ts-ignore
                        await mutation.mutateAsync({title: values.title, description: values.description, category_title: props.route.params.type});
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
                                    // disabled={typeSelector.loading || (!title || !description)}
                                     title={mutation.isLoading || isConfirmationModalVisible ? "Saving ..." : "Submit"}
                                    // title={"Submit"}
                                    onPress={handleSubmit}
                                />
                            </Animatable.View>

                            <ConfirmActivityIndicator visible={isConfirmationModalVisible} />
                        </>
                    )}


                </Formik>

            </View>
        </>
    )

}

export default AddType;

const style = StyleSheet.create({
    container: {
        paddingTop: 50,
        width: "100%",
        paddingHorizontal: 30,

    },
    notification: {
        backgroundColor: appConstant.COLORS.greenDark,
        borderRadius: 6,
        padding: 15,
        marginVertical: 10
    },
    errorMessage: {
        color: appConstant.COLORS.red,
        textAlign: "center",
        marginVertical: 12
    },
    title: {
        fontSize: appConstant.SIZE.large,
        textAlign: "center",
        marginVertical: 10
    }
});
