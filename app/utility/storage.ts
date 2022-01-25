import * as SecureStore from 'expo-secure-store';
//import EncryptedStorage from 'react-native-encrypted-storage';
// import * as SecureStore  from './ExpoSecureStore';


// saving value
const saveAccessToken = async (value: string) => {

    try {
        await SecureStore.setItemAsync("token", value);
        // savedTime: DateTime.now().toString()
    } catch (e) {
        console.log("Cannot set the token", e);
    }
}

const saveRefreshToken = async (value: string) => {
    try {
        await SecureStore.setItemAsync("refreshToken", value
        );

    } catch (e) {
        console.log("Cannot set refresh token")
    }
}

// get value
const getToken = async () => {

    try {
        return await SecureStore.getItemAsync("token");
    } catch (e) {
        console.log("can't get requested token", e);
    }
}

const getRefreshToken = async () => {

    try {
        return await SecureStore.getItemAsync("refreshToken");
    } catch (e) {
        console.log("can't get requested refreshToken", e);
    }
}

// delete value
const deleteToken = async () => {
    try {
        await SecureStore.deleteItemAsync("token");
        // console.log(`Token deleted successfully`)
    } catch (e) {
        console.log("cannot delete tokens ", e);
    }
}

const deleteRefreshToken = async () => {
    try {
        await SecureStore.deleteItemAsync("refreshToken");
    } catch (e) {
        console.log("cannot delete refreshTokens ", e);
    }
}

export default {
    saveToken: saveAccessToken,
    getToken,
    deleteToken,
    saveRefreshToken,
    getRefreshToken,
    deleteRefreshToken
};
