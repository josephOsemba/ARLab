export async function createLabTables(db) {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS experiments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        experimentId TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        requiredEquipment TEXT NOT NULL,
        defaultSceneConfig TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS scenes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        objects TEXT NOT NULL,
        experimentId TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Experiments and Scenes tables created successfully.');
  } catch (err) {
    console.error('Error creating tables:', err.message);
  }
}
