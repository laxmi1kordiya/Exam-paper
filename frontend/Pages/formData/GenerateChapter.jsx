import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateChapter() {
  const [showModal, setShowModal] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [chapters, setChapters] = useState([]);
  const fetch = useAuthenticatedFetch();

  const handleAddChapter = async () => {
    if (!chapterName.trim()) return;

    try {
      const res = await fetch.post("addChapterData", {
        name: chapterName.trim(),
      });

      if (res?.code === 200) {
        setChapterName("");
        setShowModal(false);
        fetchChapters(); // Refresh list
      } else {
        console.error("Error saving chapter:", res);
      }
    } catch (err) {
      console.error("Failed to save chapter", err);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const res = await fetch.get("getChapterData");
      setChapters(res?.data);
    } catch (err) {
      console.error("Failed to fetch chapters", err);
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
              <h3>Add New Chapter</h3>
              <input
                type="text"
                placeholder="Enter chapter name"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleAddChapter}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Chapters Table */}
        <div className="table-container">
          <h3>All Chapters</h3>
          {chapters.length === 0 ? (
            <p>No chapters added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Chapter Name</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter, index) => (
                  <tr key={chapter.name}>
                    <td>{index + 1}</td>
                    <td>{chapter.name}</td>
                    <td>{chapter.Board_id}</td>
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
