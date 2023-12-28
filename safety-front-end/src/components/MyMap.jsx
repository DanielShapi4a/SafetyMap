// MyMap.jsx

import React, { useRef, useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../countries.geo.json";
import "leaflet/dist/leaflet.css";
import { fetchCountryData, fetchData } from "../services/api";
import { WARNING_LEVEL_COLORS, DOUBLE_WARNING_LEVEL } from "../utils/constants";
import "./MyMap.css";
import MovingComponent from 'react-moving-text'
import TechnologiesSection from "./TechnolegiesSection";
import { legendData } from "../utils/constants";

const MyMap = ({ onCountryClick, mapCenter, mapZoom }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  // Use effect for fetching data
  useEffect(() => {
    const fetchDataAndCountryData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndCountryData();
  }, []);

  const onEachCountry = async (country, layer) => {
    if (!country || !country.properties || !country.properties.name) {
      console.warn("Invalid country data:", country);
      return;
    }
    const countryName = country.properties.name;
    console.log(countryName);
    try {
      const countryData = await fetchCountryData(countryName);

      const countryColor = getWarningLevelColor(countryData["Warning Level"]);
      layer.setStyle({
        fillColor: countryColor,
        fillOpacity: 1,
        color: "black",
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

            color: "grey",
            fillOpacity: 0.7,
          });

          setTimeout(() => {
            layer
              .bindPopup(
                `${countryName}: Warning Level ${countryData["Warning Level"]}`,
                {
                  closeOnClick: false,
                }
              )
              .openPopup();
          }, 250);
        },
        mouseout: () => {
          layer.setStyle({
            fillColor: countryColor,
            fillOpacity: 1,
            weight: 2,
            color: "black",
          });
          layer.closePopup();
        },
      });
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const getWarningLevelColor = (warningLevel) => {
    console.log("Current warning level:", warningLevel);    
    if (typeof warningLevel === "string" && (warningLevel.includes("/") || warningLevel.includes("\\"))) {
      // Handle countries with double warning levels
      return DOUBLE_WARNING_LEVEL || "grey";
    }
    return WARNING_LEVEL_COLORS[warningLevel] || "grey";
  };
  

  
  return (
    <div className="MapContent">
      <div className="Left-Right-Sides">
        <div className="Main-Text" >
          <div style={{   alignItems: 'center', justifyContent: 'center',color: 'blueviolet', fontWeight: 'bold', fontSize: '30px' }}>
            <MovingComponent 
              type="typewriter"
              dataText={[
                'Welcome to Safety Map',
                'Search for safety information in any country',
                'Stay informed with the latest updates on safety levels'
                
            ]} />
          </div>
          <div className="Secondary-Text-Area">
            <p style={{fontSize:'18px', marginTop:'30px'}}>
              Safety Map is a project dedicated to visualizing the safety status of Jewish communities across the globe.
              Our goal is to provide a comprehensive overview of potential risks and safety levels in different countries.
            </p>
            <h3>Project Objective</h3>
            <p>
              The primary objective of this project is to empower individuals with information about the safety conditions
              for Jewish communities worldwide. We aim to foster awareness and encourage informed decision-making.
            </p>
            <h3>How to Use</h3>
            <p>
              Explore the map to view safety levels in various countries. Click on a country to access detailed information,
              including the current warning level. Utilize the search bar to quickly find information about a specific country.
            </p>
            <h3>Data Source</h3>
            <p>
              Our data is sourced from reliable and up-to-date channels, ensuring accurate and relevant information for users.
            </p>
            <div className="Technolegies" style={{flexDirection:'column', margin:'20px'}}>
              <span>Technologies used:</span>
              <TechnologiesSection/>
              <div style={{marginTop:'40px'}}>Last Update: 28/12/2023</div>
            </div>
          </div>
        </div>
        <div className="MapContainerWrapper" style={{ margin: "0px 30px 20px 20px" }}>
          <MapContainer
            ref={mapRef}
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "100%", width: "100%" }}
          >
            <GeoJSON data={mapData.features} onEachFeature={onEachCountry} />
            <div className="legend" >
              {legendData.map(({ level, color, label }) => (
                <div key={level} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: color }}></div>
                  <div className="legend-label">{`${level}. ${label}`}</div>
                </div>
              ))}
            </div>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MyMap;