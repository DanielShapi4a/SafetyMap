// MyMap.jsx
import React, { useRef, useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../countries.geo.json";
import "leaflet/dist/leaflet.css";
import { fetchCountryData, fetchData } from "../services/api";
import { WARNING_LEVEL_COLORS } from "../utils/constants";

const MyMap = ({ onCountryClick, mapCenter, mapZoom }) => {
  const mapRef = useRef(null);
  console.log("MyMap - mapCenter:", mapCenter);
  console.log("MyMap - mapZoom:", mapZoom);

  const handleMapMove = (e) => {
    console.log("MyMap - Map moved:", e.target.getCenter(), e.target.getZoom());
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } finally {
        // Set loading to false once data is fetched (success or error)
        setLoading(false);
      }
    };

    getData();
  }, []);

  const onEachCountry = async (country, layer) => {
    if (!country || !country.properties || !country.properties.name) {
      console.warn("Invalid country data:", country);
      return;
    }

    const countryName = country.properties.name;

    try {
      const countryData = await fetchCountryData(countryName);

      const countryColor = getWarningLevelColor(countryData["warning level"]);
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
          layer.setStyle({
            weight: 3,
            color: "grey",
            fillOpacity: 0.7,
          });

          setTimeout(() => {
            layer
              .bindPopup(
                `${countryName}: Warning Level ${countryData["warning level"]}`,
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
    if (typeof warningLevel === "string" && warningLevel.includes("/")) {
      const levels = warningLevel.split("/").map(Number);
      const lowerLevelColor = WARNING_LEVEL_COLORS[levels[0]] || "grey";
      const higherLevelColor = WARNING_LEVEL_COLORS[levels[1]] || "grey";

      if (Math.abs(levels[1] - levels[0]) >= 2) {
        return {
          fill: lowerLevelColor,
          border: higherLevelColor,
        };
      } else {
        const percentage = (levels[0] + levels[1]) / 2;
        const interpolatedColor = interpolateColor(
          lowerLevelColor,
          higherLevelColor,
          percentage
        );
        return {
          fill: interpolatedColor,
          border: higherLevelColor,
        };
      }
    }

    return WARNING_LEVEL_COLORS[warningLevel] || "grey";
  };

  const interpolateColor = (color1, color2, percentage) => {
    const color1Value = parseInt(color1.slice(1), 16);
    const color2Value = parseInt(color2.slice(1), 16);

    const interpolatedValue = Math.round(
      color1Value + (color2Value - color1Value) * percentage
    );
    const interpolatedColor =
      "#" + interpolatedValue.toString(16).padStart(6, "0");
    return interpolatedColor;
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f8ff",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>
        Safety Map
      </h1>
      <div
        style={{
          width: "80%",
          height: "80vh",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={mapCenter}
          zoom={mapZoom}
          whenReady={(map) => {
            map.target.addEventListener("moveend", handleMapMove);
          }}
        >
          <GeoJSON data={mapData.features} onEachFeature={onEachCountry} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MyMap;