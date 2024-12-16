// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginPage from './Login';
// import CrudMahasiswaNav from './CrudMahasiswaNav';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={LoginPage} />
//       <Stack.Screen name="CrudMahasiswaNav" component={CrudMahasiswaNav} />
//     </Stack.Navigator>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Login';
import CrudMahasiswaNav from './CrudMahasiswaNav';
import AddReport from './AddReport';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="CrudMahasiswaNav" component={CrudMahasiswaNav} />
        <Stack.Screen name="Tambah Laporan" component={AddReport} />
      </Stack.Navigator>
    </NavigationContainer>
  )};