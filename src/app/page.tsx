"use client";

import { db } from "@/db";
import Transaction from "@/db/transaction";
import { useObservable } from "dexie-react-hooks";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useObservable(db.cloud.currentUser);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    refreshTransactions();
  }, [user]);

  const refreshTransactions = async () => {
    const transactions = await db.transactions.toArray();
    setTransactions(transactions);
  };

  const handleAddTransacton = async () => {
    await db.transactions.add({
      amount: 100,
      transaction_date: new Date(),
      type: "income",
      description: "Test",
      nfc_e_number: "123",
      category_id: 1,
    });

    refreshTransactions();
  };

  return (
    <div className="flex flex-col gap-4">
      {user?.isLoggedIn ? (
        <button className="btn btn-secondary" onClick={() => db.cloud.logout()}>
          Logout
        </button>
      ) : (
        <Link className="btn btn-secondary" href="/login">
          Login
        </Link>
      )}
      <button className="btn btn-primary" onClick={handleAddTransacton}>
        Add Transaction
      </button>
      <div className="grid grid-cols-3 gap-4">
        {transactions.map((transaction) => (
          <div className="p-4 border border-zinc-100" key={transaction.id}>
            <p>{transaction.amount}</p>
            <p>{transaction.transaction_date.toString()}</p>
            <p>{transaction.type}</p>
            <p>{transaction.description}</p>
            <p>{transaction.nfc_e_number}</p>
            <p>{transaction.category_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
