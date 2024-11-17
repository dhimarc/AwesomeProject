import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateData = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa2';
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  const submit = () => {
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      kelas: kelas,
      gender: gender,
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
        console.log(json);
        alert('Data tersimpan');
        setFirstName('');
        setLastName('');
        setEmail('');
        setKelas('');
        setGender('');
      })
      .catch((error) => {
        console.error(error);
        alert('Terjadi kesalahan saat menyimpan data');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Tambah Data Mahasiswa</Text>
        <ScrollView contentContainerStyle={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nama Depan"
            value={first_name}
            onChangeText={(value) => setFirstName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nama Belakang"
            value={last_name}
            onChangeText={(value) => setLastName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Kelas"
            value={kelas}
            onChangeText={(value) => setKelas(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Jenis Kelamin"
            value={gender}
            onChangeText={(value) => setGender(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Button title="Simpan" onPress={submit} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
});