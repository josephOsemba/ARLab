export async function createOscillationTable(db) {
  await db.exec(`
      CREATE TABLE IF NOT EXISTS oscillations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        length REAL NOT NULL,
        time20 REAL NOT NULL,
        period REAL NOT NULL,
        t_squared REAL NOT NULL
      )
    `);
}

export async function getAllOscillations(db) {
  return db.all('SELECT * FROM oscillations');
}

export async function seedOscillationData(db, data) {
  await db.run('DELETE FROM oscillations');

  const stmt = await db.prepare(
    'INSERT INTO oscillations (length, time20, period, t_squared) VALUES (?, ?, ?, ?)'
  );

  for (const item of data) {
    await stmt.run(item.length, item.time20, item.period, item.t_squared);
  }

  await stmt.finalize();
}

export async function updateOscillationData(db, id, data) {
  const { length, time20 } = data;
  await db.run(
    `UPDATE oscillations 
       SET length = ?, time20 = ?
       WHERE id = ?`,
    [length, time20, id]
  );
  return db.get('SELECT * FROM oscillations WHERE id = ?', [id]);
}

export async function deleteOscillationData(db, id) {
  return db.run('DELETE FROM oscillations WHERE id = ?', [id]);
}
