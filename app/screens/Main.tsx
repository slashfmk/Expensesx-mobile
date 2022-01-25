import React, {useEffect, useState, useContext} from 'react';

import jwtDecode from "jwt-decode";
//import axiosDefault from "../utility/axiosConfig";

const axiosR = require('../utility/axiosConfig');

import luxon, {DateTime} from "luxon";

import {AuthContext} from "../context/AuthContext";
import IAuth from "../interfaces/IAuth";

import storage from "../utility/storage";
import AuthNavigation from "../navigation/AuthNavigation";
import authToken from "../utility/storage";
import MainNavigation from "../navigation/MainNavigator";
import axios from "axios";

import {baseUrlApi} from '../constants/genConstant';
import {useMutation} from "react-query";

const Main: React.FC<any> = (props) => {

    //axiosDefault();
    axiosR;
    //@ts-ignore
    const {auth, setAuthData} = useContext(AuthContext);

    useEffect(() => {
        getTkn();
    }, []);

    useEffect(() => {
    }, [auth]);

    // mutation to geneate a token from the refresh one
    //@ts-ignore
    const tokenMutation = useMutation((data) => axios.delete(`${baseUrlApi}/auth/logout/`, data), {
        onSuccess: async (data) => {
            console.log('Log out successfully');
            await storage.deleteToken();
            await storage.deleteRefreshToken();
            setAuthData(null);
        },
        onError: async (error, variables) => {
            await storage.deleteToken();
            await storage.deleteRefreshToken();
            setAuthData(null);
        }
    });


    const getTkn = async () => {
        try {
          //  const foundToken = await authToken.getToken();

            // Tokens read
            //@ts-ignore
            const token = await storage.getToken();
            //@ts-ignore
            const refreshToken = await storage.getRefreshToken();

            if (refreshToken != null) {

                //@ts-ignores
                // const startTime = (DateTime.fromISO(refreshTokenLastLogin)); // get stored time
                // const endTime = DateTime.now(); // get current time
                // const daysDiff = endTime.diff(startTime, ["seconds", "days", "months", "minute"]); // get the difference
                // //@ts-ignore
                // const {minutes: diffMinutes, days: diffDays} = daysDiff.toObject(); // extract seconds from the object
                // console.log(daysDiff.toObject());

                console.log(refreshToken);

                // @ts-ignore
                if (diffDays >= 365) {
                    await storage.deleteToken();
                    await storage.deleteRefreshToken();
                    setAuthData(null);
                } else {


                    const userInfo: IAuth = {
                        //@ts-ignore
                        firstName: jwtDecode(foundToken.getToken).firstname,
                        //@ts-ignore
                        lastName: jwtDecode(foundToken.getToken).lastname,
                        //@ts-ignore
                        email: jwtDecode(foundToken.getToken).email,
                        //@ts-ignore
                        username: jwtDecode(foundToken.getToken).username,
                        //@ts-ignore
                        role: jwtDecode(foundToken.getToken).role,
                        //@ts-ignore
                        status: jwtDecode(foundToken.getToken).is_active,
                        //@ts-ignore
                        token: token
                    }
                    setAuthData(userInfo);
                }

            }

        } catch (e) {
            console.log(e.message);
        }

    }

    return (
        <>
            {!auth ? <AuthNavigation/> : <MainNavigation/>}
        </>
    );
}

export default Main;
