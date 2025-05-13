import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import FilterData from "./FilterData";
import { toast } from "react-toastify";

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
  });

  // Dummy syllabusData (from your example)
  const [syllabusData, setSyllabusData] = useState([
    {
      _id: { $oid: "68231a66ae2d463bbe6cce89" },
      Board_id: { $oid: "6818a764c37e8fffcf1e8829" },
      Standard_id: { $oid: "6818a780c37e8fffcf1e8833" },
      Subject_id: { $oid: "6818a7d5c37e8fffcf1e884c" },
      Chapter_id: { $oid: "6818a7f2c37e8fffcf1e8856" },
      topics: [
        {
          topic__name: "WHO",
          t_id: "6823199d273bbe6bb0dfd7c3",
          _id: { $oid: "68231a66ae2d463bbe6cce8a" },
        },
        {
          topic__name: "WHAT",
          t_id: "68231a5a827273a80ceb62b8",
          _id: { $oid: "68231a66ae2d463bbe6cce8b" },
        },
        {
          topic__name: "WHERE",
          t_id: "68231a5a5a87a635245d9cca",
          _id: { $oid: "68231a66ae2d463bbe6cce8c" },
        },
        {
          topic__name: "WHEN",
          t_id: "68231a5b9b4b30935fb46ef8",
          _id: { $oid: "68231a66ae2d463bbe6cce8d" },
        },
      ],
    },
  ]);

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
          const currentBoard = allData.find((b) => b.name === formData.board);
          setSubjects(
            currentBoard?.subjects
              ?.filter((sub) => sub.Standard_id === value)
              .map(({ name, _id }) => ({ label: name, value: _id })) || []
          );
          setChapters([]);
          setFormData((prev) => ({ ...prev, subject: "", chapter: "" }));
          break;
        }
        case "subject": {
          const currentBoardData = allData.find(
            (b) => b.name === formData.board
          );
          setChapters(
            currentBoardData?.chapters
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

  // Dummy handler for search, assumes using local data
  const handleSearch = () => {
    toast.success("Syllabus filtered!");
    // You could add filter logic here if needed
  };

  return (
    <div className="content-page">
      <div className="main-content">
        <FilterData
          boards={boards}
          standards={standards}
          subjects={subjects}
          chapters={chapters}
          formData={formData}
          updateForm={updateForm}
          type="syllabus"
          title="Generate Your Custom Syllabus"
        />

        <button className="button-next-blue" onClick={handleSearch}>
          Search
        </button>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Chapter Name</th>
                <th>Topics</th>
              </tr>
            </thead>
            <tbody>
              {syllabusData.length === 0 ? (
                <tr>
                  <td colSpan="2">No syllabus data found</td>
                </tr>
              ) : (
                syllabusData.map((item, index) => {
                  // Find board
                  const board = allData.find(
                    (b) => b._id === item.Board_id.$oid
                  );
                  console.log(board, "board");

                  // Find chapter name from that board
                  const chapter = board?.chapters?.find(
                    (ch) => ch._id === item.Chapter_id.$oid
                  );
                  console.log(chapter, "chapter");
                  return (
                    <tr key={index}>
                      <td>{chapter?.name || "Unknown Chapter"}</td>
                      <td>
                        <ul>
                          {item.topics.map((topic) => (
                            <li key={topic._id.$oid}>{topic.topic__name}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;
