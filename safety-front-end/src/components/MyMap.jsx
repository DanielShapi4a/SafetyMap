// MyMap.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from '../countries.geo.json';
import 'leaflet/dist/leaflet.css';
import { fetchCountryData, fetchData } from '../services/api';
import { WARNING_LEVEL_COLORS, GRADIENT_COLORS, DEFAULT_GRADIENT } from '../utils/constants';


const defaultCountryStyle = {
  fillColor: 'grey',
  fillOpacity: 1,
  color: 'black',
  weight: 2,
};

const MyMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

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
  
      const countryColor = getWarningLevelColor(countryData['warning level']);
      layer.setStyle({
        fillColor: countryColor,
        fillOpacity: 1,
        color: 'black',
        weight: 2,
      });
  
      layer.on({
        click: () => {
          onCountryClick(countryData);
        },
        mouseover: () => {
          // Add the existing mouseover effect
          layer.setStyle({
            weight: 3,
            color: 'grey',
            fillOpacity: 0.7,
          });
  
          // Use setTimeout to delay the display of the popup
          setTimeout(() => {
            // Add a transition effect to the popup
            layer.bindPopup(`${countryName}: Warning Level ${countryData['warning level']}`, {
              closeOnClick: false,
            }).openPopup();
          }, 250);
        },
        mouseout: () => {
          // Remove the popup when mouseout
          layer.setStyle({
            fillColor: countryColor,
            fillOpacity: 1,
            weight: 2,
            color: 'black',
          });
          layer.closePopup();
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

  const getWarningLevelColor = (warningLevel) => {
    if (typeof warningLevel === 'string' && warningLevel.includes('/')) {
      const levels = warningLevel.split('/').map(Number);
      const lowerLevelColor = WARNING_LEVEL_COLORS[levels[0]] || 'grey';
      const higherLevelColor = WARNING_LEVEL_COLORS[levels[1]] || 'grey';
  
      // Check for a jump of 2 or higher
      if (Math.abs(levels[1] - levels[0]) >= 2) {
        return {
          fill: lowerLevelColor,
          border: higherLevelColor,
        };
      } else {
        // Calculate an intermediate color
        const percentage = (levels[0] + levels[1]) / 2;
        const intermediateColor = interpolateColor(lowerLevelColor, higherLevelColor, percentage);
        return {
          fill: intermediateColor,
          border: higherLevelColor,
        };
      }
    }
  
    return WARNING_LEVEL_COLORS[warningLevel] || 'grey';
  };
  
  const interpolateColor = (color1, color2, percentage) => {
    const color1Value = parseInt(color1.slice(1), 16);
    const color2Value = parseInt(color2.slice(1), 16);
  
    const interpolatedValue = Math.round(color1Value + (color2Value - color1Value) * percentage);
    const interpolatedColor = '#' + interpolatedValue.toString(16).padStart(6, '0');
    return interpolatedColor;
  };

  
  
  
  
  

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My Map</h1>
      <MapContainer style={{ height: '80vh' }} zoom={2} center={[20, 100]}>
        <GeoJSON
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
  );
};

export default MyMap;
