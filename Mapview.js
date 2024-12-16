
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const Mapview = () => {
  // URL GeoJSON yang diambil dari GeoServer
  const geojsonUrl = 'https://dhimarc.github.io/Kab_Blora/Kab_Blora.geojson';
  const wmsUrl = 'http://localhost:8080/geoserver/wms';
  const jsonUrl = 'http://10.0.2.2:3000/reports'; // Sesuaikan URL JSON server
  const [key, setKey] = useState(0); // State untuk key WebView

  const [refreshing, setRefreshing] = useState(false);
  // Fungsi untuk refresh
  const handleRefresh = () => {
    setKey(prevKey => prevKey + 1); // Perbarui key untuk memicu reload
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulasikan waktu pemuatan ulang data
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  


  // HTML yang akan dimuat di WebView untuk menampilkan peta dan data GeoJSON
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leaflet Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet-geotiff"></script>
  <script src="https://unpkg.com/georaster"></script>
  <script src="https://unpkg.com/georaster-layer-for-leaflet"></script>

  <style>
  body {
    height: 100vh;
    margin: 0;
  }
  
  #map {
    height: 100%;
  }

  .slider {
    background: white;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    font-size: 12px; /* Make the text smaller */
  }

  .legend {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    padding: 10px;
    font-size: 12px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 10px; /* Smaller label font size */
  }

  #yearSlider {
    width: 93px; /* Smaller slider width */
    height: 10px; /* Make the slider thinner */
  }

  .leaflet-control-layers {
    font-size: 5px; /* Reduce the font size in layer control */
  }
</style>

</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map').setView([-7.201361, 111.313779], 10);

    // Menambahkan GeoJSON dari GeoServer
    fetch('${geojsonUrl}')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          style: {
            color: '#8B0000',
            weight: 2,
            fillOpacity: 0
          }
        }).addTo(map);
      })
      .catch(error => console.log('Error loading GeoJSON data:', error));

    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    });

    var esriSatelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Esri, Maxar, Earthstar Geographics, and the GIS User Community'
    });

    var cartoDBPositron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors, © CartoDB'
    });

    var baseMaps = {
      "OpenStreetMap": osmLayer,
      "Satelit ESRI": esriSatelite,
      "CartoDB Positron": cartoDBPositron
    };

    esriSatelite.addTo(map);

    // Layer WMS per tahun
    var wmsLayers = {
      "2013": L.tileLayer.wms('http://192.168.87.122:8080/geoserver/wms', {
        layers: 'pgwl:NDFI_clip_2013_COG2',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        service: 'WMS',
        request: 'GetMap',
        styles: 'pgwl:raster2',
        zIndex: 10,
        crs: L.CRS.EPSG4326 
      }),
      "2016": L.tileLayer.wms('http://192.168.87.122:8080/geoserver/wms', {
        layers: 'pgwl:NDFI_2016_2',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        service: 'WMS',
        request: 'GetMap',
        styles: 'pgwl:raster2',
        zIndex: 10,
        crs: L.CRS.EPSG4326
      }),
      "2019": L.tileLayer.wms('http://192.168.87.122:8080/geoserver/wms', {
        layers: 'pgwl:NDFI_2019',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        service: 'WMS',
        request: 'GetMap',
        styles: 'pgwl:raster2',
        zIndex: 10,
        crs: L.CRS.EPSG4326
      }),
      "2022": L.tileLayer.wms('http://192.168.87.122:8080/geoserver/wms', {
        layers: 'pgwl:NDFI_2022',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        service: 'WMS',
        request: 'GetMap',
        styles: 'pgwl:raster2',
        zIndex: 10,
        crs: L.CRS.EPSG4326
      }),
      "2024": L.tileLayer.wms('http://192.168.87.122:8080/geoserver/wms', {
        layers: 'pgwl:NDFI_2024',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        service: 'WMS',
        request: 'GetMap',
        styles: 'pgwl:raster2',
        zIndex: 10,
        crs: L.CRS.EPSG4326
      })
    };

    // Layer Control
    var overlayMaps = {
      "WMS 2013": wmsLayers["2013"],
      "WMS 2016": wmsLayers["2016"],
      "WMS 2019": wmsLayers["2019"],
      "WMS 2022": wmsLayers["2022"],    
      "WMS 2024": wmsLayers["2024"]
    };

    // Group layers for markers
  var penebanganLiarGroup = L.layerGroup();
  var pohonRobohGroup = L.layerGroup();
  var kebakaranHutanGroup = L.layerGroup();
    L.control.layers(baseMaps, overlayMaps,).addTo(map);

    var sliderControl = L.control({ position: 'topright' });
sliderControl.onAdd = function () {
  var div = L.DomUtil.create('div', 'info slider');
  div.innerHTML = 
    '<label>Tahun: <span id="year">2013</span></label>' +
    '<input type="range" id="yearSlider" min="2013" max="2024" step="1" value="2013" />';
  return div;
};
sliderControl.addTo(map);

// Daftar tahun yang tersedia dalam WMS
var availableYears = ["2013", "2016", "2019", "2022", "2024"];

var yearSlider = document.getElementById('yearSlider');
var yearLabel = document.getElementById('year');

// Fungsi untuk memindahkan slider ke nilai terdekat yang tersedia
yearSlider.addEventListener('input', function () {
  var closestYear = availableYears.reduce(function (prev, curr) {
    return (Math.abs(curr - yearSlider.value) < Math.abs(prev - yearSlider.value) ? curr : prev);
  });
  yearSlider.value = closestYear; // Snap ke tahun terdekat
  yearLabel.textContent = closestYear;

  // Matikan semua layer WMS dan nyalakan layer sesuai tahun
  for (var year in wmsLayers) {
    map.removeLayer(wmsLayers[year]);
  }
  map.addLayer(wmsLayers[closestYear]);
});

    // Default layer tahun 2013
    wmsLayers["2013"].addTo(map);

fetch('${jsonUrl}')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);  // Log data untuk verifikasi
    data.forEach((report) => {
      
      // Tentukan warna berdasarkan type
      var markerColor;
      switch (report.type) {
        case 'Penebangan Liar':
          markerColor = 'orange';
          break;
        case 'Pohon Roboh':
          markerColor = 'indigo';
          break;
        case 'Kebakaran Hutan':
          markerColor = 'red';
          break;
        default:
          markerColor = 'blue';
      }

      const marker = L.circleMarker(report.location.split(',').map(Number), {
        color: markerColor,
        radius: 5,
        weight: 2,
        fillOpacity: 0.7
      })
      .bindPopup('<b>' + report.type + '</b><br>' + report.description)
      .addTo(map);
    });
  })
  .catch((error) => console.error('Error loading data:', error));

  

  // Keterangan peta
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'legend');
      div.innerHTML = '<strong>Keterangan:</strong><br><em>Visualisasi NDFI untuk pemantauan deforestasi.</em>';
      return div;
    };
    legend.addTo(map);

  </script>
</body>
</html>
`;




return (
  <View style={styles.container}>
    <WebView
      key={key} // Key akan diperbarui setiap kali refresh
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
    />
    <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
      <Text style={styles.buttonText}>↻</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshButton: {
    position: 'absolute',
    top: 460,
    left: 10,
    width: 40,
    height: 40,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default Mapview;
