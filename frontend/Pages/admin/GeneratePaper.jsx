import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

const GeneratePaper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [boards, setBoards] = useState([]);
  const [standards, setStandards] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const fetch = useAuthenticatedFetch();
  const fetchData = useCallback(async () => {
    try {
      const [boardRes, stdRes, semRes, subRes,allData] = await Promise.all([
        fetch.get("getBoardData"),
        fetch.get("getStdData"),
        fetch.get("getSemData"),
        fetch.get("getSubData"),
        fetch.get("getAllData"),
      ]);
     console.log(allData,'allData')
      const boardOptions = boardRes.data.map((item) => ({
        label: item.name,
        value: item._id,
      }));

      const stdOptions = stdRes.data.map((item) => ({
        label: item.name,
        value: item.name,
      }));

      const semOptions = semRes.data.map((item) => ({
        label: item.name,
        value: item.name,
      }));

      const subOptions = subRes.data.map((item) => ({
        label: item.name,
        value: item.name,
      }));

      setBoards(boardOptions);
      setStandards(stdOptions);
      setSemesters(semOptions);
      setSubjects(subOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
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
            <select defaultValue="" onChange={handleChange}>
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
              <select defaultValue="">
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
              <select defaultValue="">
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
              <select defaultValue="">
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
