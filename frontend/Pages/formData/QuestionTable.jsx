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
  const [questionList, setQuestionList] = useState([{ question: "" }]);
  const [questionType, setQuestionType] = useState("OneMarks");
  const [showModal, setShowModal] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);

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

    const selectedBoardData = allData.find((b) => b._id === selectedId);
    const standardOptions =
      selectedBoardData?.standards?.map((s) => ({
        label: s.name,
        value: s._id,
      })) || [];
    setStandardList(standardOptions);
    setSubjectList([]);
    setChapterList([]);
  };

  const handleStandardChange = (e) => {
    const selectedId = e.target.value;
    setSelectedStandard(selectedId);
    setSelectedSubject("");
    setSelectedChapter("");

    const boardData = allData.find((b) => b._id === selectedBoard);
    const subjectOptions =
      boardData?.subjects
        ?.filter((s) => s.Standard_id === selectedId)
        ?.map((s) => ({ label: s.name, value: s._id })) || [];

    setSubjectList(subjectOptions);
    setChapterList([]);
  };

  const handleSubjectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedSubject(selectedId);
    setSelectedChapter("");

    const boardData = allData.find((b) => b._id === selectedBoard);
    const chapterOptions =
      boardData?.chapters
        ?.filter((c) => c.Subject_id === selectedId)
        ?.map((c) => ({ label: c.name, value: c._id })) || [];

    setChapterList(chapterOptions);
  };

  const handleChapterChange = (e) => {
    const selectedId = e.target.value;
    setSelectedChapter(selectedId);
    const boardData = allData.find((b) => b._id === selectedBoard);
    const questionOptions = boardData?.questions?.filter(
      (q) => q.Chapter_id === selectedId
    );
    setFilteredQuestions(questionOptions);
  };

  const handleTypeChange = (e) => {
    const selectedId = e.target.value;
    console.log(selectedId, "selectedId");

    const questionOptions = filteredQuestions?.filter(
      (q) => q.questionType === selectedId
    );
    setQuestionData(questionOptions[0].questionList);
    setShowModal(false)
  };

  const handleQuestionChange = (index, value) => {
    const updatedList = [...questionList];
    updatedList[index].question = value;
    setQuestionList(updatedList);

  };

  const addNewQuestion = () => {
    setQuestionList([...questionList, { question: "" }]);
  };

  const removeQuestion = (index) => {
    const updatedList = questionList.filter((_, i) => i !== index);
    setQuestionList(updatedList);
  };

  const handleSaveQuestions = async () => {
    if (!selectedChapter) {
      alert("Please select a chapter first.");
      return;
    }

    const payload = {
      questionType,
      Chapter_id: selectedChapter,
      Board_id: selectedBoard,
      questionList: questionList.map((q) => ({
        question: q.question,
      })),
    };

    try {
      await fetch.post("/addQuestionData", payload);
      alert("Questions saved successfully!");
      setShowModal(false);
      setQuestionList([{ question: "" }]);
      document.getElementById("modal-toggle").checked = false;
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("Error saving questions.");
    }
  };
  const openModal = () => {
    setShowModal(true);
  };
  const showModals = () => {
    setShowQuestion(true);
  };
  return (
    <div className="content-page">
      <div className="main-content">
        <button onClick={() => openModal()}> Add Question</button>

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2 className="text-xl font-semibold mb-4">Add Questions</h2>

              {/* Form Starts Here */}
              <div>
                <select value={selectedBoard} onChange={handleBoardChange}>
                  <option value="">Select Board</option>
                  {boardList.map((board) => (
                    <option key={board.value} value={board.value}>
                      {board.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStandard}
                  onChange={handleStandardChange}
                >
                  <option value="">Select Standard</option>
                  {standardList.map((std) => (
                    <option key={std.value} value={std.value}>
                      {std.label}
                    </option>
                  ))}
                </select>

                <select value={selectedSubject} onChange={handleSubjectChange}>
                  <option value="">Select Subject</option>
                  {subjectList.map((subj) => (
                    <option key={subj.value} value={subj.value}>
                      {subj.label}
                    </option>
                  ))}
                </select>

                <select value={selectedChapter} onChange={handleChapterChange}>
                  <option value="">Select Chapter</option>
                  {chapterList.map((chap) => (
                    <option key={chap.value} value={chap.value}>
                      {chap.label}
                    </option>
                  ))}
                </select>

                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                >
                  <option value="OneMarks">One Marks</option>
                  <option value="TwoMarks">Two Marks</option>
                  <option value="ThreeMarks">Three Marks</option>
                </select>

                {questionList.map((q, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      className="w-full p-2 border rounded"
                      placeholder={`Question ${index + 1}`}
                    />
                    {questionList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="text-red-500 font-bold"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNewQuestion}
                  className="bg-gray-200 text-sm px-3 py-1 rounded w-fit"
                >
                  + Add Question
                </button>

                <button
                  onClick={handleSaveQuestions}
                  className="bg-green-600 text-white px-6 py-2 rounded mt-4"
                >
                  Save Questions
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <button onClick={() => showModals()}> show Question</button>

        {showQuestion && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2 className="text-xl font-semibold mb-4">
                show Questions List
              </h2>

              {/* Form Starts Here */}
              <div>
                <select value={selectedBoard} onChange={handleBoardChange}>
                  <option value="">Select Board</option>
                  {boardList.map((board) => (
                    <option key={board.value} value={board.value}>
                      {board.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStandard}
                  onChange={handleStandardChange}
                >
                  <option value="">Select Standard</option>
                  {standardList.map((std) => (
                    <option key={std.value} value={std.value}>
                      {std.label}
                    </option>
                  ))}
                </select>

                <select value={selectedSubject} onChange={handleSubjectChange}>
                  <option value="">Select Subject</option>
                  {subjectList.map((subj) => (
                    <option key={subj.value} value={subj.value}>
                      {subj.label}
                    </option>
                  ))}
                </select>

                <select value={selectedChapter} onChange={handleChapterChange}>
                  <option value="">Select Chapter</option>
                  {chapterList.map((chap) => (
                    <option key={chap.value} value={chap.value}>
                      {chap.label}
                    </option>
                  ))}
                </select>

                <select value={questionType} onChange={handleTypeChange}>
                  <option value="OneMarks">One Marks</option>
                  <option value="TwoMarks">Two Marks</option>
                  <option value="ThreeMarks">Three Marks</option>
                </select>

                <button
                  onClick={() => {
                    setShowQuestion(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>no.</th>
              <th>Question</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questionData?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.question}</td>
                <td>
                  <button onClick={() => openModal(item)}>Edit</button>
                  <button onClick={() => handleDelete(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
