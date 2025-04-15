import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function ManageEducationData() {
  const fetch = useAuthenticatedFetch();
  const [activeTab, setActiveTab] = useState("Board");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [selectedItem, setSelectedItem] = useState(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const apiEndpoints = {
    Board: { fetch: "getBoardData", add: "addBoardData", delete: "deleteBoardData" },
    Standard: { fetch: "getStdData", add: "addStandardData", delete: "deleteStandardData" },
    Semester: { fetch: "getsemData", add: "addSemesterData", delete: "deleteSemesterData" },
    Subject: { fetch: "getsubData", add: "addSubjectData", delete: "deleteSubjectData" },
    Chapter: { fetch: "getChapterData", add: "addChapterData", delete: "deleteChapterData" },
  };

  const fetchData = async () => {
    try {
      const res = await fetch.get(apiEndpoints[activeTab].fetch);
      setData(res.data || []);
      const all = await fetch.get("getAllData");
      setAllData(all.data || []);
    } catch (err) {
      console.error(`Error fetching ${activeTab} data`, err);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedItem) {
        console.log("No update API provided, skipping update logic.");
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
    if (item) {
      setSelectedItem(item);
      setFormData(item);
    } else {
      setSelectedItem(null);
      setFormData({ name: "" });
    }
    setShowModal(true);
  };

  const renderExtraColumns = (item) => {
    const board = allData.find((b) => b._id === item.Board_id);
    if (!board) return null;

    switch (activeTab) {
      case "Standard":
        return <td>{board.name}</td>;
      case "Semester":
        return (
          <>
            <td>{board.name}</td>
            <td>{board.standards?.find((std) => std._id === item.Standard_id)?.name}</td>
          </>
        );
      case "Subject":
        return (
          <>
            <td>{board.name}</td>
            <td>{board.standards?.find((std) => std._id === item.Standard_id)?.name}</td>
            <td>{board.semesters?.find((sem) => sem._id === item.Semester_id)?.name}</td>
          </>
        );
      case "Chapter":
        return (
          <>
            <td>{board.name}</td>
            <td>{board.standards?.find((std) => std._id === item.Standard_id)?.name}</td>
            <td>{board.subjects?.find((sub) => sub._id === item.Subject_id)?.name}</td>
          </>
        );
      default:
        return null;
    }
  };

  const renderFormFields = () => {
    const boardOptions = allData.map((b) => ({ label: b.name, value: b._id }));
    const selectedBoard = allData.find(b => b._id === formData.Board_id);

    const standardOptions = selectedBoard?.standards?.map(s => ({ label: s.name, value: s._id })) || [];
    const selectedStandard = selectedBoard?.standards?.find(s => s._id === formData.Standard_id);

    const semesterOptions = selectedBoard?.semesters?.map(sem => ({ label: sem.name, value: sem._id })) || [];
    const subjectOptions = selectedBoard?.subjects?.map(sub => ({ label: sub.name, value: sub._id })) || [];

    return (
      <>
        {["Standard", "Semester", "Subject", "Chapter"].includes(activeTab) && (
          <select
            value={formData.Board_id || ""}
            onChange={(e) => setFormData({ ...formData, Board_id: e.target.value, Standard_id: "", Semester_id: "", Subject_id: "" })}
          >
            <option value="">-- Select Board --</option>
            {boardOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {["Semester", "Subject", "Chapter"].includes(activeTab) && (
          <select
            value={formData.Standard_id || ""}
            onChange={(e) => setFormData({ ...formData, Standard_id: e.target.value, Semester_id: "", Subject_id: "" })}
          >
            <option value="">-- Select Standard --</option>
            {standardOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {["Subject"].includes(activeTab) && (
          <select
            value={formData.Semester_id || ""}
            onChange={(e) => setFormData({ ...formData, Semester_id: e.target.value })}
          >
            <option value="">-- Select Semester --</option>
            {semesterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {["Chapter"].includes(activeTab) && (
          <select
            value={formData.Subject_id || ""}
            onChange={(e) => setFormData({ ...formData, Subject_id: e.target.value })}
          >
            <option value="">-- Select Subject --</option>
            {subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder={`Enter ${activeTab} Name`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </>
    );
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <div className="button-group" style={{ marginBottom: 20 }}>
          {Object.keys(apiEndpoints).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? "#4CAF50" : "#e0e0e0",
                color: activeTab === tab ? "white" :  "#333",
                marginRight: 5,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <h2>{activeTab} Management</h2><br></br>
        <button onClick={() => openModal()}>Add {activeTab}</button>

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>{selectedItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}</h3>
              {renderFormFields()}
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
                  {["Standard", "Semester", "Subject", "Chapter"].includes(activeTab) && <th>Board Name</th>}
                  {["Semester", "Subject", "Chapter"].includes(activeTab) && <th>Standard Name</th>}
                  {["Subject"].includes(activeTab) && <th>Semester Name</th>}
                  {["Chapter"].includes(activeTab) && <th>Subject Name</th>}
                  <th>{activeTab} Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    {renderExtraColumns(item)}
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
  );
}
