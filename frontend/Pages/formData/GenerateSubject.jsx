import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateSubject() {
  const [showModal, setShowModal] = useState(false);
  const [fromData, setFormData] = useState({ name: "" });
  const [Subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const fetch = useAuthenticatedFetch();

  const handleAddSubject = async () => {
    try {
      await fetch.post("addSubjectData", fromData);
      setShowModal(false);
      fetchSubjects();
    } catch (err) {
      console.error("Failed to save Subject", err);
    }
  };
  const handleOpenModal = (Subject = null) => {
    setSelectedSubject(Subject);
    setShowModal(true);
    setFormData(Subject);
  };

  const handleDeleteSubject = async (row) => {
    try {
      await fetch.delete(`deleteSubjectData/${row._id}`);
      fetchSubjects();
    } catch (err) {
      console.error("Failed to delete Subject", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await fetch.get("getSubData");
      setSubjects(res?.data);
    } catch (err) {
      console.error("Failed to fetch Subjects", err);
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <h2>Subject Management</h2>

        <button onClick={() => setShowModal(true)}>Add Subject</button>

        {/* Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>{selectedSubject ? "Edit Subject" : "Add New Subject"}</h3>
              <input
                type="text"
                placeholder="Enter Subject name"
                value={fromData.name}
                onChange={(e) => handleChange(e)}
              />
              <div className="modal-actions">
                <button onClick={handleAddSubject}>
                  {selectedSubject ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedSubject(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subjects Table */}
        <div className="table-container">
          <h3>All Subjects</h3>
          {Subjects.length === 0 ? (
            <p>No Subjects added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Subjects.map((Subject, index) => (
                  <tr key={Subject.name}>
                    <td>{index + 1}</td>
                    <td>{Subject.name}</td>
                    <td>
                      <button onClick={() => handleOpenModal(Subject)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteSubject(Subject)}>
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
