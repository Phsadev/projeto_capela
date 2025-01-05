const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

document.addEventListener('DOMContentLoaded', function() {
    gapi.load('client:auth2', initClient);
});

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
    });
}

document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const assemblyDate = document.getElementById('assemblyDate').value;
    const assemblyNotes = document.getElementById('assemblyNotes').value;
    const memberName = document.getElementById('memberName').value;
    const memberRole = document.getElementById('memberRole').value;

    const data = {
        assemblyDate: assemblyDate,
        assemblyNotes: assemblyNotes,
        memberName: memberName,
        memberRole: memberRole
    };

    saveToGoogleSheet(data);
    saveToLocalStorage(data);
});

function saveToGoogleSheet(data) {
    const params = {
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS'
    };

    const valueRangeBody = {
        values: [[
            data.assemblyDate,
            data.assemblyNotes,
            data.memberName,
            data.memberRole
        ]]
    };

    const request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    request.then(response => {
        console.log('Dados salvos na planilha do Google Sheets:', response);
    }, reason => {
        console.error('Erro ao salvar na planilha:', reason);
    });
}

function saveToLocalStorage(data) {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    records.push(data);
    localStorage.setItem('records', JSON.stringify(records));
}
