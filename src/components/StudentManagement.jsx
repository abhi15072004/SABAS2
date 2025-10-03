import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    address: "",
    assignedBus: "",
    assignedDriver: "",
  });
  const [editingId, setEditingId] = useState(null);

  const [availableBuses, setAvailableBuses] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);

  // Base API URL from .env
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Fetch students, buses, and drivers from backend on component mount
  useEffect(() => {
    fetchStudents();
    fetchBuses();
    fetchDrivers();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/students`); // Updated API URL
      setStudents(res.data.data || []);
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/buses`);
      setAvailableBuses(res.data.data || []);
    } catch (err) {
      console.error("Error fetching buses", err);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/drivers`);
      setAvailableDrivers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching drivers", err);
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    if (!newStudent.name || !newStudent.address) return;

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/students/${editingId}`, newStudent);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/students`, newStudent);
      }
      setNewStudent({ name: "", address: "", assignedBus: "", assignedDriver: "" });
      fetchStudents();
    } catch (err) {
      console.error("Error saving student", err);
    }
  };

  const handleEdit = (student) => {
    setNewStudent(student);
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Manage Students</h2>

      {/* Add/Edit Form */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newStudent.address}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <select
            name="assignedBus"
            value={newStudent.assignedBus}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Assign Bus</option>
            {availableBuses.map((bus) => (
              <option key={bus._id} value={bus.busNumber}>
                {bus.busNumber}
              </option>
            ))}
          </select>

          <select
            name="assignedDriver"
            value={newStudent.assignedDriver}
            onChange={handleInputChange}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Assign Driver</option>
            {availableDrivers.map((driver) => (
              <option key={driver._id} value={driver.name}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="mt-4 px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 flex items-center"
        >
          <FaPlus className="mr-2" />
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-yellow-400">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Assigned Bus</th>
              <th className="p-3 text-left">Assigned Driver</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.address}</td>
                <td className="p-3">{student.assignedBus}</td>
                <td className="p-3">{student.assignedDriver}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-400"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="px-3 py-1 bg-red-500 rounded hover:bg-red-400"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
