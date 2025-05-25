import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import GenerateAnsKey from "../GenerateAnsKey";
import GeneratePDF from "../GeneratePDF";

const MyPapers = () => {
  const [myPapers, setMyPapers] = useState([]);
  const [headerData] = useState([]);
  const fetch = useAuthenticatedFetch();

  const fetchData = async () => {
    try {
      const { data } = await fetch.get("getMyPapers");
      setMyPapers(data || []);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePaperData = async (id) => {
    try {
      await fetch.delete(`deleteMyPapers/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting paper", err);
    }
  };

  return (
    <div className="content-page">
      <div className="main-content">
      <h2 className="pricing-title">My Papers</h2>
        {/* <p className="pricing-subtitle">View and manage your generated exam papers</p> */}
       
        <div className="alert alert-info">
          <div className="alert-icon">ℹ️</div>
          <div className="alert-content">
            <strong>Note:</strong> Generated papers will be automatically deleted after 30 days.
          </div>
        </div>

        <div className="papers-table">
        {myPapers.length !== 0 && (
          <div className="table-header">
            <div className="col-details">Paper Details</div>
            <div className="col-date">Created Date</div>
            <div className="col-actions">Actions</div>
          </div>
        )}
          
          {myPapers.map((paper) => (
            <div key={paper._id} className="table-row">
              <div className="col-details">
                <div className="paper-info">
                  <div className="paper-title">
                    {paper?.paperSetting?.board} - {paper?.paperSetting?.standard}
                  </div>
                  <div className="paper-subject">{paper?.paperSetting?.subject}</div>
                </div>
              </div>

              <div className="col-date">
                {new Date(paper.created).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <div className="col-actions">
                <GeneratePDF
                  formData={paper?.paperSetting?.formData}
                  allData={paper?.paperSetting?.allData}
                  selectedQuestions={paper?.paperSetting?.selectedQuestionsArray}
                  headerData={paper?.paperSetting?.headerData}
                  totalMarks={paper?.paperSetting?.totalMarks}
                />
                <GenerateAnsKey
                  formData={paper?.paperSetting?.formData}
                  allData={paper?.paperSetting?.allData}
                  selectedQuestions={paper?.paperSetting?.selectedQuestionsArray}
                  headerData={paper?.paperSetting?.headerData}
                  totalMarks={paper?.paperSetting?.totalMarks}
                />
                <button
                  className="btn-delete"
                  onClick={() => deletePaperData(paper._id)}
                  title="Delete paper"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {myPapers.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h3>No Papers Found</h3>
            <p>You haven't generated any exam papers yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPapers;