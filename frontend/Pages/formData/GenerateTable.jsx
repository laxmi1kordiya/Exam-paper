import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function ManageEducationData() {
  const fetch = useAuthenticatedFetch();
  const [activeTab, setActiveTab] = useState("Board");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [selectedItem, setSelectedItem] = useState(null);
  const [allData, getallData] = useState([]);

  const apiEndpoints = {
    Board: { fetch: "getBoardData", add: "addBoardData", delete: "deleteBoardData" },
    Standard: { fetch: "getStdData", add: "addStandardData", delete: "deleteStandardData" },
    Semester: { fetch: "getsemData", add: "addSemesterData", delete: "deleteSemesterData" },
    Subject: { fetch: "getsubData", add: "addSubjectData", delete: "deleteSubjectData" },
    Chapter: { fetch: "getChapterData", add: "addChapterData", delete: "deleteChapterData" },
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const res = await fetch.get(apiEndpoints[activeTab].fetch);
      setData(res.data || []);
      const allData = await fetch.get("getAllData");
      getallData(allData.data);
    } catch (err) {
      console.error(`Error fetching ${activeTab} data`, err);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedItem) {
        // Update logic if you have update API
        console.log("No update API provided in your code, skipping update logic.");
      } else {
        const res = await fetch.post(apiEndpoints[activeTab].add, formData);
        if (res?.code === 200) setFormData({ name: "" });
      }
      setShowModal(false);
      setSelectedItem(null);
      fetchData();
    } catch (err) {
      console.error(`Error saving ${activeTab}`, err);
    }
  };

  const handleDelete = async (item) => {
    try {
      await fetch.delete(`${apiEndpoints[activeTab].delete}/${item._id}`);
      fetchData();
    } catch (err) {
      console.error(`Error deleting ${activeTab}`, err);
    }
  };

  const openModal = (item = null) => {
    setSelectedItem(item);
    setFormData(item || { name: "" });
    setShowModal(true);
  };

  return (
    <div className="content-page">
      <div className="main-content">
    <div className="content-page">
      <div className="button-group" style={{ marginBottom: 20 }}>
        {Object.keys(apiEndpoints).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? "#007bff" : "#6c757d",
              color: "white",
              marginRight: 5,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="main-content">
        <h2>{activeTab} Management</h2>
        <button onClick={() => openModal()}>Add {activeTab}</button>

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>{selectedItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}</h3>
              <input
                type="text"
                placeholder={`Enter ${activeTab} name`}
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
              />
              <div className="modal-actions">
                <button onClick={handleSave}>{selectedItem ? "Update" : "Save"}</button>
                <button onClick={() => { setShowModal(false); setSelectedItem(null); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="table-container" style={{ marginTop: 20 }}>
          <h3>All {activeTab}s</h3>
          {data.length === 0 ? (
            <p>No {activeTab}s added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{activeTab} Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <button onClick={() => openModal(item)}>Edit</button>
                      <button onClick={() => handleDelete(item)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
