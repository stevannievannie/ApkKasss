import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';

export default function ReportScreen() {
  const { transactions, getBalance } = useContext(TransactionContext);

  const calculateSummary = () => {
    const income = transactions
      .filter(t => t.type === 'pemasukan')
      .reduce((total, t) => total + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'pengeluaran')
      .reduce((total, t) => total + t.amount, 0);

    return { income, expense };
  };

  const { income, expense } = calculateSummary();
  const balance = getBalance();

  const getCategorySummary = () => {
    const categoryMap = {};
    
    transactions.forEach(t => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = { income: 0, expense: 0 };
      }
      
      if (t.type === 'pemasukan') {
        categoryMap[t.category].income += t.amount;
      } else {
        categoryMap[t.category].expense += t.amount;
      }
    });

    return Object.entries(categoryMap).map(([category, amounts]) => ({
      category,
      ...amounts
    }));
  };

  const categorySummary = getCategorySummary();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laporan Keuangan</Text>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Pemasukan</Text>
          <Text style={[styles.summaryAmount, styles.income]}>
            Rp{income.toLocaleString('id-ID')}
          </Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Pengeluaran</Text>
          <Text style={[styles.summaryAmount, styles.expense]}>
            Rp{expense.toLocaleString('id-ID')}
          </Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Saldo Akhir</Text>
          <Text style={[
            styles.summaryAmount,
            balance >= 0 ? styles.income : styles.expense
          ]}>
            Rp{Math.abs(balance).toLocaleString('id-ID')}
          </Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Ringkasan per Kategori</Text>
      
      {categorySummary.map((item, index) => (
        <View key={index} style={styles.categoryItem}>
          <Text style={styles.categoryName}>{item.category}</Text>
          <View style={styles.categoryAmounts}>
            <Text style={styles.categoryIncome}>
              +Rp{item.income.toLocaleString('id-ID')}
            </Text>
            <Text style={styles.categoryExpense}>
              -Rp{item.expense.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#28a745',
  },
  expense: {
    color: '#dc3545',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
  },
  categoryAmounts: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
  },
  categoryIncome: {
    color: '#28a745',
    fontSize: 14,
  },
  categoryExpense: {
    color: '#dc3545',
    fontSize: 14,
  },
});
