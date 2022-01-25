import React, {createContext, useState, useMemo} from 'react';
import IAuth from "../interfaces/IAuth";

//@ts-ignore
export const AuthContext = createContext(null);

export const AuthProvider: React.FC = (props) => {

    const [auth, setAuth] = useState<IAuth | null>();
    const setAuthData = (newData: IAuth | null) => {
        setAuth(newData);
    }

    const authValue = useMemo(() => ({auth, setAuthData}), [auth, setAuthData]);

    //@ts-ignore
    return <AuthContext.Provider value={authValue}>
        {props.children}
    </AuthContext.Provider>
}
