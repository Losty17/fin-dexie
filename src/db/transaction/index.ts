export default interface Transaction {
  id?: number;
  amount: number;
  transaction_date: Date;
  type: "income" | "expense";
  description: string;
  nfc_e_number: string;
  category_id: number;
}
