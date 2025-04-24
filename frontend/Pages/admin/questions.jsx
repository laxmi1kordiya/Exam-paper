import React, { useState, useEffect, memo } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import GeneratePDF from "../generatePDF";

// Memoize the RenderQuestions component to prevent unnecessary re-renders
const RenderQuestions = memo(({ questions, questionType, selectedQuestions, handleCheckboxChange }) => {
  if (!questions.length) {
    console.log(`No questions for ${questionType}`);
    return <p>No {questionType} questions available for this chapter.</p>;
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
        {questions.map((q, index) => (
          <React.Fragment key={q.q_id}>
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
                id={`question-${q.q_id}`}
                checked={selectedQuestions[q.q_id] || false}
                onChange={() => handleCheckboxChange(q.q_id)}
                className="smooth-checkbox"
                style={{
                  margin: "0 2px 0 0",
                  padding: 0,
                  verticalAlign: "middle",
                  flexShrink: 0,
                  width: "16px",
                  height: "16px",
                  transition: "all 0.2s ease",
                }}
              />
              <label
                htmlFor={`question-${q.q_id}`}
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
            {index < questions.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </ul>
    </details>
  );
});

const Questionlist = ({ chapterId, formData, allData, data }) => {
  const [oneMarkQuestions, setOneMarkQuestions] = useState([]);
  const [twoMarkQuestions, setTwoMarkQuestions] = useState([]);
  const [threeMarkQuestions, setThreeMarkQuestions] = useState([]);
  const [fourMarkQuestions, setFourMarkQuestions] = useState([]);
  const [fiveMarkQuestions, setFiveMarkQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const fetch = useAuthenticatedFetch();

  const DEBUG = false;
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

      logDebug("Full questionsData:", JSON.stringify(questionsData, null, 2));
      logDebug("chapterId prop:", chapterId);
      logDebug("All questionTypes:", questionsData.map((q) => q.questionType));
      logDebug("All Chapter_ids:", questionsData.map((q) => q.Chapter_id));

      const oneMarks = questionsData
        .filter((q) => q.questionType === "OneMarks" && q.Chapter_id === chapterId)
        .flatMap((q) => q.questionList);
      const twoMarks = questionsData
        .filter((q) => q.questionType === "TwoMarks" && q.Chapter_id === chapterId)
        .flatMap((q) => q.questionList);
      const threeMarks = questionsData
        .filter((q) => q.questionType === "ThreeMarks" && q.Chapter_id === chapterId)
        .flatMap((q) => q.questionList);
      const fourMarks = questionsData
        .filter((q) => q.questionType === "FourMarks" && q.Chapter_id === chapterId)
        .flatMap((q) => q.questionList);
      const fiveMarks = questionsData
        .filter((q) => q.questionType === "FiveMarks" && q.Chapter_id === chapterId)
        .flatMap((q) => q.questionList);

      logDebug("OneMarks:", oneMarks);
      logDebug("TwoMarks:", twoMarks);
      logDebug("ThreeMarks:", threeMarks);
      logDebug("FourMarks:", fourMarks);
      logDebug("FiveMarks:", fiveMarks);

      setOneMarkQuestions(oneMarks);
      setTwoMarkQuestions(twoMarks);
      setThreeMarkQuestions(threeMarks);
      setFourMarkQuestions(fourMarks);
      setFiveMarkQuestions(fiveMarks);

      const initialSelection = {};
      [...oneMarks, ...twoMarks, ...threeMarks, ...fourMarks, ...fiveMarks].forEach((q) => {
        if (q.q_id) {
          initialSelection[q.q_id] = false;
        }
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
    .map((id) => {
      const question = [
        ...oneMarkQuestions,
        ...twoMarkQuestions,
        ...threeMarkQuestions,
        ...fourMarkQuestions,
        ...fiveMarkQuestions,
      ].find((q) => q.q_id === id);
      if (question) {
        // Determine the questionType based on which array it belongs to
        let questionType = null;
        if (oneMarkQuestions.some((q) => q.q_id === id)) questionType = "OneMarks";
        else if (twoMarkQuestions.some((q) => q.q_id === id)) questionType = "TwoMarks";
        else if (threeMarkQuestions.some((q) => q.q_id === id)) questionType = "ThreeMarks";
        else if (fourMarkQuestions.some((q) => q.q_id === id)) questionType = "FourMarks";
        else if (fiveMarkQuestions.some((q) => q.q_id === id)) questionType = "FiveMarks";
        return { ...question, questionType };
      }
      return question;
    })
    .filter((q) => q !== undefined);

  logDebug("selectedQuestionsArray:", selectedQuestionsArray);

  if (!chapterId) return null;

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
                <RenderQuestions
                  questions={oneMarkQuestions}
                  questionType="OneMarks"
                  selectedQuestions={selectedQuestions}
                  handleCheckboxChange={handleCheckboxChange}
                />
                <RenderQuestions
                  questions={twoMarkQuestions}
                  questionType="TwoMarks"
                  selectedQuestions={selectedQuestions}
                  handleCheckboxChange={handleCheckboxChange}
                />
                <RenderQuestions
                  questions={threeMarkQuestions}
                  questionType="ThreeMarks"
                  selectedQuestions={selectedQuestions}
                  handleCheckboxChange={handleCheckboxChange}
                />
                <RenderQuestions
                  questions={fourMarkQuestions}
                  questionType="FourMarks"
                  selectedQuestions={selectedQuestions}
                  handleCheckboxChange={handleCheckboxChange}
                />
                <RenderQuestions
                  questions={fiveMarkQuestions}
                  questionType="FiveMarks"
                  selectedQuestions={selectedQuestions}
                  handleCheckboxChange={handleCheckboxChange}
                />
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