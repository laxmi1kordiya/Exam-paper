import React, { useState, useEffect } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import GeneratePDF from "../generatePDF";

const Questionlist = ({ chapterId, formData, allData, data }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetch = useAuthenticatedFetch();
  const [selectedQuestions, setSelectedQuestions] = useState({});

  useEffect(() => {
    if (chapterId) {
      fetchData();
    }
  }, [chapterId]);

  const fetchData = async () => {
    try {
      const response = await fetch.get("getQuestions");
      const questionsData = Array.isArray(response.data) ? response.data : [];
      const filteredQuestions = questionsData.filter(
        (q) => q.Chapter_id === chapterId
      );
      console.log(filteredQuestions, "filteredQuestions");
      setQuestions(filteredQuestions);
      const initialSelection = {};
      filteredQuestions.forEach((q) => {
        initialSelection[q._id] = false;
      });
      setSelectedQuestions(initialSelection);
      console.log("Initial selectedQuestions:", initialSelection);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (questionId) => {
    setSelectedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
    console.log("selectedQuestions after change:", selectedQuestions);
  };

  const selectedQuestionsArray = Object.keys(selectedQuestions)
    .filter((id) => selectedQuestions[id])
    .map((id) => questions.find((q) => q._id === id));

  console.log("selectedQuestionsArray in Questionlist:", selectedQuestionsArray);

  if (!chapterId) return null;

  return (
    <div className="main-content">
      <div className="selecttt">
        <h2>Question List</h2>
        {loading ? (
          <p>Loading questions...</p>
        ) : questions.length > 0 ? (
          <details open>
            <summary>Questions ({questions.length})</summary>
            <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
              {questions.map((q, index) => (
                <React.Fragment key={q._id}>
                  <li
                    className="custom-checkbox"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                      padding: 0, // Reset padding that might come from custom-checkbox
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`question-${q._id}`}
                      checked={selectedQuestions[q._id] || false}
                      onChange={() => handleCheckboxChange(q._id)}
                      style={{
                        margin: "0 2px 0 0", // Tighten the space: no left margin, 2px right margin
                        padding: 0, // Reset any default padding
                        verticalAlign: "middle",
                        flexShrink: 0, // Prevent checkbox from shrinking
                        width: "16px", // Consistent size
                        height: "16px",
                      }}
                    />
                    <label
                      htmlFor={`question-${q._id}`}
                      style={{
                        flexGrow: 1,
                        wordBreak: "break-word",
                        margin: 0, // Remove any default margin
                        paddingLeft: "2px", // Minimal spacing between checkbox and text
                        lineHeight: "1.2", // Tighten line height for better alignment
                        display: "inline-block", // Ensure label behaves correctly
                      }}
                    >
                      {q.name}
                    </label>
                  </li>
                  {index < questions.length - 1 && <hr />}
                </React.Fragment>
              ))}
            </ul>
          </details>
        ) : (
          <p>No questions available for this chapter.</p>
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