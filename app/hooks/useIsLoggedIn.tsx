import {useContext} from "react";
import IsLoggedInContext from "../context/IsLoggedInContext";

const useIsLoggedIn: any = () => {
    return useContext(IsLoggedInContext);
}

export default useIsLoggedIn;
