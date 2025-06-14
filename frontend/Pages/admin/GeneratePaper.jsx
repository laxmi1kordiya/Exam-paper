import React, { useCallback, useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../../Api/Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Questionlist from "./questions";
import FilterData from "./FilterData";
import PaperData from "./PaperData";
import PaperSetting from "./PaperSetting";

const GeneratePaper = () => {
  const fetch = useAuthenticatedFetch();
  const [boards, setBoards] = useState([]);
  const [standards, setStandards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [allData, setAllData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    board: "",
    standard: "",
    subject: "",
    chapter: [],
    generateType: "",
  });

  const [headerData, setHeaderData] = useState({
    title: "Create Paper",
    subtitle: "Generated By Create Paper",
    paperTime: "",
    totalMarks: "",
    WaterMark: false,
    WaterMarkTaxt: "",
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

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleNextFromStep1 = () => {
    if (!formData.chapter.length) {
      toast.error("Please select at least one chapter.");
      return;
    }
    setCurrentStep(2);
  };

  const handleNextFromStep2 = (e) => {
    e.preventDefault();
    if (!headerData.title.trim() || !headerData.subtitle.trim()) {
      toast.error("Please fill in both Title and Subtitle.");
      return;
    }
    setIsSubmitted(true);
    setCurrentStep(3);
  };

  const updateHeader = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (name === "WaterMark") {
      newValue = type === "checkbox" ? checked : value === "true";
    }
    setHeaderData((prev) => ({ ...prev, [name]: newValue }));
  }, []);
  const updateForm = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Handle both single values and arrays (for multiselect)
      const newValue = Array.isArray(value) ? value : value;

      setFormData((prev) => ({ ...prev, [name]: newValue }));

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
            chapter: [],
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
          setFormData((prev) => ({ ...prev, subject: "", chapter: [] }));
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
          setFormData((prev) => ({ ...prev, chapter: [] }));
          break;
        }
        default:
          break;
      }
    },
    [allData, formData.board]
  );

  const steps = [
    { id: 1, name: "Paper Configuration" },
    { id: 2, name: "Customize Header" },
    { id: 3, name: "View Questions" },
  ];

  const renderStepIndicator = useCallback(
    (step) => (
      <div key={step.id} className="step-item">
        <div className="step-details">
          <div
            className={`step-circle ${
              currentStep === step.id
                ? "active"
                : currentStep > step.id
                ? "completed"
                : "inactive"
            }`}
          >
            {currentStep > step.id ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              step.id
            )}
          </div>
          <span className="step-name">{step.name}</span>
        </div>
        {step.id < steps.length && (
          <div
            className={`step-separator ${
              currentStep > step.id ? "completed" : "inactive"
            }`}
          ></div>
        )}
      </div>
    ),
    [currentStep, steps.length]
  );
  const renderButtonContainer = ({
    onNext,
    onBack,
    isDisabled,
    showBack = false,
    hideNext = false,
  }) => (
    <div className="sticky-button-bar">
      {showBack && (
        <button type="button" onClick={onBack} className="button-back-gray">
          Back
        </button>
      )}
      <div style={{ flex: 1 }} />
      {!hideNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={!isDisabled}
          className={isDisabled ? "button-next-blue" : "button-disabled"}
        >
          Next
        </button>
      )}
    </div>
  );

  const renderStep1 = () => {
    const { board, standard, subject, chapter, generateType } = formData;

    const isValid =
      board !== "" &&
      standard !== "" &&
      subject !== "" &&
      chapter.length > 0 &&
      generateType !== "";
    return (
      <>
        <PaperData 
        boards={boards}
        standards={standards}
        subjects={subjects}
        chapters={chapters}
        formData={formData}
        updateForm={updateForm}
        type="paper"
        title="Generate Your Question Custom Paper"
        />
        {renderButtonContainer({
          onNext: handleNextFromStep1,
          isDisabled: isValid,
        })}
      </>
    );
  };

  const renderStep2 = () => (
    <>
      <PaperSetting
        handleNextFromStep2={handleNextFromStep2}
        headerData={headerData}
        updateHeader={updateHeader}
        setHeaderData={setHeaderData}
        onBack={handleBack}
      />
      {renderButtonContainer({
        onNext: handleNextFromStep2,
        showBack: true,
        onBack: handleBack,
        isDisabled: true,
        isSubmit: true,
      })}
    </>
  );

  const renderStep3 = () => (
    <>
      {formData.chapter.length > 0 ? (
        <Questionlist
          chapterIds={formData.chapter} // Pass array instead of just one
          formData={formData}
          allData={allData}
          headerData={headerData}
        />
      ) : (
        <div className="error-message">
          No chapter selected. Please go back to Step 1 and select a chapter.
        </div>
      )}
      {renderButtonContainer({
        onBack: handleBack,
        showBack: true,
        hideNext: true,
      })}
    </>
  );
  return (
    <div className="content-page">
      <div className="main-content">
        <div className="step-indicator-container">
          {steps.map(renderStepIndicator)}
        </div>

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 &&
          formData.generateType === "Manually" &&
          renderStep2()}
        {currentStep === 3 && isSubmitted && renderStep3()}
        {currentStep === 3 && !isSubmitted && (
          <div className="error-message">
            Error: isSubmitted is false while currentStep is 3.
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default GeneratePaper;
