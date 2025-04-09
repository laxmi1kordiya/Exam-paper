import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

const GeneratePaper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [boards, setBoards] = useState([]);
  const [standards, setStandards] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [allData, setAllData] = useState([]);
  const fetch = useAuthenticatedFetch();
  const fetchData = useCallback(async () => {
    try {
      // const [boardRes, stdRes, semRes, subRes,allData] = await Promise.all([
      //   fetch.get("getBoardData"),
      //   fetch.get("getStdData"),
      //   fetch.get("getSemData"),
      //   fetch.get("getSubData"),
      //   fetch.get("getAllData"),
      // ]);

      const [boardRes, allData] = await Promise.all([
        fetch.get("getBoardData"),
        fetch.get("getAllData"),
      ]);
      const boardOptions = boardRes.data.map((item) => ({
        label: item.name,
        value: item.name,
      }));

      // const stdOptions = stdRes.data.map((item) => ({
      //   label: item.name,
      //   value: item.name,
      // }));

      // const semOptions = semRes.data.map((item) => ({
      //   label: item.name,
      //   value: item.name,
      // }));

      // const subOptions = subRes.data.map((item) => ({
      //   label: item.name,
      //   value: item.name,
      // }));
      setAllData(allData.data);
      setBoards(boardOptions);
      // setStandards(stdOptions);
      // setSemesters(semOptions);
      // setSubjects(subOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   console.log(allData,'allData')
  //   const selectedBoard = allData.find((board) => board.name === e.target.value);
  //   const stdOptions = selectedBoard.standards.map((std) => ({
  //     label: std.name,
  //     value: std._id,
  //   }));
  //   setStandards(stdOptions);
  // };

  const [formData, setFormData] = useState({
    board: "",
    standard: "",
    semester: "",
    subject: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Changed Field:", name, "| New Value:", value);
  
    // Keep a local copy of current formData before updating
    const updatedFormData = { ...formData, [name]: value };
  
    // Update formData
    setFormData(updatedFormData);
  
    if (name === "board") {
      const selectedBoard = allData.find((board) => board.name === value);
      console.log("📌 Selected Board:", selectedBoard);
  
      const stdOptions =
        selectedBoard?.standards?.map((std) => ({
          label: std.name,
          value: std._id,
        })) || [];
  
      console.log("📚 Standards for Board:", stdOptions);
  
      setStandards(stdOptions);
      setSemesters([]);
      setSubjects([]);
  
      setFormData((prev) => ({
        ...prev,
        standard: "",
        semester: "",
        subject: "",
      }));
    }
  
    if (name === "standard") {
      console.log(formData.board,'formData.board')
      const selectedBoard = allData.find(
        (board) => board.name === formData.board
      );
      console.log("📌 Selected Board (from formData):", selectedBoard);
  
      const semOptions =
        selectedBoard?.semesters
          ?.filter((sem) => sem.Standard_id === value)
          .map((sem) => ({
            label: sem.name,
            value: sem._id,
          })) || [];
  
      console.log("📅 Semesters for Standard:", semOptions);
  
      setSemesters(semOptions);
      setSubjects([]);
  
      setFormData((prev) => ({
        ...prev,
        semester: "",
        subject: "",
      }));
    }
  
    if (name === "semester") {
      const selectedBoard = allData.find(
        (board) => board.name === updatedFormData.board
      );
      console.log("📌 Selected Board (from updatedFormData):", selectedBoard);
      console.log("📘 Semester Value:", value);
  
      const allSubjects = selectedBoard?.subjects || [];
      console.log("📦 All Subjects in Board:", allSubjects);
  
      const subOptions =
        allSubjects
          ?.filter((sub) => sub.Semester_id === value)
          .map((sub) => ({
            label: sub.name,
            value: sub._id,
          })) || [];
  
      console.log("✅ Filtered Subjects for Semester:", subOptions);
  
      setSubjects(subOptions);
  
      setFormData((prev) => ({
        ...prev,
        subject: "",
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
        {/* Steps Section */}
        <div className="steps-container">
          {[1, 2, 3].map((stepNum) => (
            <div
              key={stepNum}
              className={`step ${currentStep === stepNum ? "active" : ""}`}
            >
              <span className="step-number">{stepNum}</span>
              {stepNum === 1 && (
                <p>Select Board, Standard, Semester, Subject</p>
              )}
              {stepNum === 2 && (
                <p>Manage Paper Details Date, Time, Difficulty</p>
              )}
              {stepNum === 3 && <p>Choose Questions of Chapters & Subjects</p>}
            </div>
          ))}
        </div>
        {/* Board Selection */}

        <div className="form-group">
          {currentStep === 1 && (
            <select name="board" value={formData.board} onChange={handleChange}>
              <option value="" disabled>
                --Board--
              </option>

              {boards.map((board, idx) => (
                <option key={idx} value={board.value}>
                  {board.label}
                </option>
              ))}
            </select>
          )}{" "}
        </div>
        {currentStep === 1 && (
          <div className="form-container">
            <div className="form-group">
              <label>Standard</label>
              <select
                name="standard"
                value={formData.standard}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Standard--
                </option>
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
                <option value="" disabled>
                  --Semester--
                </option>
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
                <option value="" disabled>
                  --Subject--
                </option>
                {subjects.map((sub, idx) => (
                  <option key={idx} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select defaultValue="ALL">
                <option value="ALL">ALL</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="form-container">
            <div className="form-group">
              <label>Paper Date</label>
              <input type="text" name="paperdate" value="07-04-2025" />
            </div>
            <div className="form-group">
              <label>Paper Type</label>

              <input type="text" name="paperType" value="Weekly" />
            </div>
            <div className="form-group">
              <label>Paper Difficulty</label>
              <select defaultValue="">
                <option value="" disabled>
                  --Difficulty--
                </option>
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
              <label>Select Chapter</label>
              <select defaultValue="">
                <option value="" disabled>
                  --Chapter--
                </option>
                <option value="Chapter1">Chapter 1</option>
                <option value="Chapter2">Chapter 2</option>
                <option value="Chapter3">Chapter 3</option>
              </select>
            </div>
            <div className="form-group">
              <label>Generate Type</label>
              <select defaultValue="">
                <option value="" disabled>
                  --Select--
                </option>
                <option value="Manually">Manually</option>
                <option value="Random">Random</option>
              </select>
            </div>
          </div>
        )}
        <div className="button-row">
          {currentStep !== 1 && (
            <button
              className="continue-button"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </button>
          )}
          {currentStep !== 3 && (
            <button
              className="continue-button"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePaper;
