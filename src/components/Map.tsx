import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styles from "../styles/LeafletMap.module.css";

import "leaflet/dist/leaflet.css";
function Map() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [position, setPosition] = useState<[number, number] | null>(null);

  const lat = parseFloat(searchParams.get("lat") || "");
  const lng = parseFloat(searchParams.get("lng") || "");

  useEffect(() => {
    console.log(lat + " " + lng);
    setPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={5}
      className={styles.mapContainer}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default Map;
