# TectoSense: Tectona Grandis Environmental Monitoring and Reporting System

## Deskripsi Produk
TectoSense adalah aplikasi monitoring lingkungan yang dirancang untuk menganalisis deforestasi di Kabupaten Blora. Aplikasi ini membantu melaporkan berbagai penyebab deforestasi, seperti:  
- Kebakaran hutan  
- Penebangan liar  
- Pohon roboh  

Selain itu, aplikasi ini menampilkan titik-titik laporan di peta interaktif, mempermudah pengguna untuk memahami pola deforestasi di area tertentu.

## Komponen Pembangun Produk
TectoSense dikembangkan dengan memanfaatkan berbagai teknologi modern, yaitu:  
1. **React Native**: Untuk membangun aplikasi mobile.  
2. **Leaflet.js**: Untuk menampilkan peta interaktif.  
3. **Thunder Client**: Sebagai alat untuk menguji API.  
4. **GitHub Pages**: Menyediakan hosting untuk file shapefile.  
5. **GeoServer**: Untuk pengelolaan dan penyajian data spasial.  

## Sumber Data
Aplikasi ini menggunakan citra satelit Landsat 8 dari berbagai tahun untuk mendeteksi perubahan tutupan lahan:
- Tahun 2013  
- Tahun 2016  
- Tahun 2019  
- Tahun 2022  
- Tahun 2024  

Analisis dilakukan berdasarkan perubahan *Normalized Difference Fraction Index* (NDFI) untuk memantau aktivitas deforestasi secara berkala.

## Fitur Utama
### 1. Analisis Deforestasi  
Mendeteksi perubahan tutupan lahan berdasarkan analisis citra satelit Landsat 8.  

### 2. Pelaporan Deforestasi  
Pengguna dapat melaporkan penyebab deforestasi, seperti kebakaran hutan, penebangan liar, atau pohon roboh melalui formulir interaktif.  

### 3. Visualisasi Peta Interaktif  
Titik-titik laporan akan divisualisasikan di peta interaktif menggunakan Leaflet.js, memungkinkan pemantauan lokasi spesifik.

## Tangkapan Layar Komponen Produk
Berikut beberapa tangkapan layar penting dari aplikasi TectoSense:  

### 1. Halaman Utama  
<img src="./assets/homepage.png" alt="Halaman Utama" width="200"/>  

### 2. Peta dengan Titik Laporan  
<img src="./assets/plot.png" alt="Peta Titik Laporan" width="200"/>  

### 3. Formulir Pelaporan  
<img src="./assets/add.png" alt="Formulir Pelaporan" width="200"/>  

### 4. Analisis Perubahan Tutupan Lahan  
<img src="./assets/analisis.png" alt="Analisis Perubahan Tutupan Lahan" width="200"/>  

### 5. Profil Pengguna  
<img src="./assets/profil.png" alt="Profil Pengguna" width="200"/>  

### 6. Halaman Login  
<img src="./assets/login.png" alt="Halaman Login" width="200"/>  

## Cara Mengakses Repository
Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:  

1. Clone repository ini:
   ```bash
   git clone https://github.com/dhimarc/AwesomeProject.git
