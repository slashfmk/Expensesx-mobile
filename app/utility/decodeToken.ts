import jwtDecode from 'jwt-decode';
import storage from "./storage";

export const decodeToken = (token: string) => {
    console.log(jwtDecode(token));
    return jwtDecode(token);
}

// export const extractToken = () => {
//     decodeToken()
//     return ({username, email, firstName})
// }
