import { getOscillations, seedData } from '../services/oscillationService.js';

export async function getOscillationsHandler(req, res) {
  try {
    const db = req.db;
    const oscillations = await getOscillations(db);
    res.json(oscillations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function seedOscillationDataHandler(req, res) {
  try {
    const db = req.db;
    const result = await seedData(db);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateDataHandler(req, res) {
  try {
    const db = req.db;
    const { id } = req.params;
    const { length, time20 } = req.body;

    // Calculate derived fields
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
