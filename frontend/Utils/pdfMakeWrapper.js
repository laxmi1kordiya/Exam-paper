// src/Utils/pdfMakeWrapper.js
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake.vfs = pdfFonts?.default?.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Medium.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Medium.ttf",
    bolditalics: "Roboto-Medium.ttf",
  },
};

export default pdfMake;
