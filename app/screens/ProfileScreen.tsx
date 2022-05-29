import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View, StyleSheet, ImageBackground, SafeAreaView, StatusBar} from "react-native";
import * as Animatable from 'react-native-animatable';

import {useFocusEffect} from '@react-navigation/native';

//import {AppLoading} from "expo";
import useMyFont from "../hooks/useMyFonts";

import * as Constants from '../constants/appConstants';
import ImageCircle from "../ui/ImageCircle";
import ListItem from "../ui/listItem";
import Block from "../ui/Block";
import navConstants from "../constants/navConstants";
import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";

import AuthContext from "../context/AuthContext";

//import constantxs from '../constants/genConstant';

import wordHelper from '../utility/wordHelper';


const uLink: string = "https://images.unsplash.com/photo-1567303314286-6735a4ad9d42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1603&q=80";


// Page holding profile info
const ProfileScreen: React.FC = (props) => {

    const [loadFonts, setLoadFonts] = useState<boolean>(false);
    //@ts-ignore
    const {auth, setAuthData} = useContext(AuthContext);

    useEffect(() => {
    }, [auth]);


    // if (!loadFonts) {
    //     return (
    //         <AppLoading startAsync={useMyFont} onFinish={() => setLoadFonts(true)}/>
    //     );
    // }

    const handleLogout = async () => {
        // setAuthData(null);
        // await storage.deleteToken();
    }

    // @ts-ignore
    return (
        <ImageBackground style={style.container} imageStyle={{opacity: .1}} source={{uri: uLink}}>
            <StatusBar translucent barStyle={"light-content"}/>
            <SafeAreaView>

                <View style={style.subContainer}>

                    <Animatable.View animation={"zoomIn"} easing={"ease-in"} duration={500} useNativeDriver>
                        <ImageCircle url={uLink}/>
                    </Animatable.View>

                    <Animatable.View
                        animation={"fadeInDown"}
                        easing={"ease-in"}
                        duration={500}
                        style={style.heading}
                        useNativeDriver
                    >
                        <AppText style={style.heading}>
                            {auth && wordHelper.AllFirstLetterToUpperCase(auth.user.firstname)}
                            {auth && wordHelper.AllFirstLetterToUpperCase(auth.user.lastname)}
                        </AppText>

                    </Animatable.View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        backgroundColor: "#000",
                        width: "100%",
                        padding: 20
                    }}>
                        <AppText>234</AppText>
                        <AppText>567</AppText>
                    </View>


                    <Animatable.View
                        style={{width: "100%"}}
                        animation={"fadeInDown"}
                        easing={"ease-in"}
                        duration={500}
                        delay={100} useNativeDriver
                    >
                        <Block title={"Personal"} bgColor={"rgba(0,0,0,.4)"}>
                            <ListItem title={"Email"} subTitle={auth && auth.user.email}/>
                            <ListItem title={"Role"} subTitle={auth && auth.user.role}/>
                            <ListItem title={"Status"} subTitle={auth.user.status ? "Active" : "Inactive"}/>
                        </Block>
                    </Animatable.View>

                    <Animatable.View
                        animation={"fadeInUp"}
                        easing={"ease-in"}
                        duration={500}
                        delay={100}
                        useNativeDriver
                    >
                        <AppButton title={"Logout"} onPress={handleLogout}/>
                    </Animatable.View>

                </View>

            </SafeAreaView>
        </ImageBackground>
    );
}


export default ProfileScreen;

const style = StyleSheet.create({


    // The profile stuff
    container: {
        flex: 1,
        width: "100%",
        paddingTop: 30,
        backgroundColor: Constants.COLORS.secondary
    },
    subContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: StatusBar.currentHeight
    },
    heading: {
        fontFamily: "MontserratMedium",
        color: Constants.COLORS.white,
        fontSize: 27,
        fontWeight: "900",
        marginVertical: 10
    }
});
