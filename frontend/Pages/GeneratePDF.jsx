import React, { useEffect } from "react";
import { findData } from "../Utils/AppUtils";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { font } from "../Utils/shruti-regular";

const GeneratePDF = ({ formData, allData, selectedQuestions, headerData }) => {
  useEffect(() => {
    console.log("Initializing pdfMake...");
    console.log("pdfMake object:", pdfMake); // This will log the pdfMake object

    pdfMake.vfs = pdfFonts.pdfMake?.vfs || {}; // Ensure vfs is initialized
    console.log("pdfMake.vfs initialized:", pdfMake.vfs); // Check if vfs is set properly

    if (pdfMake.vfs) {
      pdfMake.vfs["shruti.ttf"] = font;
      console.log("Shruti font loaded into VFS:", pdfMake.vfs["shruti.ttf"]); // Confirm Shruti font in VFS
    }

    pdfMake.fonts = {
      shruti: {
        normal: "shruti-normal.ttf",
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
    console.log("Fonts set in pdfMake:", pdfMake.fonts); // Confirm font configuration
  }, []);

  const translations = {
    oneMarkQuestions: {
      en: "Answer the following questions briefly.",
      gu: "નીચે આપેલા પ્રશ્નોના ટુંકમાં જવાબ આપો.",
    },
    twoMarkQuestions: {
      en: "Answer the following questions with two marks each.",
      gu: "નીચે આપેલા બે ગુણના પ્રશ્નોના જવાબ આપો.",
    },
    threeMarkQuestions: {
      en: "Answer the following questions with three marks each.",
      gu: "નીચે આપેલા ત્રણ ગુણના પ્રશ્નોના જવાબ આપો.",
    },
    fourMarkQuestions: {
      en: "Answer the following questions with four marks each.",
      gu: "નીચે આપેલા ચાર ગુણના પ્રશ્નોના જવાબ આપો.",
    },
    fiveMarkQuestions: {
      en: "Answer the following questions with five marks each.",
      gu: "નીચે આપેલા પાંચ ગુણના પ્રશ્નોના જવાબ આપો.",
    },
  };

  const subject = findData(formData, allData, "subject") || "Subject";
  const standard = findData(formData, allData, "standard") || "Standard";

  console.log("Selected Subject:", subject);
  console.log("Selected Standard:", standard);

  const t = (key) => {
    console.log(`Getting translation for key: ${key}`);
    if (formData?.board === "GSEB-ENG") {
      console.log(`English translation for '${key}':`, translations[key]?.en);
      return translations[key]?.en || key;
    } else {
      console.log(`Gujarati translation for '${key}':`, translations[key]?.gu);
      return translations[key]?.gu || key;
    }
  };

  const getSectionTitle = (questionType) => {
    console.log(`Determining title for question type: ${questionType}`);
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
    console.log("Organizing questions by section...");
    // Organize questions by section
    const questionsBySection = {};
    selectedQuestions.forEach((question) => {
      if (!questionsBySection[question.questionType]) {
        questionsBySection[question.questionType] = [];
      }
      questionsBySection[question.questionType].push(question);
    });

    console.log("Questions by Section:", questionsBySection);

    const SectionLabels = ["A", "B", "C", "D", "E"];
    const sectionKeys = Object.keys(questionsBySection);
    console.log("Section Keys:", sectionKeys);

    const sectionMapping = {};
    sectionKeys.forEach((key, index) => {
      sectionMapping[key] = SectionLabels[index] || `Section ${index + 1}`;
    });

    console.log("Section Mapping:", sectionMapping);

    // Define PDF document
    const docDefinition = {
      content: [
        // Title
        {
          text: headerData?.title || "",
          fontSize: 16,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        // Subtitle
        {
          text: headerData?.subtitle || "",
          fontSize: 12,
          alignment: "center",
          margin: [0, 8, 0, 20], // Extra margin to match 2-line space
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
              text: `Section ${sectionMapping[sectionKey]}`,
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
            // Questions
            ...questionsBySection[sectionKey].map((question, idx) => ({
              text: `Q.${idx + 1}. ${question.question || "No question text"}`,
              fontSize: 11,
              margin: [0, 0, 0, 7],
            })),
          ],
        })),
      ],
      defaultStyle: {
        font: formData?.board === "GSEB-GUJ" ? "shruti" : "Roboto",
      },
      pageMargins: [20, 20, 20, 20],
    };

    console.log("Document Definition:", docDefinition); // Log the full document definition

    // Generate and download PDF
    try {
      console.log("Generating PDF...");
      pdfMake.createPdf(docDefinition).download(`Que.Key_${subject}_${standard}.pdf`);
    } catch (error) {
      console.error("Error during PDF generation:", error);
    }
  };

  return <button className="qpaper" onClick={handleDownload}>Que.Paper</button>;
};

export default GeneratePDF;
// const handleDownload = () => {
//   console.log("run")
// }

// const GeneratePDF = ({ formData, allData, selectedQuestions, data }) => {
//   const docDefinition = {
//     content: [
//       {
//         columns: [
        
//           {
//             stack: [
//               { text: "test", style: "website", alignment: "center" },
//               { text: "test subtitle", style: "generatedBy", alignment: "center" },
//             ],
//             width: "*",
//           },
//           { text: "", width: "auto" },
//         ],
//         margin: [0, 0, 0, 5],
//       },
   
//     ],
//     styles: {
//       website: { fontSize: 14, bold: true },
//       generatedBy: { fontSize: 10 },
//       label: { fontSize: 11, bold: true, margin: [0, 2, 5, 2] },
//       value: { fontSize: 11, margin: [0, 2, 0, 2] },
//       subheader: { fontSize: 13, bold: true, decoration: "underline", margin: [0, 10, 0, 5] },
//       sectionHeader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] },
//       sectionAsQuestion: { fontSize: 12, bold: true, margin: [0, 5, 0, 5] },
//       individualQuestions: { fontSize: 11 },
//       instructions: { fontSize: 10, margin: [0, 0, 0, 8] },
//       noQuestions: { fontSize: 11, italics: true, margin: [0, 5, 0, 5] },
//     },
//     pageMargins: [40, 20, 40, 40],
//     // defaultStyle: { font: defaultFont },
//   };
//   // pdfMake.createPdf(docDefinition).download("generate-paper.pdf");
//   return <button onClick={handleDownload}>Download PDF</button>;
// }
// export default GeneratePDF;