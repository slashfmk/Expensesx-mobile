import axios, {AxiosResponse} from "axios";
import {baseUrlApi} from "../constants/genConstant";


const authSignIn = async (email: string, password: string) => {

    try {
        const result: AxiosResponse<any> = await axios.post(`${baseUrlApi}/auth/signin/`, {
            email: email,
            password: password
        });
        return result.data;
    } catch (e) {
        console.log(e.response);
        throw new Error(e.response);
    }
}

const authSignUp = async (firstname: string, lastname: string, email: string, password: string, repeat_password: string) => {

    try {
        const result: AxiosResponse<any> = await axios.post(`${baseUrlApi}/auth/signup/`, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            repeat_password: repeat_password
        });
        return result.data;

    } catch (e) {
        console.log(e.response);
        throw new Error(e.response);
    }
}

export default {authSignIn, authSignUp};
