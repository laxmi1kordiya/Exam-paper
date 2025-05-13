import React, { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { generateObjectId } from "../../Utils/AppUtils";

export default function SyllabusManager() {
  const fetch = useAuthenticatedFetch();
  const [allData, setAllData] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [standardList, setStandardList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [topicList, setTopicList] = useState([
    { topic__name: "", t_id: generateObjectId() },
  ]);

  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [existingTopics, setExistingTopics] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await fetch.get("getAllData");
    setAllData(data || []);
    const boards = data.map((b) => ({ label: b.name, value: b._id }));
    setBoardList(boards);
  };

  const resetBelow = (level) => {
    if (level === "board") {
      setSelectedStandard(""); setStandardList([]);
      setSelectedSubject(""); setSubjectList([]);
      setSelectedChapter(""); setChapterList([]);
      setTopicList([{ topic__name: "", t_id: generateObjectId() }]);
      setExistingTopics([]);
    }
    if (level === "standard") {
      setSelectedSubject(""); setSubjectList([]);
      setSelectedChapter(""); setChapterList([]);
      setTopicList([{ topic__name: "", t_id: generateObjectId() }]);
      setExistingTopics([]);
    }
    if (level === "subject") {
      setSelectedChapter(""); setChapterList([]);
      setTopicList([{ topic__name: "", t_id: generateObjectId() }]);
      setExistingTopics([]);
    }
  };

  const handleBoardChange = (e) => {
    const id = e.target.value;
    setSelectedBoard(id);
    resetBelow("board");
    const board = allData.find((b) => b._id === id);
    const stds = board?.standards?.map((s) => ({ label: s.name, value: s._id })) || [];
    setStandardList(stds);
  };

  const handleStandardChange = (e) => {
    const id = e.target.value;
    setSelectedStandard(id);
    resetBelow("standard");

    const board = allData.find((b) => b._id === selectedBoard);
    const subs = board?.subjects?.filter((s) => s.Standard_id === id)
      .map((s) => ({ label: s.name, value: s._id })) || [];
    setSubjectList(subs);
  };

  const handleSubjectChange = (e) => {
    const id = e.target.value;
    setSelectedSubject(id);
    resetBelow("subject");

    const board = allData.find((b) => b._id === selectedBoard);
    const chaps = board?.chapters?.filter((c) => c.Subject_id === id)
      .map((c) => ({ label: c.name, value: c._id })) || [];
    setChapterList(chaps);
  };

  const handleChapterChange = (e) => {
    const id = e.target.value;
    setSelectedChapter(id);

    const board = allData.find((b) => b._id === selectedBoard);
    const chapter = board?.chapters?.find((c) => c._id === id);
    setExistingTopics(chapter?.topics || []);
    setTopicList([{ topic__name: "", t_id: generateObjectId() }]);
  };

  const handleTopicChange = (index, value) => {
    const updated = [...topicList];
    updated[index].topic__name = value;
    setTopicList(updated);
  };

  const addNewTopic = () => {
    setTopicList([...topicList, { topic__name: "", t_id: generateObjectId() }]);
  };

  const removeTopic = (index) => {
    setTopicList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveTopics = async () => {
    const payload = {
      Chapter_id: selectedChapter,
      Board_id: selectedBoard,
      Standard_id: selectedStandard,
      Subject_id: selectedSubject,
      topics: topicList,
    };
    console.log("Saving syllabus:", payload);
    await fetch.post("addSyllabusData", payload);
    alert("Topics saved successfully!");
    fetchData();
  };

  const handleDeleteTopic = async (topic) => {
    await fetch.delete(`deleteOneTopic/${selectedChapter}/${topic.t_id}`);
    alert("Topic deleted");
    fetchData();
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <div>
          <select value={selectedBoard} onChange={handleBoardChange}>
            <option value="">Select Board</option>
            {boardList.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>

          <select value={selectedStandard} onChange={handleStandardChange}>
            <option value="">Select Standard</option>
            {standardList.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <select value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Select Subject</option>
            {subjectList.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <select value={selectedChapter} onChange={handleChapterChange}>
            <option value="">Select Chapter</option>
            {chapterList.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <h4>Add New Topics</h4>
          {topicList.map((t, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "10px", gap: "10px" }}>
              <input
                type="text"
                value={t.topic__name}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                placeholder={`Topic ${index + 1}`}
              />
              {topicList.length > 1 && (
                <button type="button" onClick={() => removeTopic(index)}>×</button>
              )}
            </div>
          ))}

          <button type="button" onClick={addNewTopic} style={{ margin: "10px" }}>
            + Add Topic
          </button>

          <button onClick={handleSaveTopics} style={{ margin: "10px" }}>
            Save Topics
          </button>

          <h4>Existing Topics</h4>
          <ul>
            {existingTopics.map((t, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                {t.topic__name}
                <button style={{ marginLeft: "10px" }} onClick={() => handleDeleteTopic(t)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}