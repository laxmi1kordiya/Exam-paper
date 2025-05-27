import React, { useState, useEffect, memo } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { navigate } from "../../Components/NavigationMenu";
import { findData } from "../../Utils/AppUtils";

const RenderQuestions = memo(
  ({ questions, questionType, selectedQuestions, handleCheckboxChange, board }) => {
    if (!questions || questions.length === 0) return null;

    let summaryText = "";
    let mark = "";
    switch (questionType) {
      case "OneMarks":
        summaryText = board === "GSEB-GUJ" ? "નીચે આપેલા પ્રશ્નોના ટુંકમાં જવાબ આપો." : "Answer the following questions briefly.";
        mark = 1;
        break;
      case "TwoMarks":
        summaryText = board === "GSEB-GUJ" ? "નીચે આપેલા બે ગુણના પ્રશ્નોના જવાબ આપો." : "Answer the following questions with two marks each.";
        mark = 2;
        break;
      case "ThreeMarks":
        summaryText = board === "GSEB-GUJ" ? "નીચે આપેલા ત્રણ ગુણના પ્રશ્નોના જવાબ આપો." : "Answer the following questions with three marks each.";
        mark = 3;
        break;
      case "FourMarks":
        summaryText = board === "GSEB-GUJ" ? "નીચે આપેલા ચાર ગુણના પ્રશ્નોના જવાબ આપો." : "Answer the following questions with four marks each.";
        mark = 4;
        break;
      case "FiveMarks":
        summaryText = board === "GSEB-GUJ" ? "નીચે આપેલા પાંચ ગુણના પ્રશ્નોના જવાબ આપો." : "Answer the following questions with five marks each.";
        mark = 5;
        break;
      default:
        return null;
    }

    return (
      <details>
        <summary>{summaryText}</summary>
        <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
          {questions.map((q) => (
            <li className="custom-checkbox" key={q.q_id}>
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
              <div htmlFor={`question-${q.q_id}`} className="question">
                {q.question || "No question text available"}
              </div>
              <div className="mark">{mark}</div>
            </li>
          ))}
        </ul>
      </details>
    );
  }
);

const Questionlist = ({ chapterIds, formData, allData, headerData }) => {
  const [questionsByType, setQuestionsByType] = useState({
    OneMarks: [],
    TwoMarks: [],
    ThreeMarks: [],
    FourMarks: [],
    FiveMarks: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const fetch = useAuthenticatedFetch();
  const setNavigate = navigate();

  useEffect(() => {
    if (chapterIds?.length > 0) {
      fetchData();
    }
  }, [chapterIds]);

  const fetchData = async () => {
    try {
      const response = await fetch.get("getQuestions");
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid API response");
      }

      const allQuestions = response.data;
      const questionTypes = ["OneMarks", "TwoMarks", "ThreeMarks", "FourMarks", "FiveMarks"];
      const updated = {};
      const initialSelection = {};

      questionTypes.forEach((type) => {
        updated[type] = allQuestions
          .filter((q) => q.questionType === type && chapterIds.includes(q.Chapter_id))
          .flatMap((q) => q.questionList || []);
        updated[type].forEach((q) => {
          if (q.q_id) initialSelection[q.q_id] = false;
        });
      });

      setQuestionsByType(updated);
      setSelectedQuestions(initialSelection);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (questionId) => {
    setSelectedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const selectedQuestionsArray = Object.keys(selectedQuestions)
    .filter((id) => selectedQuestions[id])
    .map((id) => {
      let question, questionType = null;
      for (const [type, list] of Object.entries(questionsByType)) {
        question = list.find((q) => q.q_id === id);
        if (question) {
          questionType = type;
          break;
        }
      }
      return question ? { ...question, questionType } : undefined;
    })
    .filter(Boolean);

  const totalMarks = selectedQuestionsArray.reduce((sum, q) => {
    switch (q.questionType) {
      case "OneMarks": return sum + 1;
      case "TwoMarks": return sum + 2;
      case "ThreeMarks": return sum + 3;
      case "FourMarks": return sum + 4;
      case "FiveMarks": return sum + 5;
      default: return sum;
    }
  }, 0);

  const handleChange = async () => {
    headerData.totalMarks = totalMarks;
    const payload = {
      paperSetting: {
        board: formData.board,
        standard: findData(formData, allData, "standard"),
        subject: findData(formData, allData, "subject"),
        formData,
        allData,
        headerData,
        selectedQuestionsArray,
      },
      userId: localStorage.getItem("userId"),
    };
    await fetch.post("AddPaper", payload);
    setNavigate("/admin/my-papers");
  };

  if (!chapterIds || chapterIds.length === 0) return null;

  return (
    <>
      <h2 className="pricing-title">Question List</h2>
      <p className="pricing-subtitle">Set the Question for your exam paper.</p>

      <div>
        {loading ? (
          <p className="loading">Loading questions...</p>
        ) : (
          <>
            {Object.values(questionsByType).every((arr) => arr.length === 0) ? (
              <p className="no-questions">No questions available for selected chapters.</p>
            ) : (
              <>
                {["OneMarks", "TwoMarks", "ThreeMarks", "FourMarks", "FiveMarks"].map((type) => (
                  <RenderQuestions
                    key={type}
                    questions={questionsByType[type]}
                    questionType={type}
                    selectedQuestions={selectedQuestions}
                    handleCheckboxChange={handleCheckboxChange}
                    board={formData.board}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <button onClick={handleChange}>Download</button>
      {selectedQuestionsArray.length > 0 && (
        <div className="total-marks-display">
          <strong>Total Marks:</strong> {totalMarks}
        </div>
      )}
    </>
  );
};

export default Questionlist;
