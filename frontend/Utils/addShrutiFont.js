import ShrutiBase64 from "./ShrutiBase64";

export function addShrutiFont(doc) {
  doc.addFileToVFS('Shruti.ttf', ShrutiBase64);
  doc.addFont('Shruti.ttf', 'Shruti', 'normal');
}