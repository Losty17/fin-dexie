"use client";

import { db } from "@/db";
import Transaction from "@/db/transaction";
import { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (deferredPrompt as any).prompt();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { outcome } = await (deferredPrompt as any).userChoice;
      setDeferredPrompt(null);
      setIsInstallable(false);
      console.log(`User response to the install prompt: ${outcome}`);
    }
  };

  return (
    <>
      {isInstallable && (
        <button onClick={handleInstallClick} className="install-button">
          Install App
        </button>
      )}
    </>
  );
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    refreshTransactions();
  }, []);

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
    <div className="">
      <InstallButton />
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <p>{transaction.amount}</p>
          <p>{transaction.transaction_date.toString()}</p>
          <p>{transaction.type}</p>
          <p>{transaction.description}</p>
          <p>{transaction.nfc_e_number}</p>
          <p>{transaction.category_id}</p>
          <hr />
        </div>
      ))}
      <button onClick={handleAddTransacton}>Add Transaction</button>
    </div>
  );
}
