import React from "react";
import pdfMake from "../Utils/pdfMakeWrapper";

const GeneratePDF = ({ formData, allData, selectedQuestions, data }) => {
  const findData = (formData, type) => {
    if (!formData) return null;

    const board = allData.find((board) => board.name === formData.board);
    if (!board || !Array.isArray(board.standards)) return null;
    let data = {};
    if (type === "standard") {
      data = board.standards.find(
        (standard) => standard._id === formData.standard
      );
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
    // Group selected questions by questionType
    const questionsBySection = {};
    selectedQuestions.forEach((question) => {
      if (!questionsBySection[question.questionType]) {
        questionsBySection[question.questionType] = [];
      }
      questionsBySection[question.questionType].push(question);
    });

    // Map questionTypes to Section labels (Section A, Section B, etc.)
    const sectionLabels = ["A", "B", "C", "D", "E"];
    const sectionKeys = Object.keys(questionsBySection);
    const sectionMapping = {};
    sectionKeys.forEach((key, index) => {
      sectionMapping[key] = sectionLabels[index] || `Section ${index + 1}`; // Fallback if more than 5 sections
    });

    const docDefinition = {
      content: [
        {
          columns: [
            {
              image: data.logoPreview ? data.logoPreview : undefined,
              width: data.logoPreview ? 60 : 0,
            },
            {
              stack: [
                {
                  text: data.title,
                  style: "website",
                  alignment: "center",
                },
                {
                  text: data.subtitle,
                  style: "generatedBy",
                  alignment: "center",
                },
              ],
              width: "*",
            },
            {
              text: "", // Placeholder for potential right-side content
              width: "auto",
            },
          ],
          margin: [0, 0, 0, 5],
        },
        {
          table: {
            widths: ["auto", "*", "auto", "*"],
            body: [
              [
                { text: "Student Name :", style: "label" },
                {
                  text: "__________________________________",
                  style: "value",
                },
                { text: "Roll No. :", style: "label" },
                {
                  text: formData?.rollNo || "_________________",
                  style: "value",
                },
              ],
              [
                {
                  text: `Std : ${
                    findData(formData, "standard") || "_________________"
                  }`,
                  style: "label",
                },
                {
                  text: `Subject : ${
                    findData(formData, "subject") || "_________________"
                  }`,
                  style: "label",
                },
                { text: "Total Marks :", style: "label" },
                {
                  text: formData?.totalMarks || "_________________",
                  style: "value",
                },
              ],
              [
                {
                  text: `Date : ${
                    formData?.date
                      ? new Date(formData.date).toLocaleDateString()
                      : "_________________"
                  }`,
                  style: "value",
                },
                "", // Empty cell for spacing
                { text: "Obtain Marks :", style: "label" },
                {
                  text: formData?.obtainMarks || "_________________",
                  style: "value",
                },
              ],
            ],
          },
          layout: "noBorders",
        },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 1,
              lineColor: "#000",
            },
          ],
          margin: [0, 10, 0, 10],
        },
        {
          text: "Instructions:",
          style: "subheader",
          margin: [0, 0, 0, 5],
        },
        {
          ul: [
            "Read all questions carefully.",
            "Answer all questions in the given space.",
            "No electronic gadgets allowed.",
          ],
          style: "instructions",
        },
        {
          text: "",
          style: "subheader",
          margin: [0, 20, 0, 5],
        },
        // Dynamically generate content based on sections as numbered questions
        Object.keys(questionsBySection).length > 0 ? (
          Object.keys(questionsBySection).map((sectionKey, sectionIndex) => [
            {
              text: `Section ${sectionMapping[sectionKey]}`, // Added Section Label
              style: "sectionHeader",
              alignment: "center",
              margin: [0, 15, 0, 5],
            },
            {
              text: `Q.${sectionIndex + 1}. ${getSectionTitle(sectionKey)}`,
              style: "sectionAsQuestion", // New style for the section title
              margin: [0, 5, 0, 5],
            },
            {
              ol: questionsBySection[sectionKey].map((question) => ({
                text: question.question || "No question text",
                margin: [0, 0, 0, 10],
              })),
              style: "individualQuestions", // New style for the individual questions
              margin: [15, 0, 0, 15], // Indent the individual questions
            },
          ])
        ) : (
          { text: "No questions selected.", style: "noQuestions" }
        ),
      ],
      styles: {
        website: {
          fontSize: 14,
          bold: true,
        },
        generatedBy: {
          fontSize: 10,
        },
        label: {
          fontSize: 11,
          bold: true,
          margin: [0, 2, 5, 2],
        },
        value: {
          fontSize: 11,
          margin: [0, 2, 0, 2],
        },
        subheader: {
          fontSize: 13,
          bold: true,
          decoration: "underline",
          margin: [0, 10, 0, 5],
        },
        sectionHeader: { // Style for the Section Label
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        sectionAsQuestion: {
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 5],
        },
        individualQuestions: {
          fontSize: 11,
        },
        instructions: {
          fontSize: 10,
          margin: [0, 0, 0, 8],
        },
        noQuestions: {
          fontSize: 11,
          italics: true,
          margin: [0, 5, 0, 5],
        },
      },
      pageMargins: [40, 20, 40, 40],
    };

    pdfMake.createPdf(docDefinition).download("generate-paper.pdf");
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};

export default GeneratePDF;