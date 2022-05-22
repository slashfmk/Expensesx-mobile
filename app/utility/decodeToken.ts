import jwtDecode from 'jwt-decode';

export const decodeToken = (token: any) => {
    console.log(jwtDecode(token));
    return jwtDecode(token);
}

