import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}
type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionContextProps {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}
const TransactionContext = createContext<TransactionContextProps>(
  {} as TransactionContextProps
);

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api("/transactions").then((response) =>
      setTransactions(response.data.transactions)
    );
  }, []);

  async function createTransaction(transactionInpunt: TransactionInput) {
    const response = await api.post("transactions", {
      ...transactionInpunt,
      createdAt: new Date()
    });
    const { transaction } = response.data

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionContext.Provider value={{ createTransaction, transactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransactions(){
  const context = useContext(TransactionContext)

  return context
}