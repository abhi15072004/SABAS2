import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({ name: "", licenseNo: "", mobileNo: "", assignedBus: "", latitude: "", longitude: "" });
  const [editId, setEditId] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    fetchDrivers();

    if (!map) {
      const mapInstance = L.map("driverMap").setView([28.6139, 77.209], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance);
      setMap(mapInstance);
    }
  }, [map]);

  const fetchDrivers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_TUNNEL_ADDRESS}/api/drivers`);
    setDrivers(res.data.data || []);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await axios.put(`${import.meta.env.VITE_TUNNEL_ADDRESS}/api/drivers/${editId}`, formData);
    else await axios.post(`${import.meta.env.VITE_TUNNEL_ADDRESS}/api/drivers`, formData);
    setFormData({ name: "", licenseNo: "", mobileNo: "", assignedBus: "", latitude: "", longitude: "" });
    setEditId(null);
    fetchDrivers();
  };

  const handleEdit = (driver) => {
    setFormData(driver);
    setEditId(driver._id);
    showDriverLocation(driver);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_TUNNEL_ADDRESS}/api/drivers/${id}`);
    fetchDrivers();
  };

  const showDriverLocation = async (driver) => {
    if (!map) return;

    const busId = driver.assignedBus;
    if (!busId) {
      console.warn('Driver has no assigned bus');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_TUNNEL_ADDRESS}/api/location/get-location?bus_id=${busId}`);
      const text = await response.text();  // read raw response
      //console.log('Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Response is not valid JSON');
        return;
      }

      if (data.status !== 'success') {
        console.warn('Could not get location:', data.error);
        return;
      }

      const location = data.location;
      const lat = location.latitude || 28.6139;
      const lng = location.longitude || 77.209;

      if (marker) marker.setLatLng([lat, lng]);
      else {
        const markerInstance = L.marker([lat, lng]).addTo(map);
        setMarker(markerInstance);
      }

      map.setView([lat, lng], 14);
    } catch (err) {
      console.error('Error fetching driver location:', err);
    }

  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Manage Drivers</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 bg-gray-50 p-4 rounded shadow mb-6">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="p-2 border rounded"/>
          <input name="licenseNo" value={formData.licenseNo} onChange={handleChange} placeholder="License" required className="p-2 border rounded"/>
          <input name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Mobile" required className="p-2 border rounded"/>
          <input name="assignedBus" value={formData.assignedBus} onChange={handleChange} placeholder="Bus" required className="p-2 border rounded"/>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">{editId ? "Update" : "Add"}</button>
        </form>

        <table className="w-full border text-left mb-6">
          <thead className="bg-gray-100"><tr><th>Name</th><th>Bus</th><th>Actions</th></tr></thead>
          <tbody>
            {drivers.map(d => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.assignedBus}</td>
                <td className="space-x-2">
                  <button onClick={() => handleEdit(d)} className="bg-green-500 text-white px-2 rounded">Select</button>
                  <button onClick={() => handleDelete(d._id)} className="bg-red-500 text-white px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Driver Location</h2>
        <div id="driverMap" className="h-96 w-full rounded shadow"></div>
      </div>
    </div>
  );
};

export default DriverManagement;
