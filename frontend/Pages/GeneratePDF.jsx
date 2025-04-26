import React from "react";
import { jsPDF } from "jspdf";
import { addGujaratiFont } from "../Utils/addGujaratiFont";

const GeneratePDF = ({ formData, allData, selectedQuestions, data }) => {
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
        return "Answer the following questions briefly.";
      case "TwoMarks":
        return "Answer the following questions with two marks each.";
      case "ThreeMarks":
        return "Answer the following questions with three marks each.";
      case "FourMarks":
        return "Answer the following questions with four marks each.";
      case "FiveMarks":
        return "Answer the following questions with five marks each.";
      default:
        return `${questionType.replace(/([A-Z])/g, " $1").trim()} Questions`;
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    // 1. Add Gujarati font into jsPDF
    addGujaratiFont(doc);

    // 2. Set font based on Board
    if (formData?.board === "GSEB-GUJ") {
      doc.setFont("NotoSansGujarati");
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
      { label: "Student Name", value: "__________________________________" },
      { label: "Roll No.", value: formData?.rollNo || "_________________" },
      { label: `Std: ${findData(formData, "standard") || "_________________"}`, value: `Subject: ${findData(formData, "subject") || "_________________"}` },
      { label: "Total Marks", value: formData?.totalMarks || "_________________" },
      { label: `Date: ${formData?.date ? new Date(formData.date).toLocaleDateString() : "_________________"}`, value: "" },
      { label: "Obtain Marks", value: formData?.obtainMarks || "_________________" }
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
    doc.text("Instructions:", 10, yPosition);
    doc.setFontSize(10);
    doc.text("1. Read all questions carefully.", 10, yPosition + 10);
    doc.text("2. Answer all questions in the given space.", 10, yPosition + 15);
    doc.text("3. No electronic gadgets allowed.", 10, yPosition + 20);

    // Sections and Questions
    let sectionY = yPosition + 35;
    Object.keys(questionsBySection).forEach((sectionKey) => {
      doc.setFontSize(12);
      doc.text(`Section ${sectionMapping[sectionKey]}`, 10, sectionY);
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
