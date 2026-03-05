import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './prisma';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import activityRoutes from './routes/activities';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'DDA Course Platform Backend is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
