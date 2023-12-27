import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { HiLocationMarker } from "react-icons/hi";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../styles/LeafletMap.module.css";
import "leaflet/dist/leaflet.css";

function Map() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [position, setPosition] = useState<[number, number] | null>(null);

  const lat = parseFloat(searchParams.get("lat") || "");
  const lng = parseFloat(searchParams.get("lng") || "");

  useEffect(() => {
    setPosition([lat, lng]);
  }, [lat, lng]);

  const customMarkerIcon = L.divIcon({
    className: "custom-marker-icon",
    html: ReactDOMServer.renderToString(
      <HiLocationMarker size={32} color="red" />
    ),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

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

      {/* Place Marker if position is available */}
      {position && (
        <Marker position={position} icon={customMarkerIcon}>
          {/* You can add a Popup or Tooltip here if needed */}
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
