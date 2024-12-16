import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const ListReports = () => {
  const jsonUrl = 'http://10.0.2.2:3000/reports';
  const [reports, setReports] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);  // Added state for refresh control

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setReports(json))
      .catch((error) => console.error(error))
      .finally(() => setIsRefreshing(false));  // Stop refreshing after fetching
  };

  const startEdit = (item) => {
    setEditMode(true);
    setEditId(item.id);
    setType(item.type);
    setLocation(item.location);
    setDescription(item.description);
  };

  const updateReport = () => {
    const updatedReport = { type, location, description };
    fetch(`${jsonUrl}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      timestamp: new Date().toISOString(),
      body: JSON.stringify(updatedReport),
    })
      .then(() => {
        Alert.alert('Sukses', 'Laporan berhasil diperbarui');
        fetchReports();
        resetForm();
      })
      .catch(() => Alert.alert('Error', 'Gagal memperbarui laporan'));
  };

  const deleteReport = (id) => {
    Alert.alert('Konfirmasi', 'Yakin hapus laporan ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        onPress: () =>
          fetch(`${jsonUrl}/${id}`, { method: 'DELETE' })
            .then(() => {
              Alert.alert('Sukses', 'Laporan berhasil dihapus');
              fetchReports();
            })
            .catch(() => Alert.alert('Error', 'Gagal menghapus laporan')),
      },
    ]);
  };

  const resetForm = () => {
    setEditMode(false);
    setEditId(null);
    setType('');
    setLocation('');
    setDescription('');
  };

  // Function to handle pull-to-refresh
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchReports();
  };

  return (
    <SafeAreaView style={styles.container}>
      {editMode ? (
        <View>
          <Text style={styles.title}>Edit Laporan</Text>
          <ScrollView contentContainerStyle={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Jenis Laporan"
              value={type}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              onChangeText={setType}
            />
            <TextInput
              style={styles.input}
              placeholder="Lokasi"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              style={styles.input}
              placeholder="Deskripsi"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#4CAF50' }]} // Green color for update
                onPress={updateReport}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF7F50' }]} // Orange color for cancel
                onPress={resetForm}
              >
                <Text style={styles.buttonText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.type}</Text>
                  <Text style={styles.cardDetails}>Lokasi: {item.location}</Text>
                  <Text style={styles.cardDetails}>Deskripsi: {item.description}</Text>
                  <Text style={styles.cardDetails}>
                    Waktu: {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[styles.actionIcon, { backgroundColor: '#4CAF50' }]}
                    onPress={() => startEdit(item)}
                  >
                    <FontAwesomeIcon icon={faEdit} size={18} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionIcon, { backgroundColor: '#FF7F50' }]}
                    onPress={() => deleteReport(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

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
    paddingBottom: 20,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(46, 46, 46, 0.9)',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 14,
    color: '#C7C7CC',
    marginBottom: 4,
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

export default ListReports;

