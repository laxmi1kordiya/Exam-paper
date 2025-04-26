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
    category: "ALL",
    paperDate: new Date(),
    paperType: "Weekly",
    paperDifficulty: "",
    chapter: "",
    generateType: "",
    institute: "Oxford University", // Default value for institute
    subtitle: "ABC Pvt Ltd.", // Default value for subtitle
    paperTime: "10:00 AM - 12:00 PM", // Default time
    totalMarks: 100,
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

        <div className="steps-container">
          {[1, 2, 3].map((stepNum) => (
            <div
              key={stepNum}
              className={`step ${currentStep === stepNum ? "active" : ""}`}
            >
              <div className="step-number">{stepNum}</div>
              <div className="step-content">
                <h3>
                  {stepNum === 1
                    ? "Step 1"
                    : stepNum === 2
                    ? "Step 2"
                    : "Step 3"}
                </h3>
                <p>
                  {stepNum === 1 && "Select Board, Standard, Semester, Subject"}
                  {stepNum === 2 &&
                    "Manage Paper Details Date, Time, Difficulty"}
                  {stepNum === 3 && "Choose Questions of Chapters & Subjects"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <div className="form-container">
            <div className="form-group">
              <label>Board</label>
              <select
                name="board"
                value={formData.board}
                onChange={handleChange}
              >
                <option value="">-- Select Board --</option>
                {boards.map((board, idx) => (
                  <option key={idx} value={board.value}>
                    {board.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Standard</label>
              <select
                name="standard"
                value={formData.standard}
                onChange={handleChange}
              >
                <option value="">-- Select Standard --</option>
                {standards.map((std, idx) => (
                  <option key={idx} value={std.value}>
                    {std.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">-- Select Semester --</option>
                {semesters.map((sem, idx) => (
                  <option key={idx} value={sem.value}>
                    {sem.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((sub, idx) => (
                  <option key={idx} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-container">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                min="2024-01-01"
                max="2030-12-31"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Paper Difficulty</label>
              <select
                name="paperDifficulty"
                value={formData.paperDifficulty}
                onChange={handleChange}
              >
                <option value="">-- Select Difficulty --</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-container">
            <div className="form-group">
              <label>Chapter</label>
              <select
                name="chapter"
                value={formData.chapter}
                onChange={handleChange}
              >
                <option value="">-- Select Chapter --</option>
                {chapters.map((chapter, idx) => (
                  <option key={idx} value={chapter.value}>
                    {chapter.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Generate Type</label>
              <select
                name="generateType"
                value={formData.generateType}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="Manually">Manually</option>
                <option value="Random">Random</option>
              </select>
            </div>
          </div>
        )}

        <div className="button-row">
          {currentStep > 1 && (
            <button
              className="continue-button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Back
            </button>
          )}
          {currentStep < 3 && (
            <button
              className="continue-button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Continue
            </button>
          )}
          {currentStep === 3 && (
            <button className="continue-button">Submit</button>
          )}
        </div>
      </div>

      {currentStep === 3 && (
        <Questionlist
          chapterId={formData.chapter}
          formData={formData}
          allData={allData}
          data={data}
        />
      )}
    </div>
  );
};

export default GeneratePaper;
