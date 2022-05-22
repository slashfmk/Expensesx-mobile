import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const useAuth: any = () => {
    return useContext(AuthContext);
}

export default useAuth;
