import React, { useEffect } from "react";
import { findData } from "../Utils/AppUtils";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { font } from "../Utils/shruti-regular";

const GeneratePDF = ({
  formData,
  allData,
  selectedQuestions,
  headerData,
  totalMarks,
}) => {
  useEffect(() => {
    pdfMake.vfs = pdfFonts.pdfMake?.vfs || {};
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

  const getMarksFromType = (questionType) => {
    switch (questionType) {
      case "OneMarks":
        return 1;
      case "TwoMarks":
        return 2;
      case "ThreeMarks":
        return 3;
      case "FourMarks":
        return 4;
      case "FiveMarks":
        return 5;
      default:
        return "?";
    }
  };

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
  const rawStandard = findData(formData, allData, "standard") || "Standard";
  const parts = rawStandard.split(" ");
  const standard = parts.slice(0, 2).join(" ");

  const t = (key) => {
    if (formData?.board === "GSEB-ENG") {
      return translations[key]?.en || key;
    } else {
      return translations[key]?.gu || key;
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

  const formatTimeAllowed = (minutes) => {
    const min = parseInt(minutes, 10);
    if (isNaN(min)) return "_________________";

    if (min <= 60) {
      return `${min} Minute${min === 1 ? "" : "s"}`;
    }

    const hours = Math.floor(min / 60);
    const remainingMinutes = min % 60;

    const hourPart = `${hours} Hour${hours === 1 ? "" : "s"}`;
    const minutePart = remainingMinutes
      ? ` ${remainingMinutes} Minute${remainingMinutes === 1 ? "" : "s"}`
      : "";

    return hourPart + minutePart;
  };

  const handleDownload = () => {
    const questionsBySection = {};
    selectedQuestions.forEach((question) => {
      if (!questionsBySection[question.questionType]) {
        questionsBySection[question.questionType] = [];
      }
      questionsBySection[question.questionType].push(question);
    });

    const SectionLabels = ["A", "B", "C", "D", "E"];
    const sectionKeys = Object.keys(questionsBySection);

    const sectionMapping = {};
    sectionKeys.forEach((key, index) => {
      sectionMapping[key] = SectionLabels[index] || `Section ${index + 1}`;
    });

    const watermarkText =
      headerData?.WaterMark === "false" && headerData?.WaterMarkTaxt;

    const docDefinition = {
      content: [
        {
          text: headerData?.title || "",
          fontSize: 16,
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 0],
        },
        {
          text: headerData?.subtitle || "",
          fontSize: 12,
          bold: true,
          alignment: "center",
          margin: [0, 8, 0, 20],
        },
        {
          text: `${standard} - ${subject}`,
          fontSize: 11,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          columns: [
            {
              text: `Time Allowed: ${formatTimeAllowed(headerData?.paperTime)}`,
              fontSize: 11,
              bold: true,
            },
            {
              text: `Total Marks: ${totalMarks || "_________________"}`,
              fontSize: 11,
              bold: true,
              alignment: "right",
            },
          ],
          margin: [0, 0, 0, 15],
        },
        ...sectionKeys.map((sectionKey) => ({
          stack: [
            {
              text: `Section ${sectionMapping[sectionKey]}`,
              fontSize: 12,
              bold: true,
              alignment: "center",
              margin: [0, 0, 0, 10],
            },
            {
              text: getSectionTitle(sectionKey),
              fontSize: 11,
              margin: [0, 0, 0, 10],
            },
            ...questionsBySection[sectionKey].map((question, idx) => ({
              columns: [
                {
                  text: `${idx + 1}. ${
                    question.question || "No question text"
                  }`,
                  fontSize: 11,
                  width: "*",
                },
                {
                  text: `[${question.marks || getMarksFromType(sectionKey)}]`,
                  fontSize: 11,
                  bold: true,
                  alignment: "right",
                  width: "auto",
                },
              ],
              columnGap: 10,
              margin: [0, 0, 0, 7],
            })),
          ],
          margin: [0, 0, 0, 20],
        })),
      ],
      defaultStyle: {
        font: formData?.board === "GSEB-GUJ" ? "shruti" : "Roboto",
      },
      pageMargins: [20, 20, 20, 40],
      footer: function (currentPage, pageCount) {
        return {
          text: `${currentPage} of ${pageCount}`,
          alignment: "center",
          fontSize: 9,
          margin: [0, 10, 0, 0],
        };
      },
      watermark: watermarkText
        ? {
            text: watermarkText,
            color: "gray",
            opacity: 0.3,
            fontSize: 50,
            alignment: "center",
            margin: [0, 780, 0, 0],
          }
        : undefined,
    };

    try {
      pdfMake
        .createPdf(docDefinition)
        .download(`Que.Key_${subject}_${standard}.pdf`);
    } catch (error) {
      console.error("Error during PDF generation:", error);
    }
  };

  return (
    <button className="qpaper" onClick={handleDownload}>
      Que.Paper
    </button>
  );
};

export default GeneratePDF;