import React, { useState, useEffect } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function EducationManager() {
  const [section, setSection] = useState("Board");
  const fetch = useAuthenticatedFetch();
  const [formData, setFormData] = useState({
    board: "",
    standard: "",
    subject: "",
    chapter: "",
  });

  const [boards, setBoards] = useState([]);
  const [standards, setStandards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  const fetchData = async () => {
    try {
      const [b, s, su, c] = await Promise.all([
        await fetch.get("getBoardData"),
        await fetch.get("getStdData"),
        await fetch.get("getsemData"),
        await fetch.get("getSubData")
      ]);
      setBoards(b.data);
      setStandards(s.data);
      setSubjects(su.data);
      setChapters(c.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "";
    let payload = {};

    try {
      if (section === "Board") {
        url = "http://localhost:5000/boards";
        payload = { name: formData.board.trim() };
      } else if (section === "Standard") {
        url = "http://localhost:5000/standards";
        payload = { board: formData.board, name: formData.standard.trim() };
      } else if (section === "Subject") {
        url = "http://localhost:5000/subjects";
        payload = { board: formData.board, standard: formData.standard, name: formData.subject.trim() };
      } else if (section === "Chapter") {
        url = "http://localhost:5000/chapters";
        payload = { board: formData.board, standard: formData.standard, subject: formData.subject, name: formData.chapter.trim() };
      }

      if (!payload.name) return alert("Please enter a valid name!");

      await axios.post(url, payload);
      setFormData({ board: "", standard: "", subject: "", chapter: "" });
      fetchData();
    } catch (error) {
      console.error(`Error adding ${section}:`, error);
    }
  };

  const renderForm = () => {
    return (
      <div className="main-content">
      <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
        <h2>Add {section}</h2>
        {section !== "Board" && (
          <select name="board" value={formData.board} onChange={handleInputChange} required>
            <option value="">Select Board</option>
            {boards.map((b) => (
              <option key={b._id} value={b.name}>{b.name}</option>
            ))}
          </select>
        )}
        {section === "Standard" && (
          <input
            type="text"
            name="standard"
            placeholder="Enter Standard"
            value={formData.standard}
            onChange={handleInputChange}
            required
          />
        )}
        {section === "Subject" && (
          <>
            <select name="standard" value={formData.standard} onChange={handleInputChange} required>
              <option value="">Select Standard</option>
              {standards.map((s) => (
                <option key={s._id} value={s.name}>{s.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        {section === "Chapter" && (
          <>
            <select name="standard" value={formData.standard} onChange={handleInputChange} required>
              <option value="">Select Standard</option>
              {standards.map((s) => (
                <option key={s._id} value={s.name}>{s.name}</option>
              ))}
            </select>
            <select name="subject" value={formData.subject} onChange={handleInputChange} required>
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s._id} value={s.name}>{s.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="chapter"
              placeholder="Enter Chapter"
              value={formData.chapter}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        {section === "Board" && (
          <input
            type="text"
            name="board"
            placeholder="Enter Board"
            value={formData.board}
            onChange={handleInputChange}
            required
          />
        )}
        <button type="submit" style={{ marginTop: "10px" }}>Submit</button>
      </form>
      </div>
    );
  };

  const renderTable = () => {
    let rows = [];
    let headers = [];

    if (section === "Board") {
      headers = ["#", "Board"];
      rows = boards.map((item, i) => [i + 1, item.name]);
    } else if (section === "Standard") {
      headers = ["#", "Board", "Standard"];
      rows = standards.map((item, i) => [i + 1, item.board, item.name]);
    } else if (section === "Subject") {
      headers = ["#", "Board", "Standard", "Subject"];
      rows = subjects.map((item, i) => [i + 1, item.board, item.standard, item.name]);
    } else if (section === "Chapter") {
      headers = ["#", "Board", "Standard", "Subject", "Chapter"];
      rows = chapters.map((item, i) => [i + 1, item.board, item.standard, item.subject, item.name]);
    }

    return (
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length > 0 ? rows.map((r, i) => (
            <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          )) : <tr><td colSpan={headers.length}>No records found</td></tr>}
        </tbody>
      </table>
    );
  };

  return (
    <div className="main-content">
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        {["Board", "Standard", "Subject", "Chapter"].map((item) => (
          <button
            key={item}
            style={{
              marginRight: "10px",
              backgroundColor: section === item ? "#007bff" : "#6c757d",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={() => {
              setSection(item);
              setFormData({ board: "", standard: "", subject: "", chapter: "" });
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {renderForm()}
      {renderTable()}
    </div>
    </div>
  );
}
