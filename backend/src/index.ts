// src/index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; 
import sweetsRoutes from './routes/sweetsRoutes';
dotenv.config();
 
const app = express();
app.use(cors()); 
app.use(express.json()); 

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
app.use('/api/auth', authRoutes); 
app.use('/api/sweets', sweetsRoutes);
// A simple test route to make sure the server is working
app.get('/', (req: Request, res: Response) => {
  res.send('Sweet Shop API is running!');
});

// Start the server only after a successful database connection
if (!MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined.');
  process.exit(1); // Exit the process with an error code
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });