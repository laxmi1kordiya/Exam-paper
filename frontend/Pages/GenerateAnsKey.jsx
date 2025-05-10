import React,{useEffect} from "react";
import { findData } from "../Utils/AppUtils";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {font} from '../Utils/shruti-regular'


const GenerateAnsKey = ({ formData, allData, selectedQuestions, headerData }) => {
    useEffect(() => {
  
      pdfMake.vfs = pdfFonts.pdfMake?.vfs || {}; // Ensure vfs is initialized
  
      if (pdfMake.vfs) {
        pdfMake.vfs["shruti.ttf"] = font;
      }
  
      pdfMake.fonts = {
        shruti: {
          normal: "shruti.ttf",
          bold: "shruti.ttf",
          italics: "shruti.ttf",
          bolditalics: "shruti.ttf",
        },
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italic.ttf",
          bolditalics: "Roboto-MediumItalic.ttf",
        },
      };
    }, []);
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

  const subject = findData(formData, allData, "subject") || "Subject";
  const standard = findData(formData, allData, "standard") || "Standard";

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
    // Organize questions by section
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

    // Define PDF document
    const docDefinition = {
      content: [
        // Header (Logo, Title, Subtitle)
        {
          columns: [
            headerData?.logoPreview
              ? {
                  image: headerData.logoPreview,
                  width: 25,
                  height: 25,
                }
              : { text: "", width: 25 },
            {
              stack: [
                {
                  text: headerData?.title || "",
                  fontSize: 16,
                  alignment: "center",
                },
                {
                  text: headerData?.subtitle || "",
                  fontSize: 12,
                  alignment: "center",
                  margin: [0, 8, 0, 0],
                },
              ],
              width: "*",
            },
          ],
          margin: [0, 0, 0, 20], // Match 2-line space after subtitle
        },
        // Standard (Subject)
        {
          text: `${standard} (${subject})`,
          fontSize: 11,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        // Time Allowed and Total Marks
        {
          columns: [
            {
              text: `Time Allowed: ${formData?.timeAllowed || "_________________"}`,
              fontSize: 11,
            },
            {
              text: `Total Marks: ${formData?.totalMarks || "_________________"}`,
              fontSize: 11,
              alignment: "right",
            },
          ],
          margin: [0, 0, 0, 15],
        },
        // Sections
        ...sectionKeys.map((sectionKey) => ({
          stack: [
            // Section Header
            {
              text: `${t("section")} ${sectionMapping[sectionKey]}`,
              fontSize: 12,
              bold: true, // Will use regular weight due to single font
              alignment: "center",
              margin: [0, 0, 0, 10],
            },
            // Section Title
            {
              text: getSectionTitle(sectionKey),
              fontSize: 11,
              margin: [0, 0, 0, 10],
            },
            // Questions and Answers
            ...questionsBySection[sectionKey].map((question, idx) => ({
              stack: [
                {
                  text: `Q.${idx + 1}. ${question.question || "No question text"}`,
                  fontSize: 11,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `Ans: ${question.answer || "No answer text"}`,
                  fontSize: 11,
                  margin: [0, 0, 0, 10], // Space before next question
                },
              ],
            })),
          ],
        })),
      ],
      defaultStyle: {
        font: formData?.board === "GSEB-GUJ" ? "shruti" : "Roboto",
      },
      pageMargins: [20, 20, 20, 20],
    };

    // Generate and download PDF
    pdfMake.createPdf(docDefinition).download(`Ans.Key_${subject}_${standard}.pdf`);
  };

  return (
    <button className="anskey" onClick={handleDownload}>
      Answer Key
    </button>
  );
};

export default GenerateAnsKey;