import React, {createContext, useMemo, useState} from 'react';
import ICategory from "../interfaces/ICategory";

export const CategoryContext = createContext([]);

export const CategoryProvide: React.FC = (props) => {

    const [categoryList, setCategoryList] = useState<ICategory[]>([]);

    const catValue = useMemo(() => ({categoryList, setCategoryList}), [categoryList]);

    //@ts-ignore
    return <CategoryContext.Provider value={catValue}>
        {props.children}
    </CategoryContext.Provider>
}
