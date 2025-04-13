import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function GenerateBoard() {
  const [showModal, setShowModal] = useState(false);
  const [fromData, setFormData] = useState({ name: "" });
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const fetch = useAuthenticatedFetch();

  const handleAddBoard = async () => {
    try {
      await fetch.post("addBoardData", fromData);
      setShowModal(false);
      fetchBoards();
    } catch (err) {
      console.error("Failed to save board", err);
    }
  };
  const handleOpenModal = (board = null) => {
    setSelectedBoard(board);
    setShowModal(true);
    setFormData(board);
  };

  const handleDeleteBoard = async (row) => {
    try {
      await fetch.delete(`deleteBoardData/${row._id}`);
      fetchBoards();
    } catch (err) {
      console.error("Failed to delete board", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
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
              <h3>{selectedBoard ? "Edit Board" : "Add New Board"}</h3>
              <input
                type="text"
                placeholder="Enter board name"
                value={fromData.name}
                onChange={(e) => handleChange(e)}
              />
              <div className="modal-actions">
                <button onClick={handleAddBoard}>
                  {selectedBoard ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedBoard(null);
                  }}
                >
                  Cancel
                </button>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {boards.map((board, index) => (
                  <tr key={board.name}>
                    <td>{index + 1}</td>
                    <td>{board.name}</td>
                    <td>
                      <button onClick={() => handleOpenModal(board)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteBoard(board)}>
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
