import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate, faPlusCircle, faUserPen, faMap, faUserAstronaut, faReceipt } from '@fortawesome/free-solid-svg-icons'; // Tambah icon peta
// import Profil from './App';
import Mahasiswa from './List_data';
import CreateData from './CreateData';
import EditData from './EditData';
import Mapview from './Mapview'; 
import AddReport from './AddReport'; 
import ListReports from './ListReport';
import App2 from './App2';


function Profile() {
  return <App2 />;
}

function HomeScreen() {
  return <AddReport />;
}

function ReportListScreen() {
  return <ListReports />;
}

function EditScreen() {
  return <EditData />;
}

function MapScreen() {
  return <Mapview />;  // Menampilkan MapView
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF', // Warna ikon dan teks tab aktif (putih)
          tabBarInactiveTintColor: '#C7C7CC', // Warna ikon dan teks tab tidak aktif (abu-abu terang)
          tabBarStyle: {
            backgroundColor: '#2E2E2E', // Latar belakang Bottom Tab menjadi #2E2E2E
            borderTopWidth: 0, // Menghilangkan garis batas atas tab
            paddingBottom: 5, // Menambahkan padding bawah agar tab tidak terlalu rapat
            shadowColor: '#000', // Warna bayangan hitam
            shadowOffset: { width: 0, height: -3 }, // Bayangan lebih kecil ke atas
            shadowOpacity: 0.2, // Opasitas bayangan rendah untuk efek halus
            shadowRadius: 6, // Radius bayangan agar menyebar dengan halus
            elevation: 10, // Bayangan lebih jelas di Android
          },
        }}
      >

      
        <Tab.Screen
          name="Tambah Data"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#2E2E2E', // Latar belakang header atas yang sama dengan Bottom Tab
            },
            headerTintColor: '#FFFFFF', // Warna teks header
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faPlusCircle} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Daftar Pelaporan"
          component={ReportListScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#2E2E2E',
            },
            headerTintColor: '#FFFFFF',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faReceipt} color={color} size={20} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Edit Data"
          component={EditScreen}
          options={{
            headerStyle: {
              backgroundColor: '#2E2E2E',
            },
            headerTintColor: '#FFFFFF',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserPen} color={color} size={20} />
            ),
          }}
        /> */}
        {/* Menambahkan Mapview sebagai tab baru */}
        <Tab.Screen
          name="Peta"
          component={MapScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#2E2E2E',
            },
            headerTintColor: '#FFFFFF',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMap} color={color} size={20} />
            ),
          }}
        />

<Tab.Screen
          name="Developer"
          component={Profile}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#2E2E2E', // Latar belakang header atas yang sama dengan Bottom Tab
            },
            headerTintColor: '#FFFFFF', // Warna teks header
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserAstronaut} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}
