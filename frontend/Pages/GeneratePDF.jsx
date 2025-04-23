// generatepdf.jsx
import React, { useEffect, useState } from "react";
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

  const handleDownload = () => {
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
          text: "Questions:",
          style: "subheader",
          margin: [0, 20, 0, 5],
        },
        selectedQuestions && selectedQuestions.length > 0
          ? {
              ol: selectedQuestions.map((question, index) => ({
                text: `${index + 1}. ${question ? question.name : " "}`,
                margin: [0, 0, 0, 12], // Adds bottom space like in normal papers
              })),
              style: "questionList",
            }
          : { text: "No questions selected.", style: "noQuestions" },
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
        instructions: {
          fontSize: 10,
          margin: [0, 0, 0, 8],
        },
        questionList: {
          fontSize: 11,
          margin: [0, 5, 5, 5],
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