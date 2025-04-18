import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../database/arLab.sqlite');

export async function initializeDatabase() {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log('Connected to SQLite database at', dbPath);
    return db;
  } catch (err) {
    console.error('SQLite connection error:', err);
    throw err;
  }
}
