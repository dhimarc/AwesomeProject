import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '' || email === '') {
      Alert.alert('Error', 'Semua kolom harus diisi!');
    } else {
      // Beralih ke halaman CrudMahasiswaNav
      navigation.navigate('CrudMahasiswaNav');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Image placed outside the card */}
      <Image
        source={require('./assets/tecto2.png')}  // Replace with your image path
        style={styles.logo}
      />
      <View style={styles.card}>
        <Text style={styles.title}>TECTOSENSE</Text>
        <ScrollView contentContainerStyle={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} color="#4CAF50" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  logo: {
    width: 120,  // Adjust the logo size
    height: 120,
    resizeMode: 'contain', // Keep aspect ratio of the image
    marginBottom: 20, // Add some space below the image
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(46, 46, 46, 0.9)',
    padding: 20,
    borderRadius: 10,
    // Removed shadow properties
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
  buttonContainer: {
    marginVertical: 10,
  },
});
