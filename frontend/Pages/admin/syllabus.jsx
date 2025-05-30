import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { toast } from "react-toastify";
import PaperData from "./PaperData";

const Syllabus = () => {
  const fetch = useAuthenticatedFetch();
  const [boards, setBoards] = useState([]);
  const [standards, setStandards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [allData, setAllData] = useState([]);
  const [formData, setFormData] = useState({
    board: "",
    standard: "",
    subject: "",
    chapter: "",
  });

  const [syllabusData, setSyllabusData] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [{ data: boardRes }, { data: allDataRes }] = await Promise.all([
        fetch.get("getBoardData"),
        fetch.get("getAllData"),
      ]);
      setBoards(boardRes.map(({ name }) => ({ label: name, value: name })));
      setAllData(allDataRes);
    } catch (error) {
      toast.error("Failed to fetch initial data.");
    }
  }, [fetch]);

  useEffect(() => {
    fetchData();
  }, []);

  const updateForm = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      switch (name) {
        case "board": {
          const selectedBoard = allData.find((b) => b.name === value);
          setCurrentBoard(selectedBoard || null);
          setStandards(
            selectedBoard?.standards?.map(({ name, _id }) => ({
              label: name,
              value: _id,
            })) || []
          );
          setSubjects([]);
          setChapters([]);
          setFormData((prev) => ({
            ...prev,
            standard: "",
            subject: "",
            chapter: "",
          }));
          break;
        }
        case "standard": {
          const selectedBoard = allData.find((b) => b.name === formData.board);
          setSubjects(
            selectedBoard?.subjects
              ?.filter((sub) => sub.Standard_id === value)
              .map(({ name, _id }) => ({ label: name, value: _id })) || []
          );
          setChapters([]);
          setFormData((prev) => ({ ...prev, subject: "", chapter: "" }));
          break;
        }
        case "subject": {
          const selectedBoard = allData.find((b) => b.name === formData.board);
          setChapters(
            selectedBoard?.chapters
              ?.filter((ch) => ch.Subject_id === value)
              .map(({ name, _id }) => ({ label: name, value: _id })) || []
          );
          setFormData((prev) => ({ ...prev, chapter: "" }));
          break;
        }
        default:
          break;
      }
    },
    [allData, formData.board]
  );

  const handleSearch = async () => {
    try {
      const { data } = await fetch.get("getAllData");
      setAllData(data || []);

      const selectedBoard = data.find((b) => b.name === formData.board);
      setCurrentBoard(selectedBoard || null);

      if (!selectedBoard) {
        toast.error("Board not found.");
        return;
      }

      const matchedSyllabus = selectedBoard.syllabuses?.filter((entry) => {
        return (
          entry.Standard_id === formData.standard &&
          entry.Subject_id === formData.subject &&
          (!formData.chapter || entry.Chapter_id === formData.chapter)
        );
      });

      setSyllabusData(matchedSyllabus || []);
      toast.success("Syllabus filtered!");
    } catch (error) {
      console.error("Error in handleSearch:", error);
      toast.error("Error fetching syllabus data.");
    }
  };

  // Helper to get label from options list by value
  const getLabel = (arr, val) =>
    arr.find((item) => item.value === val)?.label || val;

  return (
    <div className="content-page">
      <div className="main-content">
        <PaperData
          boards={boards}
          standards={standards}
          subjects={subjects}
          chapters={chapters}
          formData={formData}
          updateForm={updateForm}
          type="syllabus"
          title="Get Syllabus Details"
        />

        <button className="button-next-blue" onClick={handleSearch}>
          Search
        </button>

        {syllabusData.length > 0 && (
          <div className="syllabus-details-container">
            <div className="syllabus-details-header">
              <strong>
                {formData.board} &gt; {getLabel(standards, formData.standard)}{" "}
                &gt; {getLabel(subjects, formData.subject)}{" "}
                {formData.chapter && (
                  <> &gt; {getLabel(chapters, formData.chapter)}</>
                )}
              </strong>
            </div>

            <div className="syllabus-details-list">
              <ol>
                {syllabusData.map((item, index) => {
                  const chapter = currentBoard?.chapters?.find(
                    (ch) => ch._id === item.Chapter_id
                  );

                  return (
                    <li key={index}>
                      <strong className="syllabus-chapter-title">
                        {chapter?.name || "Unknown Chapter"}
                      </strong>
                      <ul className="syllabus-topic-sublist">
                        {item.topics?.map((topic) => (
                          <li key={topic._id}>{topic.topic__name}</li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Syllabus;
