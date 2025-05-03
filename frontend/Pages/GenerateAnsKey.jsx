import React from "react";
import { jsPDF } from "jspdf";
import { addShrutiFont } from "../Utils/addShrutiFont";
import { findData } from "../Utils/AppUtils";

const GenerateAnsKey = ({
  formData,
  allData,
  selectedQuestions,
  headerData,
}) => {
  const translations = {
    std: { en: "Std", gu: "ધોરણ" },
    subject: { en: "Subject", gu: "વિષય" },
    date: { en: "Date", gu: "તારીખ" },
    section: { en: "Section", gu: "વિભાગ" },
    oneMarkQuestions: {
      en: "Answer the following questions briefly.",
      gu: "નીચે આપેલા પ્રશ્નોના ટુંકમાં જવાબ આપો.",
    },
    twoMarkQuestions: {
      en: "Answer the following questions with two marks each.",
      gu: "દર બે ગુણના પ્રશ્નોના જવાબ આપો.",
    },
    threeMarkQuestions: {
      en: "Answer the following questions with three marks each.",
      gu: "દર ત્રણ ગુણના પ્રશ્નોના જવાબ આપો.",
    },
    fourMarkQuestions: {
      en: "Answer the following questions with four marks each.",
      gu: "દર ચાર ગુણના પ્રશ્નોના જવાબ આપો.",
    },
    fiveMarkQuestions: {
      en: "Answer the following questions with five marks each.",
      gu: "દર પાંચ ગુણના પ્રશ્નોના જવાબ આપો.",
    },
  };

  const t = (key) => {
    if (formData?.board === "GSEB-GUJ") {
      return translations[key]?.gu || key;
    } else {
      return translations[key]?.en || key;
    }
  };

  const getSectionTitle = (questionType) => {
    switch (questionType) {
      case "OneMarks":
        return t("oneMarkQuestions");
      case "TwoMarks":
        return t("twoMarkQuestions");
      case "ThreeMarks":
        return t("threeMarkQuestions");
      case "FourMarks":
        return t("fourMarkQuestions");
      case "FiveMarks":
        return t("fiveMarkQuestions");
      default:
        return `${questionType.replace(/([A-Z])/g, " $1").trim()} Questions`;
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    addShrutiFont(doc);

    if (formData?.board === "GSEB-GUJ") {
      doc.setFont("Shruti");
    } else {
      doc.setFont("Helvetica");
    }

    const questionsBySection = {};
    selectedQuestions.forEach((question) => {
      if (!questionsBySection[question.questionType]) {
        questionsBySection[question.questionType] = [];
      }
      questionsBySection[question.questionType].push(question);
    });

    const sectionLabels = ["A", "B", "C", "D", "E"];
    const sectionKeys = Object.keys(questionsBySection);
    const sectionMapping = {};
    sectionKeys.forEach((key, index) => {
      sectionMapping[key] = sectionLabels[index] || `Section ${index + 1}`;
    });

    // Adding header (logo, title, subtitle)
    let yPosition = 10;
    if (headerData?.logoPreview) {
      doc.addImage(headerData?.logoPreview, "PNG", 10, yPosition, 40, 40);
      yPosition += 40;
    }
    doc.setFontSize(14);
    doc.text(String(headerData?.title || ""), 105, yPosition, {
      align: "center",
    });
    yPosition += 10;
    doc.setFontSize(10);
    doc.text(String(headerData?.subtitle || ""), 105, yPosition, {
      align: "center",
    });
    yPosition += 10;

    // Student Info
    const studentInfo = [
      {
        label: `${t("std")}: ${
          findData(formData, allData, "standard") || "_________________"
        }`,
        value: `${t("subject")}: ${
          findData(formData, allData, "subject") || "_________________"
        }`,
      },
    ];

    let tableYPosition = yPosition + 20;
    studentInfo.forEach((info) => {
      doc.text(String(info.label), 10, tableYPosition);
      doc.text(String(info.value), 80, tableYPosition);
      tableYPosition += 10;
    });

    // Instructions
    yPosition = tableYPosition + 10;
    doc.setFontSize(13);
    doc.setFontSize(10);

    let sectionY = yPosition + 35;
    Object.keys(questionsBySection).forEach((sectionKey) => {
      doc.setFontSize(12);
      doc.text(`${t("section")} ${sectionMapping[sectionKey]}`, 10, sectionY);
      sectionY += 10;
      doc.setFontSize(11);
      doc.text(getSectionTitle(sectionKey), 10, sectionY);
      sectionY += 10;

      questionsBySection[sectionKey].forEach((question, idx) => {
        const questionText = `Q.${idx + 1} ${
          question.question || "No question text"
        }\nAns: ${question.answer || "No answer text"}`;
        doc.text(questionText, 10, sectionY);
        sectionY += 20;

        if (sectionY > 270) {
          doc.addPage();
          sectionY = 20;
        }
      });
    });

    doc.save("generate-AnswerKey.pdf");
  };

  return <button onClick={handleDownload}>Answer Key</button>;
};

export default GenerateAnsKey;
