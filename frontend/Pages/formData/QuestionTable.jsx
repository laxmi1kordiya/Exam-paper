import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { generateObjectId } from "../../Utils/AppUtils";

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
  const [questionList, setQuestionList] = useState([
    { question: "", answer: "", q_id: generateObjectId() },
  ]);
  const [questionType, setQuestionType] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [fetchQuestion, setFetchQuestion] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await fetch.get("getAllData");
      setAllData(data || []);

      const boardOptions = (data || []).map((b) => ({
        label: b.name,
        value: b._id,
      }));
      setBoardList(boardOptions);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const resetSelections = (level) => {
    if (level === "board") {
      setSelectedStandard("");
      setSelectedSubject("");
      setSelectedChapter("");
      setStandardList([]);
      setSubjectList([]);
      setChapterList([]);
    }
    if (level === "standard") {
      setSelectedSubject("");
      setSelectedChapter("");
      setSubjectList([]);
      setChapterList([]);
    }
    if (level === "subject") {
      setSelectedChapter("");
      setChapterList([]);
    }
  };

  const handleBoardChange = (e) => {
    const id = e.target.value;
    setSelectedBoard(id);
    resetSelections("board");

    const board = allData.find((b) => b._id === id);
    const standards =
      board?.standards?.map((s) => ({ label: s.name, value: s._id })) || [];
    setStandardList(standards);
  };

  const handleStandardChange = (e) => {
    const id = e.target.value;
    setSelectedStandard(id);
    resetSelections("standard");

    const board = allData.find((b) => b._id === selectedBoard);
    const subjects =
      board?.subjects
        ?.filter((s) => s.Standard_id === id)
        ?.map((s) => ({ label: s.name, value: s._id })) || [];
    setSubjectList(subjects);
  };

  const handleSubjectChange = (e) => {
    const id = e.target.value;
    setSelectedSubject(id);
    resetSelections("subject");

    const board = allData.find((b) => b._id === selectedBoard);
    const chapters =
      board?.chapters
        ?.filter((c) => c.Subject_id === id)
        ?.map((c) => ({ label: c.name, value: c._id })) || [];
    setChapterList(chapters);
  };

  const handleChapterChange = (e) => {
    const id = e.target.value;
    setSelectedChapter(id);

    const board = allData.find((b) => b._id === selectedBoard);
    const questions =
      board?.questions?.filter((q) => q.Chapter_id === id) || [];
    setFilteredQuestions(questions);
    setQuestionData([]);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setQuestionType(type);

    const questions = filteredQuestions?.filter((q) => q.questionType === type);
    setSelectedQuestion(questions[0]?._id);
    setFetchQuestion([...questions[0]?.questionList]);
    const combinedQuestions = questions.flatMap((q) => q.questionList || []);
    setQuestionData(combinedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questionList];
    updated[index][field] = value;
    setQuestionList(updated);
  };

  const addNewQuestion = () => {
    setQuestionList([
      ...questionList,
      { question: "", answer: "", q_id: generateObjectId() },
    ]);
  };

  const removeQuestion = (index) => {
    setQuestionList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveQuestions = async () => {
    const fetchMap = new Map(fetchQuestion.map((q) => [q.q_id, q]));

    questionList.forEach((updated) => {
      fetchMap.set(updated.q_id, updated);
    });

    const updatedList = Array.from(fetchMap.values());

    const payload = {
      questionType: questionType,
      Chapter_id: selectedChapter,
      Board_id: selectedBoard,
      questionList: updatedList,
    };

    await fetch.post("addQuestionData", payload);
    alert("Questions saved successfully!");
    window.location.reload();
  };

  const openModal = (row) => {
    setQuestionList([
      ...questionList,
      { question: row.question, answer: row.answer, q_id: row.q_id },
    ]);
  };

  const handleDelete = async (item) => {
    const mainId = selectedQuestion;
    const questionId = item.q_id;
    await fetch.delete(`deleteOneQuestion/${mainId}/${questionId}`);
    window.location.reload();
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <div>
          <select value={selectedBoard} onChange={handleBoardChange}>
            <option value="">Select Board</option>
            {boardList.map((board) => (
              <option key={board.value} value={board.value}>
                {board.label}
              </option>
            ))}
          </select>

          <select value={selectedStandard} onChange={handleStandardChange}>
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
            <option value="">Question Type</option>
            <option value="OneMarks">One Marks</option>
            <option value="TwoMarks">Two Marks</option>
            <option value="ThreeMarks">Three Marks</option>
            <option value="FourMarks">Four Marks</option>
            <option value="FiveMarks">Five Marks</option>
          </select>

          {questionList.map((q, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <label>Question {index + 1}</label>
              <textarea
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                placeholder="Enter question here..."
                rows={4}
                style={{ width: "100%" }}
              />
              <label>Answer {index + 1}</label>
              <textarea
                value={q.answer}
                onChange={(e) =>
                  handleQuestionChange(index, "answer", e.target.value)
                }
                placeholder="Enter answer here..."
                rows={4}
                style={{ width: "100%" }}
              />
              {questionList.length > 1 && (
                <button type="button" onClick={() => removeQuestion(index)}>
                  × Remove
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addNewQuestion} style={{ margin: "10px" }}>
            + Add Question
          </button>

          <button onClick={handleSaveQuestions} style={{ margin: "10px" }}>
            Save Questions
          </button>
        </div>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>No.</th>
              <th>Question</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questionData.map((item, index) => (
              <tr key={index}>
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