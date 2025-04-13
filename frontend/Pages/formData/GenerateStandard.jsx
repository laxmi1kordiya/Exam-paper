import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateStandard() {
  const [showModal, setShowModal] = useState(false);
  const [fromData, setFormData] = useState({ name: "" });
  const [Standards, setStandards] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState(null);
  const fetch = useAuthenticatedFetch();

  const handleAddStandard = async () => {
    try {
      await fetch.post("addStandardData", fromData);
      setShowModal(false);
      fetchStandards();
    } catch (err) {
      console.error("Failed to save Standard", err);
    }
  };
  const handleOpenModal = (Standard = null) => {
    setSelectedStandard(Standard);
    setShowModal(true);
    setFormData(Standard);
  };

  const handleDeleteStandard = async (row) => {
    try {
      await fetch.delete(`deleteStandardData/${row._id}`);
      fetchStandards();
    } catch (err) {
      console.error("Failed to delete Standard", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  useEffect(() => {
    fetchStandards();
  }, []);

  const fetchStandards = async () => {
    try {
      const res = await fetch.get("getStdData");
      setStandards(res?.data);
    } catch (err) {
      console.error("Failed to fetch Standards", err);
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <h2>Standard Management</h2>

        <button onClick={() => setShowModal(true)}>Add Standard</button>

        {/* Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>{selectedStandard ? "Edit Standard" : "Add New Standard"}</h3>
              <input
                type="text"
                placeholder="Enter Standard name"
                value={fromData.name}
                onChange={(e) => handleChange(e)}
              />
              <div className="modal-actions">
                <button onClick={handleAddStandard}>
                  {selectedStandard ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedStandard(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Standards Table */}
        <div className="table-container">
          <h3>All Standards</h3>
          {Standards.length === 0 ? (
            <p>No Standards added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Standard Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Standards.map((Standard, index) => (
                  <tr key={Standard.name}>
                    <td>{index + 1}</td>
                    <td>{Standard.name}</td>
                    <td>
                      <button onClick={() => handleOpenModal(Standard)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteStandard(Standard)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
