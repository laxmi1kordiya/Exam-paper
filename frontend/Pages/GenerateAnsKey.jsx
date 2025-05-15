import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { findData } from "../Utils/AppUtils"; // Assuming this is available

// Register Gujarati font
Font.register({
  family: "NotoGujarati",
  src: "../Assets/fonts/NotoSansGujarati-Regular.ttf", // Ensure path is correct
});

// Styles for MyDocument
const documentStyles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 40, // Space for footer
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  standardSubject: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionInstruction: {
    fontSize: 11,
    marginBottom: 10,
  },
  questionRow: {
    flexDirection: "row",
    marginBottom: 7,
    columnGap: 10,
  },
  questionText: {
    fontSize: 11,
    flex: 1,
  },
  questionMarks: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 9,
  },
  watermark: {
    position: "absolute",
    top: 300, // Adjusted for A4 page
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 50,
    opacity: 0.3,
    color: "gray",
  },
});

// Translations
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

// Utility Functions
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

const getSectionTitle = (questionType, t) => {
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

// MyDocument Component
const MyDocument = ({
  formData,
  allData,
  selectedQuestions,
  headerData,
  totalMarks,
}) => {
  // Determine font and translations based on board
  const t = (key) => {
    if (formData?.board === "GSEB-ENG") {
      return translations[key]?.en || key;
    } else {
      return translations[key]?.gu || key;
    }
  };

  const fontFamily =
    formData?.board === "GSEB-GUJ" ? "NotoGujarati" : "Helvetica";

  // Extract standard and subject
  const subject = findData(formData, allData, "subject") || "Subject";
  const rawStandard = findData(formData, allData, "standard") || "Standard";
  const parts = rawStandard.split(" ");
  const standard = parts.slice(0, 2).join(" ");

  // Organize questions by section
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

  // Watermark
  const watermarkText =
    headerData?.WaterMark === true && headerData?.WaterMarkTaxt;

  return (
    <Document>
      <Page size="A4" style={documentStyles.page}>
        {/* Header */}
        <Text style={documentStyles.title}>{headerData?.title || ""}</Text>
        <Text style={documentStyles.subtitle}>
          {headerData?.subtitle || ""}
        </Text>
        <Text
          style={documentStyles.standardSubject}
        >{`${standard} - ${subject}`}</Text>
        <View style={documentStyles.headerRow}>
          <Text style={documentStyles.headerText}>
            Time Allowed: {formatTimeAllowed(headerData?.paperTime)}
          </Text>
          <Text style={documentStyles.headerText}>
            Total Marks: {headerData?.totalMarks || "_________________"}
          </Text>
        </View>

        {/* Sections */}
        {sectionKeys.map((sectionKey) => (
          <View key={sectionKey} style={{ marginBottom: 20 }}>
            <Text style={documentStyles.sectionTitle}>
              Section {sectionMapping[sectionKey]}
            </Text>
            <Text style={[documentStyles.sectionInstruction, { fontFamily }]}>
              {getSectionTitle(sectionKey, t)}
            </Text>
            {questionsBySection[sectionKey].map((q, idx) => (
               <View key={idx} >
              <View key={idx} style={documentStyles.questionRow}>
                <Text style={[documentStyles.questionText, { fontFamily }]}>
                  {`${idx + 1}. ${q.question || "No question text"}`}
                </Text>
                <Text style={[documentStyles.questionMarks, { fontFamily }]}>
                  [{q.marks || getMarksFromType(sectionKey)}]
                </Text>
              </View>
              <View key={idx} style={documentStyles.questionRow}>
                 <Text style={[documentStyles.questionText, { fontFamily }]}>
                  {`Ans:  ${q.question || "No question text"}`}
                </Text>
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* Watermark */}
        {watermarkText && (
          <Text style={[documentStyles.watermark, { fontFamily: "Helvetica" }]}>
            {watermarkText}
          </Text>
        )}

        {/* Footer */}
        <Text
          style={[documentStyles.footer, { fontFamily: "Helvetica" }]}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

// PdfPreview Component
const GenerateAnsKey = ({
  formData,
  allData,
  selectedQuestions,
  headerData,
  totalMarks,
}) => (
  <div>
    {/* Download Button */}
    <PDFDownloadLink
      document={
        <MyDocument
          formData={formData}
          allData={allData}
          selectedQuestions={selectedQuestions}
          headerData={headerData}
          totalMarks={totalMarks}
        />
      }
      fileName={`Ans.Key_${
        findData(formData, allData, "subject") || "Subject"
      }_${
        findData(formData, allData, "standard")
          ?.split(" ")
          .slice(0, 2)
          .join(" ") || "Standard"
      }.pdf`}
    >
      {<button className="anskey">Answer Key</button>}
    </PDFDownloadLink>
  </div>
);

export default GenerateAnsKey;
