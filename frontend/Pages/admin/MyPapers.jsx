import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import GeneratePDF from "../generatePDF";

const MyPapers = () => {
  const [myPapers, setMyPapers] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const fetch = useAuthenticatedFetch();
  const fetchData = async () => {
    try {
      const { data } = await fetch.get("getMyPapers");
      const header = await fetch.get("getHeaderData");
      setHeaderData(header?.data);
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
        <div className="attention">
          <b>Attention:</b>
          <br></br>
          <span className="warning">
            1.The generated paper will be saved for 30 days.
          </span>
          <br></br>
          <span className="warning">
            2.You can edit the paper within 7 days of creation.
          </span>
          <br></br>
        </div>

        <table>
          <tbody>
            {myPapers.map((paper) => (
              <tr key={paper._id}>
                <td>
                  {`${paper?.paperSetting?.board} >> ${paper?.paperSetting?.standard} >> ${paper?.paperSetting?.subject}`}
                </td>

                <td>
                  {new Date(paper.created).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <GeneratePDF
                    formData={paper?.paperSetting?.formData}
                    allData={paper?.paperSetting?.allData}
                    selectedQuestions={
                      paper?.paperSetting?.selectedQuestionsArray
                    }
                    headerData={headerData}
                  />
                  <button>Answer Key</button>
                  <button
                    onClick={() => {
                      deletePaperData(paper._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPapers;
