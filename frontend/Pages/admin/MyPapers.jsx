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
    <>
      <div className="content-page">
        <div className="main-content">
          <div className="banner">
            <div className="attention">
              <b>Attention:</b>
              <br></br>
              <span className="warning">
                ➤ The Generated Paper will be saved for 30 days.
              </span>
              <br></br>
            </div>
          </div>
          <table>
            <tbody>
              {myPapers.map((paper) => (
                <tr key={paper._id}>
                  <td>
                    <span className="paper-info">
                      {`${paper?.paperSetting?.board} >> ${paper?.paperSetting?.standard} >> ${paper?.paperSetting?.subject}`}
                    </span>
                  </td>

                  <td>
                    <span className="paper-date">
                      {new Date(paper.created).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td>
                    <td className="button-group">
                      <GeneratePDF
                        formData={paper?.paperSetting?.formData}
                        allData={paper?.paperSetting?.allData}
                        selectedQuestions={
                          paper?.paperSetting?.selectedQuestionsArray
                        }
                        headerData={paper?.paperSetting?.headerData}
                      />

                      <GenerateAnsKey
                        formData={paper?.paperSetting?.formData}
                        allData={paper?.paperSetting?.allData}
                        selectedQuestions={
                          paper?.paperSetting?.selectedQuestionsArray
                        }
                        headerData={paper?.paperSetting?.headerData}
                      />

                      <button
                        className="delete"
                        onClick={() => deletePaperData(paper._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyPapers;