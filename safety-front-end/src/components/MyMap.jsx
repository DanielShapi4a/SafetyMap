import React, { useState, useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from '../countries.geo.json';
import 'leaflet/dist/leaflet.css';
import { fetchCountryData, fetchData } from '../services/api';

const MyMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

  const countryStyle = {
    fillColor: 'grey', 
    fillOpacity: 1,
    color: 'black',
    weight: 2,
  };

  const onEachCountry = async (country, layer) => {
    if (!country || !country.properties || !country.properties.name) {
      console.warn('Invalid country data:', country);
      return;
    }
  
    const countryName = country.properties.name;
    console.log('Country Name:', countryName);
  
    try {
      const countryData = await fetchCountryData(countryName);
      console.log('Fetched Country Data:', countryData);
  
      layer.bindPopup(`${countryName}: Warning Level ${countryData['warning level']}`);
  
      layer.on({
        click: () => {
          onCountryClick(countryData);
        },
        mouseover: () => {
          layer.setStyle({
            weight: 3,
            color: 'black',
            fillOpacity: 0.7,
          });
        },
        mouseout: () => {
          resetCountryColor(layer);
        },
      });
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };
  
  const onCountryClick = (countryData) => {
    // Handle country click logic, e.g., display more information in a separate component
    console.log(countryData);
  };

  const resetCountryColor = (layer) => {
    layer.setStyle(countryStyle);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My Map</h1>
      <MapContainer style={{ height: '80vh' }} zoom={2} center={[20, 100]}>
        <GeoJSON
          style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
  );
};

export default MyMap;
