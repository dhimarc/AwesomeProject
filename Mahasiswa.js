import React from 'react'
import Datamahasiswa from './data/Mahasiswa.json'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';

const Mahasiswa = () => {
 return (
   <FlatList
     data={Datamahasiswa}
     renderItem={({ item }) => (
       <TouchableOpacity
         onPress={() =>
           Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)} >
         <View style={styles.card}> 
           <View style={styles.avatar}>
             <FontAwesomeIcon icon={faUserGraduate} size={50} color={item.gender =='male' ? 'blue' : 'yellow'} />
           </View>
           <View>
             <Text>{item.first_name} {item.last_name}</Text>
             <Text>{item.gender}</Text>
             <Text>Kelas {item.class}</Text>
             <Text>{item.latitude}, {item.longitude}</Text>
           </View>
         </View>
       </TouchableOpacity>
     )}
   />

 )
}

export default Mahasiswa

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center', // Menjaga komponen tetap sejajar vertikal di tengah
      padding: 15,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    avatar: {
      borderRadius: 40, // Membuat lingkaran sesuai ukuran width
      width: 80,
      height: 80,
      marginBottom: 5,
      marginRight: 5, // Memberikan jarak antara avatar dan teks di sebelah kanan
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center', // Mengatur teks agar berada di tengah secara vertikal
    },
    nameText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    detailText: {
      fontSize: 12,
      color: 'grey',
      marginBottom: 2,
    },
  });
  
  
   