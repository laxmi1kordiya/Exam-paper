import React, { useState, useEffect } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

const Questionlist = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch.get("getQuestions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

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
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default Questionlist;
