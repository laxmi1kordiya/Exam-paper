import React, { useEffect } from "react";
import { findData } from "../Utils/AppUtils";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { font } from "../Utils/shruti-regular";

const GenerateAnsKey = ({
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
  const rawStandard = findData(formData, allData, "standard") || "Standard";
  const parts = rawStandard.split(" ");
  const standard = parts.slice(0, 2).join(" ");

  const t = (key) => {
    return formData?.board === "GSEB-GUJ"
      ? translations[key]?.gu || key
      : translations[key]?.en || key;
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

  const getMarksFromType = (type) => {
    switch (type) {
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

  const formatTime = (minutes) => {
    const min = parseInt(minutes, 10);
    if (isNaN(min)) return "_________________";

    if (min <= 60) return `${min} Minutes`;

    const hours = Math.floor(min / 60);
    const remainingMinutes = min % 60;
    return `${hours} Hour${hours > 1 ? "s" : ""}${
      remainingMinutes > 0 ? ` ${remainingMinutes} Minutes` : ""
    }`;
  };

  const handleDownload = () => {
    const questionsBySection = {};
    selectedQuestions.forEach((q) => {
      if (!questionsBySection[q.questionType]) {
        questionsBySection[q.questionType] = [];
      }
      questionsBySection[q.questionType].push(q);
    });

    const sectionLabels = ["A", "B", "C", "D", "E"];
    const sectionKeys = Object.keys(questionsBySection);
    const sectionMapping = {};
    sectionKeys.forEach((key, index) => {
      sectionMapping[key] = sectionLabels[index] || `Section ${index + 1}`;
    });

    const watermarkText =
      headerData?.WaterMark === true && headerData?.WaterMarkTaxt;

    const docDefinition = {
      content: [
        {
          columns: [
            {
              stack: [
                {
                  text: headerData?.title || "",
                  fontSize: 16,
                  bold: true,
                  alignment: "center",
                },
                {
                  text: headerData?.subtitle || "",
                  fontSize: 12,
                  bold: true,
                  alignment: "center",
                  margin: [0, 8, 0, 0],
                },
              ],
              width: "*",
            },
          ],
          margin: [0, 0, 0, 20],
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
              text: `Time Allowed: ${formatTime(headerData?.paperTime)}`,
              fontSize: 11,
              bold: true,
            },
            {
              text: `Total Marks: ${headerData?.totalMarks || "_________________"}`,
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
              text: `${t("section")} ${sectionMapping[sectionKey]}`,
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
            ...questionsBySection[sectionKey].map((q, idx) => ({
              stack: [
                {
                  columns: [
                    {
                      text: `${idx + 1}. ${q.question || "No question text"}`,
                      fontSize: 11,
                      width: "*",
                      lineHeight: 1.5,
                    },
                    {
                      text: `[${q.marks || getMarksFromType(sectionKey)}]`,
                      fontSize: 11,
                      bold: true,
                      alignment: "right",
                      width: "auto",
                      margin: [0, 0, 10, 0],
                      lineHeight: 1.5,
                    },
                  ],
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Ans: ${q.answer || "No answer text"}`,
                  fontSize: 11,
                  margin: [0, 5, 0, 5],
                  lineHeight: 1.5,
                },
                {
                  text: q.answer && q.answer.split("\n").slice(1).join("\n"),
                  fontSize: 11,
                  margin: [20, 0, 0, 10],
                  lineHeight: 1.5,
                },
              ],
            })),
          ],
          margin: [0, 0, 0, 20],
        })),
      ],
      defaultStyle: {
        font: formData?.board === "GSEB-GUJ" ? "shruti" : "Roboto",
        lineHeight: 1.5,
      },
      pageMargins: [20, 20, 20, 40],
      footer: (currentPage, pageCount) => ({
        text: `${currentPage} of ${pageCount}`,
        alignment: "center",
        fontSize: 9,
        margin: [0, 10, 0, 0],
      }),
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

    pdfMake
      .createPdf(docDefinition)
      .download(`Ans.Key_${subject}_${standard}.pdf`);
  };

  return (
    <button className="anskey" onClick={handleDownload}>
      Answer Key
    </button>
  );
};

export default GenerateAnsKey;