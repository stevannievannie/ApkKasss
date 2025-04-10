import React, { useState, useContext } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';
import TransactionList from '../components/TransactionList';

export default function TransactionScreen() {
  const { transactions, categories, addTransaction } = useContext(TransactionContext);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [type, setType] = useState('pemasukan');

  const handleSubmit = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Error', 'Masukkan jumlah yang valid');
      return;
    }

    addTransaction({
      amount: parseFloat(amount),
      description,
      category,
      type
    });

    setAmount('');
    setDescription('');
    Alert.alert('Sukses', 'Transaksi berhasil ditambahkan');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tambah Transaksi</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Jenis Transaksi</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'pemasukan' && styles.activeType]}
            onPress={() => setType('pemasukan')}
          >
            <Text style={[styles.typeText, type === 'pemasukan' && styles.activeTypeText]}>Pemasukan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'pengeluaran' && styles.activeType]}
            onPress={() => setType('pengeluaran')}
          >
            <Text style={[styles.typeText, type === 'pengeluaran' && styles.activeTypeText]}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Jumlah (Rp)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Masukkan jumlah"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Kategori</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryButton, category === cat && styles.activeCategory]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryText, category === cat && styles.activeCategoryText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Keterangan</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Masukkan keterangan"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Simpan Transaksi</Text>
      </TouchableOpacity>

      <TransactionList transactions={transactions} />
    </ScrollView>
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
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 2,
    borderRadius: 5,
  },
  activeType: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  typeText: {
    color: '#000',
  },
  activeTypeText: {
    color: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: 8,
    margin: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  activeCategory: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  categoryText: {
    color: '#000',
  },
  activeCategoryText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
