import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function Generatesubject() {
  const [showModal, setShowModal] = useState(false);
  const [subjectName, setsubjectName] = useState("");
  const [subjects, setsubjects] = useState([]);
  const fetch = useAuthenticatedFetch();

  const handleAddsubject = async () => {
    if (!subjectName.trim()) return;

    try {
      const res = await fetch.post("addsubjectData", {
        name: subjectName.trim(),
      });

      if (res?.code === 200) {
        setsubjectName("");
        setShowModal(false);
        fetchsubjects(); // Refresh list
      } else {
        console.error("Error saving subject:", res);
      }
    } catch (err) {
      console.error("Failed to save subject", err);
    }
  };

  useEffect(() => {
    fetchsubjects();
  }, []);

  const fetchsubjects = async () => {
    try {
      const res = await fetch.get("getSubData");
      setsubjects(res?.data);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <h2>subject Management</h2>

        <button onClick={() => setShowModal(true)}>Add subject</button>

        {/* Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Add New subject</h3>
              <input
                type="text"
                placeholder="Enter subject name"
                value={subjectName}
                onChange={(e) => setsubjectName(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleAddsubject}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* subjects Table */}
        <div className="table-container">
          <h3>All subjects</h3>
          {subjects.length === 0 ? (
            <p>No subjects added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>subject Name</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={subject.name}>
                    <td>{index + 1}</td>
                    <td>{subject.name}</td>
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