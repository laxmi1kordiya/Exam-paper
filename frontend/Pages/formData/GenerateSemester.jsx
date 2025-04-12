import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateSemester() {
  const [showModal, setShowModal] = useState(false);
  const [semesterName, setsemesterName] = useState("");
  const [Semesters, setSemesters] = useState([]);
  const fetch = useAuthenticatedFetch();

  const handleAddSemester = async () => {
    if (!semesterName.trim()) return;

    try {
      const res = await fetch.post("addSemesterData", {
        name: semesterName.trim(),
      });

      if (res?.code === 200) {
        setsemesterName("");
        setShowModal(false);
        fetchSemesters(); // Refresh list
      } else {
        console.error("Error saving Semester:", res);
      }
    } catch (err) {
      console.error("Failed to save Semester", err);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const res = await fetch.get("getsemData");
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
              <h3>Add New Semester</h3>
              <input
                type="text"
                placeholder="Enter Semester name"
                value={semesterName}
                onChange={(e) => setsemesterName(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleAddSemester}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
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
                </tr>
              </thead>
              <tbody>
                {Semesters.map((Semester, index) => (
                  <tr key={Semester.name}>
                    <td>{index + 1}</td>
                    <td>{Semester.name}</td>
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