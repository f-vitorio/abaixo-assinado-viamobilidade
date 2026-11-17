const SHEET_ID = 'COLE_AQUI_O_ID_DA_PLANILHA';

function doGet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Assinaturas');
  const total = Math.max(0, sheet.getLastRow() - 1);
  return ContentService
    .createTextOutput(JSON.stringify({ assinaturas: total }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Assinaturas');
  sheet.appendRow([
    new Date(),
    e.parameter.nome,
    e.parameter.email,
    e.parameter.telefone,
    e.parameter.dataHora
  ]);
  const total = Math.max(0, sheet.getLastRow() - 1);
  return ContentService
    .createTextOutput(JSON.stringify({ sucesso: true, assinaturas: total }))
    .setMimeType(ContentService.MimeType.JSON);
}
