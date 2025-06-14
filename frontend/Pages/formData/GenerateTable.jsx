import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import QuestionTable from "./QuestionTable";

const apiEndpoints = {
  Board: {
    fetch: "getBoardData",
    add: "addBoardData",
    delete: "deleteBoardData",
  },
  Standard: {
    fetch: "getStdData",
    add: "addStandardData",
    delete: "deleteStandardData",
  },
  Subject: {
    fetch: "getsubData",
    add: "addSubjectData",
    delete: "deleteSubjectData",
  },
  Chapter: {
    fetch: "getChapterData",
    add: "addChapterData",
    delete: "deleteChapterData",
  },
  Question: {
   
  },
};

export default function ManageEducationData() {
  const fetch = useAuthenticatedFetch();
  const [activeTab, setActiveTab] = useState("Board");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const [res, all] = await Promise.all([
        fetch.get(apiEndpoints[activeTab].fetch),
        fetch.get("getAllData"),
      ]);
      setData(res.data || []);
      setAllData(all.data || []);
    } catch (err) {
      console.error(`Error fetching ${activeTab} data`, err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch.post(apiEndpoints[activeTab].add, formData);
      if (res?.code === 200) setFormData({ name: "" });
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

  const renderExtraColumns = (item) => {
    const board = allData.find((b) => b._id === item.Board_id);
    if (!board) return null;

    const standard = board.standards?.find(
      (std) => std._id === item.Standard_id
    );
    const subject = board.subjects?.find((sub) => sub._id === item.Subject_id);
    const chapter = board.chapters?.find(
      (chap) => chap._id === item.Chapter_id
    );

    return (
      <>
        {shouldShow("board") && <td>{board.name}</td>}
        {shouldShow("standard") && <td>{standard?.name}</td>}
        {shouldShow("subject") && <td>{subject?.name}</td>}
        {isQuestion && <td>{chapter?.name}</td>}
      </>
    );
  };

  const renderSelect = (label, value, options, onChange) => (
    <select className="form-control" value={value || ""} onChange={onChange}>
      <option value="">{`-- Select ${label} --`}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );

  const renderFormFields = () => {
    const boardOptions = allData.map((b) => ({ label: b.name, value: b._id }));
    const selectedBoard = allData.find((b) => b._id === formData.Board_id);
    const standardOptions =
      selectedBoard?.standards?.map((s) => ({ label: s.name, value: s._id })) ||
      [];
    const subjectOptions =
      selectedBoard?.subjects
        ?.filter((sub) => sub.Standard_id === formData.Standard_id)
        .map((sub) => ({ label: sub.name, value: sub._id })) || [];
    const chapterOptions =
      selectedBoard?.chapters
        ?.filter((chap) => chap.Subject_id === formData.Subject_id)
        .map((chap) => ({ label: chap.name, value: chap._id })) || [];

    return (
      <>
        {["Standard", "Subject", "Chapter", "Question"].includes(
          activeTab
        ) &&
          renderSelect("Board", formData.Board_id, boardOptions, (e) =>
            setFormData({
              ...formData,
              Board_id: e.target.value,
              Standard_id: "",
              Subject_id: "",
              Chapter_id: "",
            })
          )}

        {["Subject", "Chapter", "Question"].includes(activeTab) &&
          renderSelect("Standard", formData.Standard_id, standardOptions, (e) =>
            setFormData({
              ...formData,
              Standard_id: e.target.value,
              Subject_id: "",
              Chapter_id: "",
            })
          )}

        {["Chapter", "Question"].includes(activeTab) &&
          renderSelect("Subject", formData.Subject_id, subjectOptions, (e) =>
            setFormData({
              ...formData,
              Subject_id: e.target.value,
              Chapter_id: "",
            })
          )}

        {activeTab === "Question" &&
          renderSelect("Chapter", formData.Chapter_id, chapterOptions, (e) =>
            setFormData({ ...formData, Chapter_id: e.target.value })
          )}

        {activeTab === "Question" ? (
          <textarea
            className="form-control"
            placeholder={`Enter ${activeTab} Name`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        ) : (
          <input
            className="form-control"
            type="text"
            placeholder={`Enter ${activeTab} Name`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
      </>
    );
  };

  const columnsVisibility = {
    board: ["Standard",  "Subject", "Chapter", "Question"],
    standard: ["Subject", "Chapter", "Question"],
    subject: ["Chapter", "Question"],
    chapter: ["Question"],
  };

  const shouldShow = (type) =>
    columnsVisibility[type]?.includes(activeTab) || false;
  const isQuestion = activeTab === "Question";

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
                color: activeTab === tab ? "white" : "#333",
                marginRight: 5,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <h2>{activeTab} Management</h2>
        <br />
        {activeTab !== "Question" && (
          <button onClick={() => openModal()}>Add {activeTab}</button>
        )}

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>
                {selectedItem ? `Edit ${activeTab}` : `Add New ${activeTab}`}
              </h3>
              {renderFormFields()}
              <div className="modal-actions">
                <button onClick={handleSave}>
                  {selectedItem ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedItem(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="table-container" style={{ marginTop: 20 }}>
          <h3>All {activeTab}s</h3>
          {data.length === 0 && activeTab !== "Question" ? (
            <p>No {activeTab}s added yet.</p>
          ) : activeTab !== "Question" ? (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  {shouldShow("board") && <th>Board Name</th>}
                  {shouldShow("standard") && <th>Standard Name</th>}
                  {shouldShow("subject") && <th>Subject Name</th>}
                  {isQuestion && <th>Chapter Name</th>}
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
          ) : (
            <QuestionTable />
          )}
        </div>
      </div>
    </div>
  );
}