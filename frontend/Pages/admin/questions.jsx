//questions.jsx

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
      console.log("Initial selectedQuestions:", initialSelection); // ADD THIS LOG
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
    console.log("selectedQuestions after change:", selectedQuestions); // ADD THIS LOG
  };

  const selectedQuestionsArray = Object.keys(selectedQuestions)
    .filter((id) => selectedQuestions[id])
    .map((id) => questions.find((q) => q._id === id));

  console.log("selectedQuestionsArray in Questionlist:", selectedQuestionsArray); // ADD THIS LOG

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
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {questions.map((q, index) => (
                <React.Fragment key={q._id}>
                  <li className="custom-checkbox" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <input
                      type="checkbox"
                      id={`question-${q._id}`}
                      checked={selectedQuestions[q._id] || false}
                      onChange={() => handleCheckboxChange(q._id)}
                      style={{ marginRight: '8px', marginTop: '4px' }}
                    />
                    <label htmlFor={`question-${q._id}`} style={{ flexGrow: 1, wordBreak: 'break-word' }}>{q.name}</label>
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