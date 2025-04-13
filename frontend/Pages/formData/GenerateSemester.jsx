import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateSemester() {
  const [showModal, setShowModal] = useState(false);
  const [fromData, setFormData] = useState({ name: "" });
  const [Semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const fetch = useAuthenticatedFetch();

  const handleAddSemester = async () => {
    try {
      await fetch.post("addSemesterData", fromData);
      setShowModal(false);
      fetchSemesters();
    } catch (err) {
      console.error("Failed to save Semester", err);
    }
  };
  const handleOpenModal = (Semester = null) => {
    setSelectedSemester(Semester);
    setShowModal(true);
    setFormData(Semester);
  };

  const handleDeleteSemester = async (row) => {
    try {
      await fetch.delete(`deleteSemesterData/${row._id}`);
      fetchSemesters();
    } catch (err) {
      console.error("Failed to delete Semester", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const res = await fetch.get("getSemData");
      setSemesters(res?.data);
    } catch (err) {
      console.error("Failed to fetch Semesters", err);
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <h2>Semester Management</h2>

        <button onClick={() => setShowModal(true)}>Add Semester</button>

        {/* Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>{selectedSemester ? "Edit Semester" : "Add New Semester"}</h3>
              <input
                type="text"
                placeholder="Enter Semester name"
                value={fromData.name}
                onChange={(e) => handleChange(e)}
              />
              <div className="modal-actions">
                <button onClick={handleAddSemester}>
                  {selectedSemester ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedSemester(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Semesters Table */}
        <div className="table-container">
          <h3>All Semesters</h3>
          {Semesters.length === 0 ? (
            <p>No Semesters added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Semester Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Semesters.map((Semester, index) => (
                  <tr key={Semester.name}>
                    <td>{index + 1}</td>
                    <td>{Semester.name}</td>
                    <td>
                      <button onClick={() => handleOpenModal(Semester)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteSemester(Semester)}>
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
