import React from "react";
import { jsPDF } from "jspdf";
import { addGujaratiFont } from "../Utils/addGujaratiFont";
import { addShrutiFont } from "../Utils/addShrutiFont";

const GeneratePDF = ({ formData, allData, selectedQuestions, data }) => {
  const translations = {
    instructionsTitle: { en: "Instructions:", gu: "સૂચનાઓ:" },
    instruction1: { en: "1. Read all questions carefully.", gu: "૧. બધી પ્રશ્નોને ધ્યાનપૂર્વક વાંચો." },
    instruction2: { en: "2. Answer all questions in the given space.", gu: "૨. આપેલ જગ્યા પર બધા પ્રશ્નોના જવાબો લખો." },
    instruction3: { en: "3. No electronic gadgets allowed.", gu: "૩. ઇલેક્ટ્રોનિક ઉપકરણોની પરવાનગી નથી." },
    studentName: { en: "Student Name", gu: "વિદ્યાર્થીનું નામ" },
    rollNo: { en: "Roll No.", gu: "ક્રમ નંબર" },
    std: { en: "Std", gu: "ધોરણ" },
    subject: { en: "Subject", gu: "વિષય" },
    totalMarks: { en: "Total Marks", gu: "કુલ ગુણો" },
    date: { en: "Date", gu: "તારીખ" },
    obtainMarks: { en: "Obtain Marks", gu: "મેળવેલા ગુણો" },
    section: { en: "Section", gu: "વિભાગ" },
    oneMarkQuestions: { en: "Answer the following questions briefly.", gu: "નીચે આપેલા પ્રશ્નોના ટુંકમાં જવાબ આપો." },
    twoMarkQuestions: { en: "Answer the following questions with two marks each.", gu: "દર બે ગુણના પ્રશ્નોના જવાબ આપો." },
    threeMarkQuestions: { en: "Answer the following questions with three marks each.", gu: "દર ત્રણ ગુણના પ્રશ્નોના જવાબ આપો." },
    fourMarkQuestions: { en: "Answer the following questions with four marks each.", gu: "દર ચાર ગુણના પ્રશ્નોના જવાબ આપો." },
    fiveMarkQuestions: { en: "Answer the following questions with five marks each.", gu: "દર પાંચ ગુણના પ્રશ્નોના જવાબ આપો." },
  };

  const t = (key) => {
    if (formData?.board === "GSEB-GUJ") {
      return translations[key]?.gu || key;
    } else {
      return translations[key]?.en || key;
    }
  };

  const findData = (formData, type) => {
    if (!formData) return null;
    const board = allData.find((board) => board.name === formData.board);
    if (!board || !Array.isArray(board.standards)) return null;
    let data = {};
    if (type === "standard") {
      data = board.standards.find((standard) => standard._id === formData.standard);
    } else if (type === "subject") {
      data = board.subjects.find((subject) => subject._id === formData.subject);
    }
    return data ? data.name : null;
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

    // 1. Add Gujarati font
    addShrutiFont(doc);

    // 2. Set font based on Board
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
    if (data.logoPreview) {
      doc.addImage(data.logoPreview, "PNG", 10, yPosition, 40, 40);
      yPosition += 40;
    }
    doc.setFontSize(14);
    doc.text(String(data.title || ""), 105, yPosition, { align: "center" });
    yPosition += 10;
    doc.setFontSize(10);
    doc.text(String(data.subtitle || ""), 105, yPosition, { align: "center" });
    yPosition += 10;

    // Student Info
    const studentInfo = [
      { label: t("studentName"), value: "__________________________________" },
      { label: t("rollNo"), value: formData?.rollNo || "_________________" },
      { label: `${t("std")}: ${findData(formData, "standard") || "_________________"}`, value: `${t("subject")}: ${findData(formData, "subject") || "_________________"}` },
      { label: t("totalMarks"), value: formData?.totalMarks || "_________________" },
      { label: `${t("date")}`, value: formData?.date ? new Date(formData.date).toLocaleDateString() : "_________________" },
      { label: t("obtainMarks"), value: formData?.obtainMarks || "_________________" }
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
    doc.text(t("instructionsTitle"), 10, yPosition);
    doc.setFontSize(10);
    doc.text(t("instruction1"), 10, yPosition + 10);
    doc.text(t("instruction2"), 10, yPosition + 15);
    doc.text(t("instruction3"), 10, yPosition + 20);

    // Sections and Questions
    let sectionY = yPosition + 35;
    Object.keys(questionsBySection).forEach((sectionKey) => {
      doc.setFontSize(12);
      doc.text(`${t("section")} ${sectionMapping[sectionKey]}`, 10, sectionY);
      sectionY += 10;
      doc.setFontSize(11);
      doc.text(getSectionTitle(sectionKey), 10, sectionY);
      sectionY += 10;

      questionsBySection[sectionKey].forEach((question, idx) => {
        let questionText = `Q.${idx + 1}. ${question.question || "No question text"}`;
        doc.text(questionText, 10, sectionY);
        sectionY += 10;

        // If sectionY crosses page limit, add new page
        if (sectionY > 270) {
          doc.addPage();
          sectionY = 20;
        }
      });
    });

    // Save the PDF
    doc.save("generate-paper.pdf");
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};

export default GeneratePDF;

