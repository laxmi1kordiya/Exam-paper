import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateBoard() {
  const [showModal, setShowModal] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([]);
  const fetch = useAuthenticatedFetch();

  const handleAddBoard = async () => {
    if (!boardName.trim()) return;

    try {
      const res = await fetch.post("addBoardData", {
        name: boardName.trim(),
      });

      if (res?.code === 200) {
        setBoardName("");
        setShowModal(false);
        fetchBoards(); // Refresh list
      } else {
        console.error("Error saving board:", res);
      }
    } catch (err) {
      console.error("Failed to save board", err);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await fetch.get("getBoardData");
      setBoards(res?.data);
    } catch (err) {
      console.error("Failed to fetch boards", err);
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <h2>Board Management</h2>

        <button onClick={() => setShowModal(true)}>Add Board</button>

        {/* Modal */}
        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Add New Board</h3>
              <input
                type="text"
                placeholder="Enter board name"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleAddBoard}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Boards Table */}
        <div className="table-container">
          <h3>All Boards</h3>
          {boards.length === 0 ? (
            <p>No boards added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Board Name</th>
                </tr>
              </thead>
              <tbody>
                {boards.map((board, index) => (
                  <tr key={board.name}>
                    <td>{index + 1}</td>
                    <td>{board.name}</td>
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
