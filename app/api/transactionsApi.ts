import {axiosPrivate} from "./axios";

const getTransactions = async () => {
        const response = await axiosPrivate.get(`/transactions/`, {});
        return response.data;
}

// current-month-transactions
const getCurrentMonthTransactions = async () => {
        const response = await axiosPrivate.get(`/transactions/current-month-transactions`, {});
        return response.data;
}

const getWeekSummary = async () => {
        const response = await axiosPrivate.get(`/transactions/this-week-summary`, {});
        return response.data;
}

const getMonthSummary = async () => {
        const response = await axiosPrivate.get(`/transactions/month-summary`, {});
        return response.data;
}

const deleteTransaction = async (id: string) => {
        const response = await axiosPrivate.delete(`/transactions/${id}`, {});
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
        const response = await axiosPrivate.post(`/transactions/`, {
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
