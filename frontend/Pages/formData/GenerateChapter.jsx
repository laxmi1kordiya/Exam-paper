import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateChapter() {
  const [showModal, setShowModal] = useState(false);
  const [fromData, setFormData] = useState({ name: "" });
  const [Chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const fetch = useAuthenticatedFetch();

  const handleAddChapter = async () => {
    try {
      await fetch.post("addChapterData", fromData);
      setShowModal(false);
      fetchChapters();
    } catch (err) {
      console.error("Failed to save Chapter", err);
    }
  };
  const handleOpenModal = (Chapter = null) => {
    setSelectedChapter(Chapter);
    setShowModal(true);
    setFormData(Chapter);
  };

  const handleDeleteChapter = async (row) => {
    try {
      await fetch.delete(`deleteChapterData/${row._id}`);
      fetchChapters();
    } catch (err) {
      console.error("Failed to delete Chapter", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const res = await fetch.get("getChapterData");
      setChapters(res?.data);
    } catch (err) {
      console.error("Failed to fetch Chapters", err);
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <h2>Chapter Management</h2>

        <button onClick={() => setShowModal(true)}>Add Chapter</button>

        {/* Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>{selectedChapter ? "Edit Chapter" : "Add New Chapter"}</h3>
              <input
                type="text"
                placeholder="Enter Chapter name"
                value={fromData.name}
                onChange={(e) => handleChange(e)}
              />
              <div className="modal-actions">
                <button onClick={handleAddChapter}>
                  {selectedChapter ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedChapter(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chapters Table */}
        <div className="table-container">
          <h3>All Chapters</h3>
          {Chapters.length === 0 ? (
            <p>No Chapters added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Chapter Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Chapters.map((Chapter, index) => (
                  <tr key={Chapter.name}>
                    <td>{index + 1}</td>
                    <td>{Chapter.name}</td>
                    <td>
                      <button onClick={() => handleOpenModal(Chapter)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteChapter(Chapter)}>
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
