import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'PetHub API is running perfectly!' });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`PetHub Server listening on http://localhost:${PORT}`);
  });
};

startServer();