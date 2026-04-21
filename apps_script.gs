// ============================================================
// GOOGLE APPS SCRIPT — Audit Genre METE
// Copiez ce code dans script.google.com > Apps Script
// ============================================================

const SHEET_NAME = 'Réponses';

// En-têtes de la feuille — écrits en texte brut (ASCII safe)
// pour éviter tout problème d'encodage dans Google Sheets
const HEADERS = [
  'Date',
  'Sexe',
  'Age',
  'Statut',
  'Service',
  'Sous-service',
  'Zone',
  'Anciennete',
  // Points par question (barème, invisible pour le répondant)
  'Q01_pts','Q02_pts','Q03_pts','Q04_pts','Q05_pts',
  'Q06_pts','Q07_pts','Q08_pts','Q09_pts','Q10_pts',
  'Q11_pts','Q12_pts','Q13_pts','Q14_pts','Q15_pts',
  'Q16_pts','Q17_pts','Q18_pts','Q19_pts','Q20_pts',
  'Q21_pts','Q22_pts','Q23_pts','Q24_pts','Q25_pts',
  'Q26_pts','Q27_pts','Q28_pts','Q29_pts','Q30_pts',
  // Libellé de la réponse choisie
  'Q01_reponse','Q02_reponse','Q03_reponse','Q04_reponse','Q05_reponse',
  'Q06_reponse','Q07_reponse','Q08_reponse','Q09_reponse','Q10_reponse',
  'Q11_reponse','Q12_reponse','Q13_reponse','Q14_reponse','Q15_reponse',
  'Q16_reponse','Q17_reponse','Q18_reponse','Q19_reponse','Q20_reponse',
  'Q21_reponse','Q22_reponse','Q23_reponse','Q24_reponse','Q25_reponse',
  'Q26_reponse','Q27_reponse','Q28_reponse','Q29_reponse','Q30_reponse',
  // Résultat
  'Score_Total',
  'Niveau',
  'Score_Max'
];

// ============================================================
// RÉCEPTION DES DONNÉES (POST depuis le formulaire HTML)
// ============================================================
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Lecture du paramètre "data" envoyé par le formulaire
    const raw = e.parameter.data;
    if (!raw) {
      return jsonResponse('error', 'Aucune donnée reçue');
    }

    const data = JSON.parse(raw);

    // Accès à la feuille (ou création si elle n'existe pas encore)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Écriture des en-têtes avec setValues pour forcer l'encodage UTF-8
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      // Mise en forme des en-têtes
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1a6b4a');
      headerRange.setFontColor('#ffffff');
      headerRange.setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
    }

    // Construction de la ligne de données test
    const answersArr   = data.answers        || new Array(30).fill('');
    const labelsArr    = data.response_labels || new Array(30).fill('');

    const row = [
      data.date        || new Date().toLocaleString('fr-FR'),
      data.sexe        || '',
      data.age         || '',
      data.statut      || '',
      data.service     || '',
      data.sous_service || '',
      data.zone        || '',
      data.anciennete  || '',
      // 30 points
      ...answersArr,
      // 30 libellés
      ...labelsArr,
      // Résultat
      data.score_total != null ? data.score_total : 0,
      data.niveau      || '',
      data.score_max   || 90
    ];

    sheet.appendRow(row);

    return jsonResponse('ok', 'Réponse enregistrée', { row: sheet.getLastRow() });

  } catch (err) {
    return jsonResponse('error', err.message);
  } finally {
    lock.releaseLock();
  }
}

// ============================================================
// TEST DE DISPONIBILITÉ (GET)
// ============================================================
function doGet(e) {
  return jsonResponse('ok', 'Le script Audit Genre METE est actif et prêt.');
}

// ============================================================
// UTILITAIRE : réponse JSON
// ============================================================
function jsonResponse(status, message, extra) {
  const payload = Object.assign({ status: status, message: message }, extra || {});
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}