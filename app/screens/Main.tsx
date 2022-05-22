import React, {useEffect, useState, useContext} from 'react';

import jwtDecode from "jwt-decode";

import storage from "../utility/storage";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigator";
import axios from "../api/axios";

import {useMutation} from "react-query";
import useAuth from "../hooks/useAuth";

const Main: React.FC<any> = (props) => {

    //@ts-ignore
    const {auth, setAuthData} = useAuth;

    useEffect(() => {
    }, [auth]);

    // mutation to generate a token from the refresh one
    //@ts-ignore
    const tokenMutation = useMutation((data) => axios.delete(`/auth/logout/`, data), {
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

            //@ts-ignore
            const token = await storage.getToken();


        } catch (e) {
            console.log(e.message);
        }
    }

    return (!auth ? <AuthNavigation/> : <MainNavigation/>);
}

export default Main;
