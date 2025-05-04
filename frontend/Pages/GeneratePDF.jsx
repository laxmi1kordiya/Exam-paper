import React from "react";
import { jsPDF } from "jspdf";
import { addShrutiFont } from "../Utils/addShrutiFont";
import { findData } from "../Utils/AppUtils";

const GeneratePDF = ({ formData, allData, selectedQuestions, headerData }) => {
  const translations = {
    // instructionsTitle: { en: "Instructions:", gu: "સૂચનાઓ:" },
    // instruction1: {
    //   en: "1. Read all questions carefully.",
    //   gu: "૧. બધી પ્રશ્નોને ધ્યાનપૂર્વક વાંચો.",
    // },
    // instruction2: {
    //   en: "2. Answer all questions in the given space.",
    //   gu: "૨. આપેલ જગ્યા પર બધા પ્રશ્નોના જવાબો લખો.",
    // },
    // instruction3: {
    //   en: "3. No electronic gadgets allowed.",
    //   gu: "૩. ઇલેક્ટ્રોનિક ઉપકરણોની પરવાનગી નથી.",
    // },
    std: { en: "Std", gu: "ધોરણ" },
    subject: { en: "Subject", gu: "વિષય" },
    totalMarks: { en: "Total Marks", gu: "કુલ ગુણો" },
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
  
    // Header (Logo, Title, Subtitle)
    let yPosition = 10;
  
    if (headerData?.logoPreview) {
      doc.addImage(headerData.logoPreview, "PNG", 10, yPosition, 25, 25);
    }
  
    // Title and Subtitle next to logo
    const textStartX = 40;
    doc.setFontSize(16);
    doc.text(String(headerData?.title || ""), 105, yPosition + 8, {
      align: "center",
    });
  
    doc.setFontSize(12);
    doc.text(String(headerData?.subtitle || ""), 105, yPosition + 16, {
      align: "center",
    });
  
    yPosition += 35; // leave 2-line space after subtitle
  
    // Line: Standard (Subject) - Centered
    const stdSub = `${
      findData(formData, allData, "standard") || "_________________"
    } (${findData(formData, allData, "subject") || "_________________"})`;
    doc.setFontSize(11);
    doc.text(stdSub, 105, yPosition, { align: "center" });
  
    // Time Allowed (left) and Total Marks (right)
    const timeAllowed = formData?.timeAllowed || "_________________";
    const totalMarks = formData?.totalMarks || "_________________";
  
    yPosition += 10;
    doc.text("Time Allowed: " + timeAllowed, 10, yPosition);
    doc.text(`${t("totalMarks")}: ${totalMarks}`, 200, yPosition, {
      align: "right",
    });
  
    // Start Sections
    let sectionY = yPosition + 15;
    Object.keys(questionsBySection).forEach((sectionKey) => {
      doc.setFontSize(12);
      doc.text(`${t("section")} ${sectionMapping[sectionKey]}`, 105, sectionY, {
        align: "center",
      });
      sectionY += 10;
  
      doc.setFontSize(11);
      doc.text(getSectionTitle(sectionKey), 10, sectionY);
      sectionY += 10;
  
      questionsBySection[sectionKey].forEach((question, idx) => {
        let questionText = `Q.${idx + 1}. ${question.question || "No question text"}`;
        doc.text(questionText, 10, sectionY);
        sectionY += 10;
  
        if (sectionY > 270) {
          doc.addPage();
          sectionY = 20;
        }
      });
    });
  
    doc.save(`Que.Paper_${subject}_${standard}.pdf`);
  };
  

  return <button className="qpaper" onClick={handleDownload}>Que.Paper</button>;
};

export default GeneratePDF;
