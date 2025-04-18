import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './config/database.js';
import { createOscillationTable } from './models/oscillationModel.js';
import oscillationRouter from './routes/oscillationRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database initialization
let db;
try {
  db = await initializeDatabase();
  await createOscillationTable(db);

  // Add db to request object
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // Routes
  app.use('/api/oscillations', oscillationRouter);

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error('Failed to initialize database:', err);
  process.exit(1);
}

// Close database connection on process exit
process.on('SIGINT', async () => {
  if (db) {
    await db.close();
    console.log('Database connection closed');
  }
  process.exit();
});
