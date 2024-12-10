import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Listdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa2';
  const [dataUser, setDataUser] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setDataUser(json))
      .catch((error) => console.error(error));
  };

  const startEdit = (item) => {
    setEditMode(true);
    setEditId(item.id);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setKelas(item.kelas);
    setGender(item.gender);
    setEmail(item.email);
  };

  const updateData = () => {
    const data = { first_name, last_name, kelas, gender, email };
     fetch(`${jsonUrl}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil diperbarui');
        fetchData();
        resetForm();
      })
      .catch(() => Alert.alert('Error', 'Gagal memperbarui data'));
  };

  const deleteData = (id) => {
    Alert.alert('Konfirmasi', 'Yakin hapus data ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        onPress: () =>
          fetch(`${jsonUrl}/${id}`, { method: 'DELETE' })
            .then(() => {
              Alert.alert('Sukses', 'Data berhasil dihapus');
              fetchData();
            })
            .catch(() => Alert.alert('Error', 'Gagal menghapus data')),
      },
    ]);
  };

  const resetForm = () => {
    setEditMode(false);
    setEditId(null);
    setFirstName('');
    setLastName('');
    setKelas('');
    setGender('');
    setEmail('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {editMode ? (
        <View>
          <Text style={styles.title}>Edit Data</Text>
          <ScrollView contentContainerStyle={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nama Depan"
              value={first_name}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Nama Belakang"
              value={last_name}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Kelas"
              value={kelas}
              onChangeText={setKelas}
            />
            <TextInput
              style={styles.input}
              placeholder="Jenis Kelamin"
              value={gender}
              onChangeText={setGender}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.actionButtons}>
              <Button title="Update" onPress={updateData} />
              <Button title="Batal" color="red" onPress={resetForm} />
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Daftar Mahasiswa</Text>
          <FlatList
            data={dataUser}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text style={styles.cardDetails}>Kelas: {item.kelas}</Text>
                  <Text style={styles.cardDetails}>Gender: {item.gender}</Text>
                  <Text style={styles.cardDetails}>Email: {item.email}</Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[styles.actionIcon, { backgroundColor: '#4CAF50' }]}
                    onPress={() => startEdit(item)}
                  >
                    <FontAwesomeIcon icon={faUserEdit} size={18} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionIcon, { backgroundColor: '#F44336' }]}
                    onPress={() => deleteData(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Listdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  form: {
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
});