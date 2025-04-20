import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initializeDatabase } from './config/database.js';
import { createOscillationTable } from './models/oscillationModel.js';
import { createLabTables } from './models/labModels.js';
import oscillationRouter from './routes/oscillationRoutes.js';
import labSceneRouter from './routes/labScene.js';
import experimentRouter from './routes/experiments.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// WebSocket server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.set('io', io);

(async () => {
  try {
    const db = await initializeDatabase();
    await createOscillationTable(db);
    await createLabTables(db);

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.static(join(__dirname, 'public')));

    // Attach db to request
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Routes
    app.use('/api/oscillations', oscillationRouter);
    app.use('/api/labscene', labSceneRouter);
    app.use('/api/experiments', experimentRouter);

    // Start server
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await db.close();
      process.exit();
    });
  } catch (error) {
    console.error('Server initialization failed:', error);
    process.exit(1);
  }
})();
