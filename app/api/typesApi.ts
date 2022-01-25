import axios from "axios";
import {baseUrlApi} from "../constants/genConstant";

const getAllTypes = async () => {
    const response = await axios.get(`${baseUrlApi}/type/`, {});
    return response.data;
}

const getIncomeTypes = async () => {
    const response = await axios.get(`${baseUrlApi}/type/incomes`, {});
    return response.data;
}

const getExpensesTypes = async () => {
    const response = await axios.get(`${baseUrlApi}/type/expenses`, {});
    return response.data;
}

const deleteType = async (id: string) => {
    const response = await axios.delete(`${baseUrlApi}/type/${id}`, {});
    return response.data;
}

const addType = async (
    title: string,
    description: string,
    category_title: "expenses  | incomes"
) => {
    const response = await axios.post(`${baseUrlApi}/type/`, {title, description, category_title});
    return response.data;
}

export default ({getAllTypes, deleteType, addType, getIncomeTypes, getExpensesTypes});
