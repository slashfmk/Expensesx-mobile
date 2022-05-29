import React, {createContext, useState, useMemo} from 'react';
import IAuth from "../interfaces/IAuth";

//@ts-ignore
const AuthContext = createContext({});

export const AuthProvider: React.FC = ({children}) => {

    const [auth, setAuth] = useState();
    const authValue = useMemo(() => ({auth, setAuth}), [auth]);
    //@ts-ignore
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
