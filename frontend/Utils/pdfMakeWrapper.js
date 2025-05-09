import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
// First set the default vfs
pdfMake.vfs["NotoSansGujarati.ttf"] = "";

// Then set the fonts
pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
  NotoSansGujarati: {
    normal: "NotoSansGujarati.ttf",
    bold: "NotoSansGujarati.ttf",
    italics: "NotoSansGujarati.ttf",
    bolditalics: "NotoSansGujarati.ttf",
  },
};

console.log("pdfMake.vfs:", pdfMake.vfs);
console.log("pdfMake.fonts:", pdfMake.fonts);

export default pdfMake;

// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// // import { customVfs } from "./customVfs"; 

// import Gujarati from "../Assets/fonts/NotoSansGujarati.ttf";
// import Roboto from "../Assets/fonts/Roboto.ttf";

// pdfMake.vfs = {
//   pdfFonts,
//   "NotoSansGujarati.ttf": Gujarati,
//   "Roboto.ttf": Roboto
// };

// pdfMake.fonts = {
//   Roboto: {
//     normal: Roboto,
//     bold: Roboto,
//     italics: Roboto,
//     bolditalics: Roboto,
//   },

// NotoSansGujarati: {
//     normal: Gujarati,
//     bold: Gujarati,
//     italics: Gujarati,
//     bolditalics: Gujarati,
//   },

// };

// console.log("pdfMake.vfs:", pdfMake.vfs);
// console.log("pdfMake.fonts:", pdfMake.fonts);

// export default pdfMake;