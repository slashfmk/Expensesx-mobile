import React, {createContext, useContext, useMemo, useState} from 'react';
import ITransaction from "../interfaces/ITransaction";

const TransactionsContext = createContext([]);

const TransactionsProvider: React.FC = (props) => {

    const [transactions, setTransactions] = useState<ITransaction []>([]);

    const addTransaction = (newTransaction: ITransaction) => {
        setTransactions([...transactions, newTransaction]);
    }
    // const deleteTransaction = (transactionToDelete: ITransaction) => {
    //     setTransactions(
    //         transactions.filter((transactionItem: ITransaction) => transactionItem.transactionId != transactionToDelete.transactionId)
    //     );
    // }

    const modifyTransaction = (transactionToModify: ITransaction) => {

        // transactions.map((transactionItem: ITransaction, index) => {
        //     if(transactionItem.transactionId === transactionToModify.transactionId) return transactionToModify;
        // }
        setTransactions([...transactions, transactionToModify]);
    }

    const finalValues = useMemo(() => ({transactions, setTransactions, modifyTransaction}), [transactions]);

    // @ts-ignore
    return <TransactionsContext.Provider value={finalValues}>
        {props.children}
    </TransactionsContext.Provider>

}

export {TransactionsContext, TransactionsProvider}
