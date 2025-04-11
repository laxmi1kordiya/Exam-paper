import React from "react";
import pdfMake from "../Utils/pdfMakeWrapper";

const GeneratePDF = () => {
  const handleDownload = () => {
    console.log("run")
    const doc = pdfMake.createPdf(docDefinition);
    doc.download("generate-paper.pdf");
  }
  const docDefinition = {
    content: [
      {
        columns: [
          {
            width: "*",
            stack: [
              { text: "Institute Name", style: "institute" },
              { text: "Exam Name: Final Term Exam", style: "exam" },
              { text: "Subject: Mathematics", style: "details" },
              { text: "Date: 11-Apr-2025", style: "details" },
              { text: "Time: 10:00 AM - 12:00 PM", style: "details" },
              { text: "Total Marks: 100", style: "details" },
            ],
          },
          {
            width: 100,
            image: "frontend\Assets\images\generate-paper.png",
            alignment: "right",
          },
        ],
        margin: [0, 0, 0, 10],
      },
      {
        text: "Instructions:",
        style: "subheader",
        margin: [0, 10, 0, 5],
      },
      {
        ul: [
          "Read all questions carefully.",
          "Answer all questions in the given space.",
          "No electronic gadgets allowed.",
        ],
        style: "instructions",
      },
    ],
    styles: {
      institute: { fontSize: 18, bold: true },
      exam: { fontSize: 14, margin: [0, 4, 0, 2] },
      details: { fontSize: 12 },
      subheader: { fontSize: 13, bold: true },
      instructions: { fontSize: 11 },
    },
  };

  pdfMake.createPdf(docDefinition).download("question-paper.pdf");


return <button onClick={handleDownload}>Download PDF</button>;
};
export default GeneratePDF;
