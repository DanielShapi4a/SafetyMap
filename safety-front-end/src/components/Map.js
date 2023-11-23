// Map.js
import React, { useEffect } from 'react';
import $ from 'jquery';
import 'jsvectormap/dist/jquery-jvectormap.css';
import 'jsvectormap/dist/jquery-jvectormap.min.js';

const Map = ({ data, onCountryClick }) => {
  useEffect(() => {
    // Ensure data is available before initializing the map
    if (data) {
      $('#world-map').vectorMap({
        map: 'world_mill_en',
        backgroundColor: '#ffffff',
        series: {
          regions: [
            {
              values: data,
              scale: ['#00ff00', '#ffff00', '#ffa500', '#ff0000'],
              normalizeFunction: 'polynomial',
            },
          ],
        },
        onRegionClick: (e, code) => {
          onCountryClick(code);
        },
        onRegionTipShow: (e, el, code) => {
          // Customize the tooltip content here based on your data structure
          const countryData = data[code] || 'No data available';
          el.html(`${el.html()} - ${countryData}`);
        },
      });
    }
  }, [data, onCountryClick]);

  return <div id="world-map" style={{ width: '100%', height: '500px' }} />;
};

export default Map;
