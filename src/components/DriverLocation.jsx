// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const markerIcon = new L.Icon({
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const DriverLocation = () => {
//   const [drivers, setDrivers] = useState([]);

//   useEffect(() => {
//     fetchDrivers();
//     const interval = setInterval(fetchDrivers, 5000); // refresh every 5 sec
//     return () => clearInterval(interval);
//   }, []);

//   const fetchDrivers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/drivers");
//       setDrivers(res.data);
//     } catch (err) {
//       console.error("Error fetching drivers:", err);
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-100 text-black rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">🗺️ Driver Live Locations</h2>
//       <MapContainer
//         center={[22.7196, 75.8577]} // Default: Indore
//         zoom={12}
//         style={{ height: "500px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
//         />
//         {drivers.map(
//           (driver) =>
//             driver.latitude &&
//             driver.longitude && (
//               <Marker
//                 key={driver._id}
//                 position={[driver.latitude, driver.longitude]}
//                 icon={markerIcon}
//               >
//                 <Popup>
//                   <strong>{driver.name}</strong>
//                   <br />
//                   Bus: {driver.busNumber}
//                   <br />
//                   Route: {driver.route}
//                   <br />
//                   Last Update:{" "}
//                   {new Date(driver.updatedAt).toLocaleTimeString()}
//                 </Popup>
//               </Marker>
//             )
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default DriverLocation;
