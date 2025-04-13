import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateStandard() {
  const [showModal, setShowModal] = useState(false);
  const [standardName, setstandardName] = useState("");
  const [standards, setstandards] = useState([]);
  const fetch = useAuthenticatedFetch();

  const handleAddStandard = async () => {
    if (!standardName.trim()) return;

    try {
      const res = await fetch.post("addStandardData", {
        name: standardName.trim(),
      });

      if (res?.code === 200) {
        setstandardName("");
        setShowModal(false);
        fetchstandards(); // Refresh list
      } else {
        console.error("Error saving Standard:", res);
      }
    } catch (err) {
      console.error("Failed to save Standard", err);
    }
  };

  useEffect(() => {
    fetchstandards();
  }, []);

  const fetchstandards = async () => {
    try {
      const res = await fetch.get("getStdData");
      setstandards(res?.data);
    } catch (err) {
      console.error("Failed to fetch standards", err);
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
              <h3>Add New Standard</h3>
              <input
                type="text"
                placeholder="Enter Standard name"
                value={standardName}
                onChange={(e) => setstandardName(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleAddStandard}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* standards Table */}
        <div className="table-container">
          <h3>All standards</h3>
          {standards.length === 0 ? (
            <p>No standards added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Standard Name</th>
                </tr>
              </thead>
              <tbody>
                {standards.map((Standard, index) => (
                  <tr key={Standard.name}>
                    <td>{index + 1}</td>
                    <td>{Standard.name}</td>
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