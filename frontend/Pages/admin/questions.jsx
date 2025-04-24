import React, { useState, useEffect } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import GeneratePDF from "../generatePDF";

const Questionlist = ({ chapterId, formData, allData, data }) => {
  const [oneMarkQuestions, setOneMarkQuestions] = useState([]);
  const [twoMarkQuestions, setTwoMarkQuestions] = useState([]);
  const [threeMarkQuestions, setThreeMarkQuestions] = useState([]);
  const [fourMarkQuestions, setFourMarkQuestions] = useState([]);
  const [fiveMarkQuestions, setFiveMarkQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const fetch = useAuthenticatedFetch();

  // Toggle for debugging logs
  const DEBUG = true;
  const logDebug = (...args) => DEBUG && console.log(...args);

  useEffect(() => {
    if (chapterId) {
      fetchData();
    }
  }, [chapterId]);

  const fetchData = async () => {
    try {
      const response = await fetch.get("getQuestions");
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid API response: Expected an array");
      }
      const questionsData = response.data;

      // Debug: Log full API response and relevant details
      logDebug("Full questionsData:", JSON.stringify(questionsData, null, 2));
      logDebug("chapterId prop:", chapterId);
      logDebug("All questionTypes:", questionsData.map((q) => q.questionType));
      logDebug("All Chapter_ids:", questionsData.map((q) => q.Chapter_id));

      // Filter questions by type and chapterId
      const oneMarks = questionsData.filter(
        (q) => q.questionType === "OneMarks" && q.Chapter_id === chapterId
      );
      const twoMarks = questionsData.filter(
        (q) => q.questionType === "TwoMarks" && q.Chapter_id === chapterId
      );
      const threeMarks = questionsData.filter(
        (q) => q.questionType === "ThreeMarks" && q.Chapter_id === chapterId
      );
      const fourMarks = questionsData.filter(
        (q) => q.questionType === "FourMarks" && q.Chapter_id === chapterId
      );
      const fiveMarks = questionsData.filter(
        (q) => q.questionType === "FiveMarks" && q.Chapter_id === chapterId
      );

      // Debug: Log filtered results
      logDebug("OneMarks:", oneMarks);
      logDebug("TwoMarks:", twoMarks);
      logDebug("ThreeMarks:", threeMarks);
      logDebug("FourMarks:", fourMarks);
      logDebug("FiveMarks:", fiveMarks);

      // Set state for each question type
      setOneMarkQuestions(oneMarks);
      setTwoMarkQuestions(twoMarks);
      setThreeMarkQuestions(threeMarks);
      setFourMarkQuestions(fourMarks);
      setFiveMarkQuestions(fiveMarks);

      // Initialize selectedQuestions for all question types
      const initialSelection = {};
      [...oneMarks, ...twoMarks, ...threeMarks, ...fourMarks, ...fiveMarks].forEach((q) => {
        initialSelection[q._id] = false;
      });
      setSelectedQuestions(initialSelection);

      logDebug("Initial selectedQuestions:", initialSelection);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setOneMarkQuestions([]);
      setTwoMarkQuestions([]);
      setThreeMarkQuestions([]);
      setFourMarkQuestions([]);
      setFiveMarkQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (questionId) => {
    setSelectedQuestions((prev) => {
      const newSelection = { ...prev, [questionId]: !prev[questionId] };
      logDebug("Updated selectedQuestions:", newSelection);
      return newSelection;
    });
  };

  const selectedQuestionsArray = Object.keys(selectedQuestions)
    .filter((id) => selectedQuestions[id])
    .map((id) =>
      [
        ...oneMarkQuestions,
        ...twoMarkQuestions,
        ...threeMarkQuestions,
        ...fourMarkQuestions,
        ...fiveMarkQuestions,
      ].find((q) => q._id === id)
    )
    .filter((q) => q !== undefined); // Ensure no undefined entries

  logDebug("selectedQuestionsArray:", selectedQuestionsArray);

  if (!chapterId) return null;

  // Helper component to render questions of a specific type
  const RenderQuestions = ({ questions, questionType }) => {
    if (!questions.length) {
      logDebug(`No questions for ${questionType}`);
      return <p>No {questionType} questions available for this chapter.</p>;
    }

    // Check if questionList exists and is an array
    const questionList = questions[0]?.questionList || [];
    logDebug(`questionList for ${questionType}:`, questionList);

    if (!Array.isArray(questionList) || questionList.length === 0) {
      logDebug(`Invalid or empty questionList for ${questionType}:`, questions[0]);
      return <p>No questions available for {questionType}</p>;
    }

    return (
      <details open>
        <summary>
          {questionType === "OneMarks" && "નીચે આપેલા પ્રશ્નોના સંક્ષિપ્ત ઉત્તર આપો."}
          {questionType === "TwoMarks" && "નીચે આપેલા પ્રશ્નોના બે ગુણના ઉત્તર આપો."}
          {questionType === "ThreeMarks" && "નીચે આપેલા પ્રશ્નોના તણ ગુણના ઉત્તર આપો."}
          {questionType === "FourMarks" && "નીચે આપેલા પ્રશ્નોના ચાર ગુણના ઉત્તર આપો."}
          {questionType === "FiveMarks" && "નીચે આપેલા પ્રશ્નોના પાંચ ગુણના ઉત્તર આપો."}
        </summary>
        <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
          {questionList.map((q, index) => (
            <React.Fragment key={q._id}>
              <li
                className="custom-checkbox"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  padding: 0,
                }}
              >
                <input
                  type="checkbox"
                  id={`question-${q._id}`}
                  checked={selectedQuestions[q._id] || false}
                  onChange={() => handleCheckboxChange(q._id)}
                  style={{
                    margin: "0 2px 0 0",
                    padding: 0,
                    verticalAlign: "middle",
                    flexShrink: 0,
                    width: "16px",
                    height: "16px",
                  }}
                />
                <label
                  htmlFor={`question-${q._id}`}
                  style={{
                    flexGrow: 1,
                    wordBreak: "break-word",
                    margin: 0,
                    paddingLeft: "2px",
                    lineHeight: "1.2",
                    display: "inline-block",
                  }}
                >
                  {q.question || "No question text available"}
                </label>
              </li>
              {index < questionList.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </ul>
      </details>
    );
  };

  return (
    <div className="main-content">
      <div className="selecttt">
        <h2>Question List</h2>
        {loading ? (
          <p>Loading questions...</p>
        ) : (
          <>
            {oneMarkQuestions.length === 0 &&
            twoMarkQuestions.length === 0 &&
            threeMarkQuestions.length === 0 &&
            fourMarkQuestions.length === 0 &&
            fiveMarkQuestions.length === 0 ? (
              <p>No questions available for this chapter.</p>
            ) : (
              <>
                <RenderQuestions questions={oneMarkQuestions} questionType="OneMarks" />
                <RenderQuestions questions={twoMarkQuestions} questionType="TwoMarks" />
                <RenderQuestions questions={threeMarkQuestions} questionType="ThreeMarks" />
                <RenderQuestions questions={fourMarkQuestions} questionType="FourMarks" />
                <RenderQuestions questions={fiveMarkQuestions} questionType="FiveMarks" />
              </>
            )}
          </>
        )}
        <GeneratePDF
          formData={formData}
          allData={allData}
          selectedQuestions={selectedQuestionsArray}
          data={data}
        />
      </div>
    </div>
  );
};

export default Questionlist;