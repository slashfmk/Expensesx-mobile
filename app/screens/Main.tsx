import React, {useEffect, useState, useContext} from 'react';

import storage from "../utility/storage";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigator";
import useRefreshToken from "../hooks/useRefreshToken";

import useIsLoggedIn from "../hooks/useIsLoggedIn";

import useAuth from "../hooks/useAuth";
import IsLoggedInContext from "../context/IsLoggedInContext";

const Main: React.FC<any> = (props) => {

    //@ts-ignore
    const {auth} = useAuth;
    const refresh = useRefreshToken;
    //@ts-ignore
    const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);

    // const checkToken = async () => {
    //     try {
    //         //@ts-ignore
    //         const refreshToken = await storage.getRefreshToken();
    //
    //         if (refreshToken) {
    //             await refresh;
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    useEffect(() => {

        const startLogin = async () => {
            const refreshToken = await storage.getRefreshToken();

            if (refreshToken) {
                console.log(`Refresh token goes here: ${refreshToken}`);
                await refresh();
                setIsLoggedIn(true);
               // console.log(auth.accessToken);
            }}
        startLogin();
        }, []);


        // useEffect(() => {
        //    // console.log(auth);
        // }, [isLoggedIn]);

        return (isLoggedIn ? <MainNavigation/> : <AuthNavigation/>);
    }

    export default Main;
