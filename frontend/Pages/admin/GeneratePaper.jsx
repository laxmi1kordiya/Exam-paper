import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import Questionlist from "./questions";

const GeneratePaper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [boards, setBoards] = useState([]);
  const [standards, setStandards] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState({});

  const fetch = useAuthenticatedFetch();

  const [formData, setFormData] = useState({
    board: "",
    standard: "",
    semester: "",
    subject: "",
    subjectName: "",
    chapter: "",
    generateType: "",
    totalMarks: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const [boardRes, allData, header] = await Promise.all([
        fetch.get("getBoardData"),
        fetch.get("getAllData"),
        fetch.get("getHeaderData"),
      ]);
      const boardOptions = boardRes.data.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setAllData(allData.data);
      setBoards(boardOptions);
      setData(header.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "board") {
      const selectedBoard = allData.find((board) => board.name === value);
      const stdOptions =
        selectedBoard?.standards?.map((std) => ({
          label: std.name,
          value: std._id,
        })) || [];

      setStandards(stdOptions);
      setSemesters([]);
      setSubjects([]);
      setChapters([]);
      setFormData((prev) => ({
        ...prev,
        standard: "",
        semester: "",
        subject: "",
        subjectName: "",
        chapter: "",
      }));
    }

    if (name === "standard") {
      const selectedBoard = allData.find(
        (board) => board.name === formData.board
      );
      const semOptions =
        selectedBoard?.semesters
          ?.filter((sem) => sem.Standard_id === value)
          .map((sem) => ({
            label: sem.name,
            value: sem._id,
          })) || [];

      setSemesters(semOptions);
      setSubjects([]);
      setChapters([]);
      setFormData((prev) => ({
        ...prev,
        semester: "",
        subject: "",
        subjectName: "",
        chapter: "",
      }));
    }

    if (name === "semester") {
      const selectedBoard = allData.find(
        (board) => board.name === formData.board
      );
      const subOptions =
        selectedBoard.subjects
          .filter((sub) => sub.Semester_id === value)
          .map((sub) => ({
            label: sub.name,
            value: sub._id,
          })) || [];

      setSubjects(subOptions);
      setChapters([]);
      setFormData((prev) => ({
        ...prev,
        subject: "",
        subjectName: "",
        chapter: "",
      }));
    }

    if (name === "subject") {
      const selectedBoard = allData.find(
        (board) => board.name === formData.board
      );
      const chOptions =
        selectedBoard.chapters
          .filter((ch) => ch.Subject_id === value)
          .map((ch) => ({
            label: ch.name,
            value: ch._id,
          })) || [];

      setChapters(chOptions);
      setFormData((prev) => ({
        ...prev,
        chapter: "",
      }));
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <div className="header">
          <div className="title-container">
            <h2>Generate Paper</h2>
            <p>Generate Paper of Your Choice</p>
          </div>
        </div>

        <div className="form-container">
          <div className="form-group">
            <select name="board" value={formData.board} onChange={handleChange}>
              <option value="">--Select Board--</option>
              {boards.map((board, idx) => (
                <option key={idx} value={board.value}>
                  {board.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              name="standard"
              value={formData.standard}
              onChange={handleChange}
            >
              <option value="">--Select Standard--</option>
              {standards.map((std, idx) => (
                <option key={idx} value={std.value}>
                  {std.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            >
              <option value="">--Select Semester--</option>
              {semesters.map((sem, idx) => (
                <option key={idx} value={sem.value}>
                  {sem.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">--Select Subject--</option>
              {subjects.map((sub, idx) => (
                <option key={idx} value={sub.value}>
                  {sub.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
            >
              <option value="">--Select Chapter--</option>
              {chapters.map((chapter, idx) => (
                <option key={idx} value={chapter.value}>
                  {chapter.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              name="generateType"
              value={formData.generateType}
              onChange={handleChange}
            >
              <option value="">--Generate Type--</option>
              <option value="Manually">Manually</option>
              <option value="Random">Random</option>
            </select>
          </div>
        </div>
        <Questionlist
        chapterId={formData.chapter}
        formData={formData}
        allData={allData}
        data={data}
      />
        </div>
      </div>
  );
};

export default GeneratePaper;
