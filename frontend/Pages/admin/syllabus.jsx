import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import FilterData from "./FilterData";

const syllabus = () => {
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
  }, []);

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
  return (
    <>
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
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Chapter</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter) => (
                  <tr key={chapter.value}>{chapter.label}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default syllabus;
