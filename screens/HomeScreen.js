import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';

export default function HomeScreen() {
  const { getBalance } = useContext(TransactionContext);
  const balance = getBalance();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Aplikasi Kas Sederhana</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo Anda:</Text>
          <Text style={[
            styles.balanceAmount,
            { color: balance >= 0 ? '#28a745' : '#dc3545' }
          ]}>
            Rp{Math.abs(balance).toLocaleString('id-ID')}
          </Text>
          <Text style={styles.balanceNote}>
            {balance >= 0 ? 'Saldo positif' : 'Saldo negatif'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40'
  },
  balanceContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  balanceLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#495057'
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5
  },
  balanceNote: {
    fontSize: 14,
    color: '#6c757d'
  }
});
