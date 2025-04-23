import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";

export default function QuestionTable() {
  const fetch = useAuthenticatedFetch();
  const [allData, setAllData] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [standardList, setStandardList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [all] = await Promise.all([fetch.get("getAllData")]);
      setAllData(all.data || []);

      const boardOptions = all.data.map((b) => ({
        label: b.name,
        value: b._id,
      }));
      setBoardList(boardOptions);
    } catch (err) {
      console.error(`Error fetching data`, err);
    }
  };

  const handleBoardChange = (e) => {
    const selectedId = e.target.value;
    setSelectedBoard(selectedId);
    setSelectedStandard("");
    setSelectedSubject("");
    setSelectedChapter("");
console.log(selectedId,'selectedId')
    const selectedBoard = allData.find((b) => b._id === selectedId);

    const standardOptions =
      selectedBoard?.standards?.map((s) => ({ label: s.name, value: s._id })) || [];
    setStandardList(standardOptions);

    const subjectOptions =
      selectedBoard?.subjects?.map((s) => ({ label: s.name, value: s._id })) || [];
    setSubjectList(subjectOptions);

    const chapterOptions =
      selectedBoard?.chapters?.map((c) => ({ label: c.name, value: c._id })) || [];
    setChapterList(chapterOptions);
  };

  return (
    <div>
      <h2>Question Table</h2>

      {/* Board Select */}
      <div className="mb-4">
        <label>Select Board</label>
        <select
          value={selectedBoard}
          onChange={handleBoardChange}
        >
          <option value="">All Boards</option>
          {boardList.map((board, idx) => (
            <option key={idx} value={board.value}>
              {board.label}
            </option>
          ))}
        </select>
      </div>

      {/* Standard Select */}
      <div className="mb-4">
        <label>Select Standard</label>
        <select
          value={selectedStandard}
          onChange={handleBoardChange}
        >
          <option value="">Select Standard</option>
          {standardList.map((std, idx) => (
            <option key={idx} value={std.value}>
              {std.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Select */}
      <div className="mb-4">
        <label>Select Subject</label>
        <select
          value={selectedSubject}
          onChange={handleBoardChange}
        >
          <option value="">Select Subject</option>
          {subjectList.map((subj, idx) => (
            <option key={idx} value={subj.value}>
              {subj.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chapter Select */}
      <div className="mb-4">
        <label>Select Chapter</label>
        <select
          value={selectedChapter}
          onChange={handleBoardChange}
        >
          <option value="">Select Chapter</option>
          {chapterList.map((chap, idx) => (
            <option key={idx} value={chap.value}>
              {chap.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}