
import axios from "../api/axios";
import useAuth from "./useAuth";
import storage from "../utility/storage";
import jwtDecode from "jwt-decode";
// import useIsLoggedIn from "./useIsLoggedIn";
import IsLoggedInContext from "../context/IsLoggedInContext";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const  useRefreshToken =  () => {
    //@ts-ignore
    const {auth, setAuth} = useContext(AuthContext);
    //@ts-ignore
    const {isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext);

    return async () => {
        const refreshToken = await storage.getRefreshToken();
        //  withCredentials: true,
        const response = await axios.post(`/auth/refresh/`,  {
            refreshToken: refreshToken
        });
        //@ts-ignore
        setAuth({
            user: jwtDecode(response.data.accessToken),
            accessToken: response.data.accessToken,
        });
       // setIsLoggedIn(true);
        console.log(auth);
        console.log(isLoggedIn);
        return response.data.accessToken;
    };
}

export default useRefreshToken;
