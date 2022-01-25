import React from 'react';
import {useQuery} from 'react-query';
import axios, {AxiosResponse,} from 'axios';
import {baseUrlApi} from '../constants/genConstant';

const useApiQuery = async (url: string, method: "post" | "get" | "delete" | "patch" | "put" | string, param: any) => {

    try {
        let query: AxiosResponse<any>;

        if (method === "get") {
            query = await axios.get(`${baseUrlApi}/${url}`, param);
        } else if (method === "post") {
            query = await axios.post(`${baseUrlApi}/${url}`, param);
        } else if (method === "delete") {
            query = await axios.delete(`${baseUrlApi}/${url}`, param);
        } else if (method === "put") {
            query = await axios.put(`${baseUrlApi}/${url}`, param);
        } else if (method === "patch") {
            query = await axios.patch(`${baseUrlApi}/${url}`, param);
        } else {
            query = await axios.get(`${baseUrlApi}/${url}`, param);
        }

        const {data, isLoading, isError, error} = useQuery(`data`, async () => query);

        return ({data, isLoading, isError, error});

    } catch (e) {
        console.log("Error occurs while sending request");
    }

}

export default useApiQuery;
