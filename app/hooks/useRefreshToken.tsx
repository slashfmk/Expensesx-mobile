
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken =  () => {
    const {setAuth} = useAuth();

    return async () => {
        const response = await axios.get(`/auth/refresh/`, {
            withCredentials: true
        });
        //@ts-ignore
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {...prev, accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    };
}

export default useRefreshToken;
