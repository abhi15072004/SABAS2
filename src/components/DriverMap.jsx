import React, { useEffect, useState } from "react";
import L from "leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

const socket = io(`${import.meta.env.VITE_TUNNEL_ADDRESS}`);

const DriverMap = ({ drivers }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState({});

  useEffect(() => {
    if (!map) {
      const mapInstance = L.map("driverMap").setView([28.6139, 77.209], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance);
      setMap(mapInstance);
    }

    // Listen to real-time location updates
    socket.on("locationUpdated", (data) => {
      if (!map) return;
      const { driverId, latitude, longitude } = data;

      if (markers[driverId]) {
        markers[driverId].setLatLng([latitude, longitude]);
      } else {
        const busIcon = L.icon({
          iconUrl: "/bus-icon.png", // small bus image in public folder
          iconSize: [32, 32],
        });
        const markerInstance = L.marker([latitude, longitude], { icon: busIcon }).addTo(map);
        setMarkers((prev) => ({ ...prev, [driverId]: markerInstance }));
      }
    });

    return () => socket.off("locationUpdated");
  }, [map, markers]);

  // Initial driver positions
  useEffect(() => {
    if (!map) return;
    drivers.forEach(d => {
      if (d.latitude && d.longitude && !markers[d._id]) {
        const busIcon = L.icon({
          iconUrl: "/bus-icon.png",
          iconSize: [32, 32],
        });
        const markerInstance = L.marker([d.latitude, d.longitude], { icon: busIcon }).addTo(map);
        setMarkers((prev) => ({ ...prev, [d._id]: markerInstance }));
      }
    });
  }, [drivers, map]);

  return <div id="driverMap" className="h-[500px] w-full rounded shadow"></div>;
};

export default DriverMap;
