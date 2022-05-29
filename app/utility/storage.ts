import * as SecureStore from 'expo-secure-store';

const saveRefreshToken = async (value: string) => {
    try {
        await SecureStore.setItemAsync("refreshToken", value);
    } catch (e) {
        console.log("Cannot set refresh token")
    }
}

const getRefreshToken = async () => {
    try {
        return await SecureStore.getItemAsync("refreshToken");
    } catch (e) {
        console.log("can't get requested refreshToken", e);
    }
}

const deleteRefreshToken = async () => {
    try {
        await SecureStore.deleteItemAsync("refreshToken");
    } catch (e) {
        console.log("cannot delete refreshToken ", e);
    }
}

const checkStorage = async () => {
    return SecureStore.isAvailableAsync();
}

export default {
    checkStorage,
    saveRefreshToken,
    getRefreshToken,
    deleteRefreshToken
};
