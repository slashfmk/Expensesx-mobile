import React, {createContext, useState, useMemo} from 'react';

//@ts-ignore
const IsLoggedInContext = createContext({});

export const IsLoggedInProvider: React.FC = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
   // const authValue = useMemo(() => ({, setAuth}), [auth]);
    //@ts-ignore
    return (
        <IsLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </IsLoggedInContext.Provider>
    );
}

export default IsLoggedInContext;
