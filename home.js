import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLinkedin, faGithub, faGlobe, faCloud, faHouseTsunami, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
  <View style={styles.headerBackground}>
    <Image source={require('./assets/tecto2.png')} style={styles.logo} />
    <Text style={styles.appName}>TectoSense</Text>
    <Text style={styles.subtitle}>
      Tectona Grandis Environmental Monitoring and Reporting System
    </Text>
  </View>
</View>


      {/* Overview Section */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.sectionText}>
            TectoSense adalah sistem pemantauan dan pelaporan lingkungan yang dirancang untuk menganalisis perubahan lingkungan, khususnya berbasis citra satelit dan data geospasial.
          </Text>
        </View>

        {/* Fitur Utama */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <FontAwesomeIcon icon={faGlobe} size={40} color="#4CAF50" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Analisis NDFI</Text>
            <Text style={styles.cardText}>Menyediakan analisis Normalized Difference Fraction Index (NDFI) untuk deteksi perubahan lahan setiap tahun.</Text>
          </View>
          <View style={styles.card}>
            <FontAwesomeIcon icon={faHouseTsunami} size={40} color="#2196F3" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Kelola Data</Text>
            <Text style={styles.cardText}>Tambah dan kelola data pelaporan lingkungan secara mudah dan efisien.</Text>
          </View>
        </View>

        {/* Komponen Pembuat */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Komponen Pembuat</Text>
          <View style={styles.iconList}>
            <View style={styles.iconItem}>
              <FontAwesomeIcon icon={faCloud} size={30} color="#4CAF50" />
              <Text style={styles.iconText}>Leaflet.js</Text>
            </View>
            <View style={styles.iconItem}>
              <FontAwesomeIcon icon={faCloud} size={30} color="#FF9800" />
              <Text style={styles.iconText}>GeoServer</Text>
            </View>
            <View style={styles.iconItem}>
              <FontAwesomeIcon icon={faCloud} size={30} color="#9C27B0" />
              <Text style={styles.iconText}>React Native</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#333333',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#444444',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  iconList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconItem: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 5,
  },

  header: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    overflow: 'hidden',
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'linear-gradient(90deg, #4CAF50, #2196F3)', // Hanya untuk web
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  
});
