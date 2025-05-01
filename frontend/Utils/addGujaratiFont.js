import gujaratiFontBase64 from './NotoSansGujaratiBase64';

export function addGujaratiFont(doc) {
  doc.addFileToVFS('NotoSansGujarati.ttf', gujaratiFontBase64);
  doc.addFont('NotoSansGujarati.ttf', 'NotoSansGujarati', 'normal');
}