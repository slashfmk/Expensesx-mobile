
export default interface ITransaction {
    transaction_id: string;
    title: string;
    description: string;
    amount: number;
    comment?: string;
    satisfaction: "neutral" | "bad" | "excellent";
    type: string;
    category: string;
  //  date: string;
    created_time: string;
    created_date: string;
}
