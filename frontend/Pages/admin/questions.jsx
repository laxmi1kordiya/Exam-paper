import React, { useState, useEffect } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

const Questionlist = ({ chapterId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    if (chapterId) {
      fetchData();
    }
  }, [chapterId]);

  const fetchData = async () => {
    try {
      const response = await fetch.get("getQuestions");
      const filteredQuestions = response.data.filter(
        (q) => q.Chapter_id === chapterId
      );
      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

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
            <ul>
              {questions.map((q) => (
                <li key={q._id} className="custom-checkbox">
                  {q.question}
                </li>
              ))}
            </ul>
          </details>
        ) : (
          <p>No questions available for this chapter.</p>
        )}
      </div>
    </div>
  );
};

export default Questionlist;
