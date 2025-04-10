import React, { createContext, useState, useEffect } from 'react';

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [categories] = useState([
    'Makanan', 
    'Transportasi', 
    'Belanja', 
    'Hiburan',
    'Kesehatan',
    'Pendidikan',
    'Lainnya'
  ]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: parseFloat(transaction.amount) // Ensure amount is always number
    };
    
    console.log('Adding transaction:', newTransaction);
    
    setTransactions(prevTransactions => {
      const updatedTransactions = [...prevTransactions, newTransaction];
      console.log('Updated transactions:', updatedTransactions);
      return updatedTransactions;
    });

    // Update balance immediately
    setBalance(prevBalance => {
      const newBalance = newTransaction.type === 'pemasukan' 
        ? prevBalance + newTransaction.amount
        : prevBalance - newTransaction.amount;
      console.log('New balance:', newBalance);
      return newBalance;
    });
  };

  useEffect(() => {
    // Re-calculate balance whenever transactions change
    const calculatedBalance = transactions.reduce((total, t) => {
      const amount = typeof t.amount === 'number' ? t.amount : parseFloat(t.amount);
      return t.type === 'pemasukan' 
        ? total + amount 
        : total - amount;
    }, 0);
    
    console.log('Recalculated balance:', calculatedBalance);
    setBalance(calculatedBalance);
  }, [transactions]);

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const getBalance = () => {
    return balance;
  };

  return (
    <TransactionContext.Provider 
      value={{
        transactions,
        categories,
        balance,
        addTransaction,
        deleteTransaction,
        getBalance
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
