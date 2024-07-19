//Setting up google sheets api
import { google } from 'googleapis';
import fs from 'fs';

// Load client secrets from a local file.
const credentials = JSON.parse(fs.readFileSync('credentials/credentials.json', 'utf8'));
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Token should be generated via OAuth2 authorization flow
const token = JSON.parse(fs.readFileSync('credentials/token.json', 'utf8'));
oAuth2Client.setCredentials(token);

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

export const getSheetData = async (sheetId: string, range: string) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: range,
  });
  return res.data.values;
};

