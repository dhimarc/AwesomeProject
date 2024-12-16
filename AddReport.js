import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const AddReport = () => {
  const jsonUrl = 'http://10.0.2.2:3000/reports'; // Ganti URL sesuai konfigurasi JSON server
  const [reportType, setReportType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const submitReport = () => {
    const data = {
      type: reportType,
      location: location,
      description: description,
      timestamp: new Date().toISOString(),
    };

    fetch(jsonUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        alert('Data berhasil ditambahkan');
        setReportType('');
        setLocation('');
        setDescription('');
      })
      .catch((error) => {
        console.error(error);
        alert('Terjadi kesalahan saat menyimpan data');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Tambah Laporan Kasus</Text>
        <ScrollView contentContainerStyle={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Jenis Kasus (Deforestasi, Kebakaran, dll)"
            value={reportType}
            placeholderTextColor="#C7C7CC"
            onChangeText={(value) => setReportType(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Lokasi Kasus"
            value={location}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={(value) => setLocation(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Deskripsi"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
          <TouchableOpacity style={styles.button} onPress={submitReport}>
            <Text style={styles.buttonText}>Tambah Laporan</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#FFFFFF',
  },
  form: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(204, 204, 204, 0.2)',
    borderRadius: 8,
    color: '#C7C7CC',
    padding: 10,
    marginVertical: 8,
    backgroundColor: 'rgba(46, 46, 46, 0.9)',
  },
  button: {
    backgroundColor: '#2196F3', // Biru pastel
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
