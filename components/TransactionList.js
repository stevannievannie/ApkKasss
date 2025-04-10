import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';

export default function TransactionList({ transactions }) {
  const { deleteTransaction } = useContext(TransactionContext);

  const renderItem = ({ item }) => (
    <View style={[
      styles.transactionItem,
      { borderLeftColor: item.type === 'pemasukan' ? '#28a745' : '#dc3545' }
    ]}>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionCategory}>{item.category}</Text>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>
          {new Date(item.date).toLocaleDateString('id-ID')}
        </Text>
      </View>
      <View style={styles.transactionAmountContainer}>
        <Text style={[
          styles.transactionAmount,
          { color: item.type === 'pemasukan' ? '#28a745' : '#dc3545' }
        ]}>
          {item.type === 'pemasukan' ? '+' : '-'}Rp{item.amount.toLocaleString('id-ID')}
        </Text>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => deleteTransaction(item.id)}
        >
          <Text style={styles.deleteText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Transaksi</Text>
      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada transaksi</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderLeftWidth: 5,
    elevation: 1,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionCategory: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactionDescription: {
    color: '#6c757d',
    marginVertical: 3,
  },
  transactionDate: {
    color: '#6c757d',
    fontSize: 12,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 5,
    padding: 5,
  },
  deleteText: {
    color: '#dc3545',
    fontSize: 12,
  },
});
