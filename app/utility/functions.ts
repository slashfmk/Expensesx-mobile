import ITransaction from "../interfaces/ITransaction";
import IWeeklyReportItem from "../interfaces/IWeeklyReportItem";
import IExpensesMonth from "../interfaces/IExpensesMonth";

// Calculate the total income, expense and balance
const bulkTotals = (transactions: ITransaction[]) => {
    let totalIncome: number = 0;
    let totalExpenses: number = 0;
    let balance: number = 0;

    transactions.forEach((item: ITransaction) => {
        if (item.category === "incomes") {
            totalIncome += Number(item.amount);
        } else {
            totalExpenses += Number(item.amount);
        }
    });

    // for(let i: number = 0; i < transactions.length; i++) {
    //     if (transactions[i].category === "incomes") {
    //         totalIncome += Number(transactions[i].amount);
    //     } else {
    //         totalExpenses += Number(transactions[i].amount);
    //     }
    // }

    balance = totalIncome - totalExpenses;

    totalExpenses.toFixed(2);
    balance.toFixed(2);
    totalExpenses.toFixed(2);

    return ({
        totalIncome,
        totalExpenses,
        balance
    });
}


// week overview
const weekGraphData = (data: IWeeklyReportItem[]) => {

    let expenses: number [] = [0, 0, 0, 0, 0, 0, 0];
    let incomes: number [] = [0, 0, 0, 0, 0, 0, 0];

    data.forEach((item, i) => {
        if (item.day.trim() === "Monday") {
            if (item.types === "expenses") {
                expenses[0] += Number(item.total);
            } else {
                incomes[0] += Number(item.total);
            }
        } else if (item.day.trim() === "Tuesday") {
            if (item.types === "expenses") {
                expenses[1] += Number(item.total);
            } else {
                incomes[1] += Number(item.total);
            }
        } else if (item.day.trim() === "Wednesday") {
            if (item.types === "expenses") {
                expenses[2] += Number(item.total);
            } else {
                incomes[2] += Number(item.total);
            }
        } else if (item.day.trim() === "Thursday") {
            if (item.types === "expenses") {
                expenses[3] += Number(item.total);
            } else {
                incomes[3] += Number(item.total);
            }
        } else if (item.day.trim() === "Friday") {
            if (item.types === "expenses") {
                expenses[4] += Number(item.total);
            } else {
                incomes[4] += Number(item.total);
            }
        } else if (item.day.trim() === "Saturday") {
            if (item.types === "expenses") {
                expenses[5] += Number(item.total);
            } else {
                incomes[5] += Number(item.total);
            }
        } else if (item.day.trim() === "Sunday") {
            if (item.types === "expenses") {
                expenses[6] += Number(item.total);
            } else {
                incomes[6] += Number(item.total);
            }
        }

    });

    return ({expenses, incomes});
}

// Sort expenses only for the month
const sortExpenses = (data: IExpensesMonth[]): IExpensesMonth[] => {
    return data.filter(item => item.types === "expenses");
}

// const sortExpenses = (data: any) => {
//     return data.filter((item: any) => item.types === "expenses");
// }

export default ({sortExpenses, weekGraphData, bulkTotals});
