import express from 'express';
import { initializeDatabase } from './config/database.js';
import { createOscillationTable } from './models/oscillationModel.js';
import oscillationRouter from './routes/oscillationRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database initialization
const db = await initializeDatabase();
await createOscillationTable(db);

// Add db to request object
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/oscillations', oscillationRouter);

// WebSocket setup
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Attach io to app
app.set('io', io);

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Close database connection on exit
process.on('SIGINT', async () => {
  await db.close();
  process.exit();
});
