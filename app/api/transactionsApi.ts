import axios from "axios";
import {baseUrlApi} from "../constants/genConstant";

const getTransactions = async () => {
        const response = await axios.get(`${baseUrlApi}/transactions/`, {});
        return response.data;
}

// current-month-transactions
const getCurrentMonthTransactions = async () => {
        const response = await axios.get(`${baseUrlApi}/transactions/current-month-transactions`, {});
        return response.data;
}

const getWeekSummary = async () => {
        const response = await axios.get(`${baseUrlApi}/transactions/this-week-summary`, {});
        return response.data;
}

const getMonthSummary = async () => {
        const response = await axios.get(`${baseUrlApi}/transactions/month-summary`, {});
        return response.data;
}

const deleteTransaction = async (id: string) => {
        const response = await axios.delete(`${baseUrlApi}/transactions/${id}`, {});
        return response.data;
}

const addTransaction = async (
    title: string,
    amount: string,
    type: string,
    satisfaction: string,
    comment?: string
) => {
    // try {
        const response = await axios.post(`${baseUrlApi}/transactions/`, {
            title, amount, type, satisfaction, comment
        });
        return response.data;
    // } catch (e) {
    //     //   console.log(e.response.data);
    //     return e.response
    // }
}

// @ts-ignore
export default ({getTransactions, getWeekSummary, deleteTransaction, addTransaction, getMonthSummary, getCurrentMonthTransactions});
