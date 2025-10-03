import React, { useState, useEffect } from "react";
import { FaSave, FaSchool, FaTrash } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const SchoolForm = () => {
  const [school, setSchool] = useState({
    name: "",
    code: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [schools, setSchools] = useState([]);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Base API URL from .env
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Fetch schools from backend
  const fetchSchools = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/school`);
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Error fetching schools:", err);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  // Init Leaflet Map
  useEffect(() => {
    if (!map) {
      const mapInstance = L.map("map").setView([28.6139, 77.209], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance);

      const markerInstance = L.marker([28.6139, 77.209], {
        draggable: true,
      }).addTo(mapInstance);

      // Drag event → update lat/lng + reverse geocode
      markerInstance.on("dragend", async () => {
        const { lat, lng } = markerInstance.getLatLng();
        setSchool((prev) => ({ ...prev, latitude: lat, longitude: lng }));
        fetchAddressFromLatLng(lat, lng);
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    }
  }, [map]);

  // Reverse Geocode using Nominatim
  const fetchAddressFromLatLng = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data.display_name) {
        setSchool((prev) => ({ ...prev, address: data.display_name }));
      }
    } catch (err) {
      console.error("Reverse geocode failed:", err);
    }
  };

  // Autocomplete search suggestions
  const handleSearch = async (value) => {
    setSchool({ ...school, name: value });
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSuggestionClick = (s) => {
    setSchool((prev) => ({
      ...prev,
      name: s.display_name.split(",")[0],
      address: s.display_name,
      latitude: s.lat,
      longitude: s.lon,
    }));
    if (map && marker) {
      const latlng = [s.lat, s.lon];
      map.setView(latlng, 15);
      marker.setLatLng(latlng);
    }
    setSuggestions([]);
  };

  const handleChange = (e) => {
    setSchool({ ...school, [e.target.name]: e.target.value });
  };

  // Save School
  const handleSave = async () => {
    try {
      const method = school._id ? "PUT" : "POST";
      const url = school._id
        ? `${API_BASE_URL}/api/school/${school.code}`
        : `${API_BASE_URL}/api/school`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(school),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      alert("School saved successfully!");
      setSchool(data);
      fetchSchools();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  // Delete School
  const handleDelete = async (code) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/school/${code}`, { method: "DELETE" });
      fetchSchools();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* Form + Map */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaSchool className="mr-2 text-yellow-600" /> School Form
        </h2>

        {/* Autocomplete Search */}
        <label className="block text-sm">School Name</label>
        <input
          type="text"
          name="name"
          value={school.name}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        {suggestions.length > 0 && (
          <ul className="border bg-white max-h-40 overflow-y-auto mb-3">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(s)}
              >
                {s.display_name}
              </li>
            ))}
          </ul>
        )}

        <label className="block text-sm">School Code</label>
        <input
          type="text"
          name="code"
          value={school.code}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <label className="block text-sm">Address</label>
        <input
          type="text"
          name="address"
          value={school.address}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <div id="map" className="h-64 w-full mb-3 rounded shadow"></div>

        <button
          onClick={handleSave}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          <FaSave className="inline mr-2" /> Save
        </button>
      </div>

      {/* Schools Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Schools List</h2>
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s._id}>
                <td className="p-2 border">{s.code}</td>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.address}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => setSchool(s)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.code)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolForm;
