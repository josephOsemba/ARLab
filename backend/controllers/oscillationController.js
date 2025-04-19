export async function getOscillationsHandler(req, res) {
  try {
    const db = req.db;
    const oscillations = await db.all('SELECT * FROM oscillations');
    res.json(oscillations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createOscillationHandler(req, res) {
  try {
    const db = req.db;
    const { length, time20 } = req.body;
    const period = time20 / 20;
    const t_squared = period * period;

    await db.run(
      'INSERT INTO oscillations (length, time20, period, t_squared) VALUES (?, ?, ?, ?)',
      [length, time20, period, t_squared]
    );

    const newRecord = await db.get(
      'SELECT * FROM oscillations WHERE id = last_insert_rowid()'
    );
    req.app.get('io').emit('new_oscillation', newRecord);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateDataHandler(req, res) {
  try {
    const db = req.db;
    const { id } = req.params;
    const { length, time20 } = req.body;
    const period = time20 / 20;
    const t_squared = period * period;

    await db.run(
      `UPDATE oscillations 
         SET length = ?, time20 = ?, period = ?, t_squared = ?
         WHERE id = ?`,
      [length, time20, period, t_squared, id]
    );

    const updatedRecord = await db.get(
      'SELECT * FROM oscillations WHERE id = ?',
      [id]
    );
    req.app.get('io').emit('update_oscillation', updatedRecord);
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteDataHandler(req, res) {
  try {
    const db = req.db;
    const { id } = req.params;
    await db.run('DELETE FROM oscillations WHERE id = ?', [id]);
    req.app.get('io').emit('delete_oscillation', { id });
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
